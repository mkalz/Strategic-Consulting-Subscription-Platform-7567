# 🔧 User Registration Debug Guide

## ❌ Issue
Users are not being created in the database after registration.

## ✅ Fixes Applied

### 1. **Updated AuthContext**
- Added explicit user profile creation in `handleUserProfile()`
- Better error handling for profile creation
- Fallback profile creation if trigger fails
- Added default subscription creation

### 2. **Fixed Database Trigger**
Run the SQL in `supabase/fix_user_profiles.sql` to:
- Recreate the user profile trigger with better error handling
- Add proper conflict resolution
- Grant necessary permissions
- Update RLS policies

### 3. **Enhanced Debugging**
Added console logs to track the registration process.

## 🔍 Debug Steps

### Step 1: Run the Fix SQL
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste contents of `supabase/fix_user_profiles.sql`
3. Click "Run" to execute

### Step 2: Test Registration
1. Try registering a new user
2. Check browser console for logs
3. Check if user appears in:
   - **Authentication → Users** (auth.users table)
   - **Database → user_profiles** table
   - **Database → subscriptions** table

### Step 3: Manual Check
If still not working, manually check in Supabase:

```sql
-- Check if user exists in auth.users
SELECT id, email, created_at FROM auth.users ORDER BY created_at DESC LIMIT 5;

-- Check if profile was created
SELECT * FROM public.user_profiles ORDER BY created_at DESC LIMIT 5;

-- Check if subscription was created
SELECT * FROM public.subscriptions ORDER BY created_at DESC LIMIT 5;
```

## 🚨 Common Issues & Solutions

### Issue: "relation 'public.user_profiles' does not exist"
**Solution:** Run the main schema from `supabase/schema.sql` first.

### Issue: "permission denied for table user_profiles"
**Solution:** The fix SQL updates RLS policies to allow profile creation.

### Issue: Trigger not firing
**Solution:** The fix SQL recreates the trigger with better error handling.

### Issue: Console shows "Error creating user profile"
**Solution:** Check the specific error in console and verify RLS policies.

## 🔧 Manual Profile Creation (Fallback)

If automatic creation still fails, you can manually create profiles:

```sql
-- Replace with actual user ID and email
INSERT INTO public.user_profiles (id, email, name, role)
VALUES (
  'user-uuid-here',
  'user@example.com',
  'User Name',
  'consultant'
);

-- Create subscription
INSERT INTO public.subscriptions (user_id, plan, status, ai_credits, features)
VALUES (
  'user-uuid-here',
  'starter',
  'active',
  10,
  '["basic_analytics"]'::jsonb
);
```

## ✅ Expected Behavior After Fix

1. **User registers** → appears in `auth.users`
2. **Trigger fires** → creates record in `user_profiles`
3. **Subscription created** → record in `subscriptions`
4. **App shows user** → dashboard loads correctly

The registration should now work properly! 🎉