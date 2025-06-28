-- Debug and fix authentication issues
-- Run this in Supabase SQL Editor

-- 1. Check if users exist in auth.users
SELECT 
  'auth.users' as table_name,
  COUNT(*) as total_count,
  COUNT(CASE WHEN email_confirmed_at IS NOT NULL THEN 1 END) as confirmed_count,
  COUNT(CASE WHEN email_confirmed_at IS NULL THEN 1 END) as unconfirmed_count
FROM auth.users

UNION ALL

-- 2. Check user_profiles table
SELECT 
  'user_profiles' as table_name,
  COUNT(*) as total_count,
  0 as confirmed_count,
  0 as unconfirmed_count
FROM public.user_profiles;

-- 3. Check if our trigger exists
SELECT 
  trigger_name,
  event_manipulation,
  action_timing,
  action_statement
FROM information_schema.triggers 
WHERE trigger_name = 'trigger_handle_new_user';

-- 4. Check RLS policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename IN ('user_profiles', 'subscriptions');

-- 5. Test auth configuration (this will show if auth is properly set up)
SELECT 
  setting_name,
  setting_value
FROM auth.config
WHERE setting_name IN ('SITE_URL', 'MAILER_AUTOCONFIRM');