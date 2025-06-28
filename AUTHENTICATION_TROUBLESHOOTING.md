# 🚨 Authentication Troubleshooting Guide

## ❌ Current Issue
- Users not appearing in Supabase Authentication → Users
- No confirmation emails being sent
- Registration appears to fail silently

## 🔧 Step-by-Step Fix

### Step 1: Run the SQL Fix
1. Go to **Supabase Dashboard** → **SQL Editor**
2. Copy and paste the contents of `supabase/fix_auth_complete.sql`
3. Click **Run** to execute all commands

### Step 2: Check Authentication Settings
1. Go to **Supabase Dashboard** → **Authentication** → **Settings**
2. **Important Settings to Check:**
   - **Site URL**: Should be your production domain (not localhost)
   - **Disable email confirmations**: Try enabling this temporarily
   - **Enable email confirmations**: If disabled, users are created immediately

### Step 3: Verify Environment Variables
Make sure these are correct in your deployment:
```
VITE_SUPABASE_URL=https://fpizroupwhlohounvtwk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZwaXpyb3Vwd2hsb2hvdW52dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwODQ2MzYsImV4cCI6MjA2NjY2MDYzNn0.M3CWtfE0MaM7FL2QpA7X0pUgRUcZdYAHukBCiYDWwz4
```

### Step 4: Test Registration
1. Try registering a new user
2. Open browser console to see detailed logs
3. Check Network tab for failed requests
4. Look for specific error messages

## 🔍 Common Issues & Solutions

### Issue 1: Email Confirmations Not Working
**Solution:** 
1. Go to **Authentication** → **Settings** → **Email Templates**
2. Check if **Confirm signup** template is configured
3. Temporarily **disable email confirmations** for testing

### Issue 2: CORS Errors
**Solution:**
1. Go to **Authentication** → **Settings**
2. Add your domain to **Additional redirect URLs**
3. Set **Site URL** to your production domain

### Issue 3: RLS Blocking User Creation
**Solution:** The SQL fix includes updated RLS policies that allow user creation

### Issue 4: Missing Database Tables
**Solution:** Run the main schema from `supabase/schema.sql` first

## 🧪 Quick Debug Test

Run this in your browser console on the signup page:

```javascript
// Test direct Supabase connection
console.log('Testing Supabase...');

// Test signup directly
supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123456',
  options: {
    data: { name: 'Test User' }
  }
}).then(result => {
  console.log('Direct signup result:', result);
  
  if (result.error) {
    console.error('Signup failed:', result.error.message);
  } else if (result.data.user) {
    console.log('User created:', result.data.user.email);
    console.log('Session created:', !!result.data.session);
    console.log('Email confirmed:', !!result.data.user.email_confirmed_at);
  }
});
```

## ✅ Expected Results After Fix

1. **Registration works** → Console shows successful signup
2. **User appears** → In Supabase Authentication → Users
3. **Profile created** → In Database → user_profiles table
4. **Either:**
   - User is logged in immediately (if email confirmation disabled)
   - User gets confirmation email (if email confirmation enabled)

## 🚨 If Still Not Working

### Check Supabase Auth Status
1. Go to **Supabase Dashboard** → **Settings** → **API**
2. Verify **Project URL** and **anon key** match your environment variables
3. Check **Authentication** → **Settings** for any configuration issues

### Alternative: Disable Email Confirmation Temporarily
1. **Authentication** → **Settings**
2. **Enable** "Disable email confirmations"
3. Users will be created and logged in immediately
4. Re-enable email confirmations later if needed

The enhanced authentication system now includes comprehensive logging and better error handling to help identify exactly where the issue occurs.