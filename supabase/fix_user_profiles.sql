-- First, let's check if the trigger exists and recreate it
DROP TRIGGER IF EXISTS trigger_handle_new_user ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into user_profiles
  INSERT INTO public.user_profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email, '@', 1)),
    'consultant'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    name = COALESCE(EXCLUDED.name, public.user_profiles.name),
    updated_at = NOW();

  -- Create default subscription
  INSERT INTO public.subscriptions (user_id, plan, status, ai_credits, features)
  VALUES (
    NEW.id,
    'starter',
    'active',
    10,
    '["basic_analytics"]'::jsonb
  )
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the auth process
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger
CREATE TRIGGER trigger_handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT ALL ON public.subscriptions TO anon, authenticated;

-- Update RLS policies to be more permissive for profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id OR auth.role() = 'service_role');

-- Also allow reading profiles during the auth process
DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

-- Allow subscription creation
DROP POLICY IF EXISTS "Users can create own subscription" ON public.subscriptions;
CREATE POLICY "Users can create own subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.role() = 'service_role');