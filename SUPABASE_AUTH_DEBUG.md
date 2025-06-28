# 🚨 Supabase Authentication Debug Guide

## ❌ Issue
Users are not appearing in Supabase Authentication → Users after registration.

## 🔍 Debug Steps

### Step 1: Check Supabase Project Settings
1. Go to **Supabase Dashboard** → **Authentication** → **Settings**
2. Check **Site URL**: Should be your domain (not localhost for production)
3. Check **Disable email confirmations**: 
   - If **enabled**: Users login immediately
   - If **disabled**: Users must verify email first

### Step 2: Test Connection
Open browser console and test Supabase connection:

```javascript
// Test basic connection
console.log('Testing Supabase connection...');

// Test signup directly
const { data, error } = await supabase.auth.signUp({
  email: 'test@example.com',
  password: 'test123456'
});

console.log('Signup result:', { data, error });
```

### Step 3: Check Network Tab
1. Open **Developer Tools** → **Network**
2. Try to register
3. Look for requests to `supabase.co`
4. Check if requests are failing

### Step 4: Verify Environment Variables
Check that these are set correctly:
```
VITE_SUPABASE_URL=https://fpizroupwhlohounvtwk.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 🔧 Common Fixes

### Fix 1: Email Confirmation Settings
If you want immediate signup without email verification:

1. Go to **Authentication** → **Settings**
2. **Enable** "Disable email confirmations"
3. Users will be created immediately

### Fix 2: Check CORS Settings
Make sure your domain is allowed:
1. **Authentication** → **Settings** → **Redirect URLs**
2. Add your production domain

### Fix 3: API Key Issues
If the anon key is wrong:
1. Go to **Settings** → **API**
2. Copy the correct **anon/public** key
3. Update your environment variables

### Fix 4: Project URL Issues
Make sure the project URL is correct:
1. **Settings** → **API** → **Project URL**
2. Should match your VITE_SUPABASE_URL

## 🚀 Quick Test

Try this in browser console on your site:

```javascript
// Test if Supabase is working
console.log('Supabase client:', supabase);

// Test signup
supabase.auth.signUp({
  email: 'debug@test.com',
  password: 'debug123'
}).then(result => {
  console.log('Direct signup test:', result);
});
```

## ✅ Expected Behavior

After fixing:
1. **Registration form submitted** → Console logs signup attempt
2. **Supabase request sent** → Network tab shows POST to supabase.co
3. **User created** → Appears in Authentication → Users
4. **Success message** → User sees confirmation or is logged in

## 🆘 If Still Not Working

1. **Check Supabase Status**: https://status.supabase.com
2. **Try with a different email domain** (some domains are blocked)
3. **Check browser console** for specific error messages
4. **Try in incognito mode** to rule out cache issues

The enhanced signup process now includes detailed logging to help identify exactly where the issue occurs.