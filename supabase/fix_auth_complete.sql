-- Complete authentication fix
-- Run this in Supabase SQL Editor

-- 1. Drop existing trigger and function to recreate
DROP TRIGGER IF EXISTS trigger_handle_new_user ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- 2. Recreate the function with better error handling
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_name TEXT;
BEGIN
  -- Extract name from metadata or use email prefix
  user_name := COALESCE(
    NEW.raw_user_meta_data->>'name',
    split_part(NEW.email, '@', 1)
  );
  
  -- Insert into user_profiles with conflict handling
  INSERT INTO public.user_profiles (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    user_name,
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
    -- Log error but don't fail auth
    RAISE WARNING 'Error in handle_new_user: %', SQLERRM;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Recreate the trigger
CREATE TRIGGER trigger_handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 4. Grant proper permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.user_profiles TO anon, authenticated;
GRANT ALL ON public.subscriptions TO anon, authenticated;

-- 5. Update RLS policies to be more permissive for profile creation
DROP POLICY IF EXISTS "Users can insert own profile" ON public.user_profiles;
CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (
    auth.uid() = id OR 
    auth.role() = 'service_role' OR
    auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Users can view own profile" ON public.user_profiles;
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON public.user_profiles;
CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

-- 6. Fix subscription policies
DROP POLICY IF EXISTS "Users can create own subscription" ON public.subscriptions;
CREATE POLICY "Users can create own subscription" ON public.subscriptions
  FOR INSERT WITH CHECK (
    auth.uid() = user_id OR 
    auth.role() = 'service_role' OR
    auth.role() = 'authenticated'
  );

DROP POLICY IF EXISTS "Users can view own subscription" ON public.subscriptions;
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (auth.uid() = user_id);

-- 7. Ensure tables have RLS enabled
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- 8. Test the setup by checking if everything exists
SELECT 
  'Setup Status' as check_type,
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.triggers WHERE trigger_name = 'trigger_handle_new_user') 
    THEN 'Trigger exists ✅'
    ELSE 'Trigger missing ❌'
  END as status

UNION ALL

SELECT 
  'RLS Status',
  CASE 
    WHEN EXISTS(SELECT 1 FROM pg_policies WHERE tablename = 'user_profiles' AND policyname = 'Users can insert own profile')
    THEN 'RLS policies exist ✅'
    ELSE 'RLS policies missing ❌'
  END

UNION ALL

SELECT 
  'Tables Status',
  CASE 
    WHEN EXISTS(SELECT 1 FROM information_schema.tables WHERE table_name = 'user_profiles' AND table_schema = 'public')
    THEN 'Tables exist ✅'
    ELSE 'Tables missing ❌'
  END;