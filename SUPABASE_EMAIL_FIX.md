# Fix Supabase Email Verification URLs

## 🚨 Issue
Email verification links point to `localhost` instead of your production domain.

## 🔧 Solution

### Step 1: Update Site URL in Supabase Dashboard

1. **Go to Supabase Dashboard**
   - Navigate to your project
   - Go to **Authentication** → **Settings**

2. **Update Site URL**
   - Find "Site URL" field
   - Change from: `http://localhost:3000`
   - Change to: `https://your-netlify-domain.netlify.app`
   - Or your custom domain: `https://yourdomain.com`

3. **Update Additional URLs**
   - **Redirect URLs**: Add your production domain
   - **Allowed origins**: Include your domain

### Step 2: Configure Auth Settings

In Supabase Dashboard → Authentication → Settings:

```
Site URL: https://your-app-name.netlify.app
Additional redirect URLs:
- https://your-app-name.netlify.app
- https://your-app-name.netlify.app/auth/callback
- https://yourdomain.com (if using custom domain)
```

### Step 3: Update Environment Variables

Make sure your Netlify environment variables are set correctly:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 4: Test Email Verification

1. **Clear existing users** (if testing)
   - Go to Authentication → Users
   - Delete test users with localhost emails

2. **Test new signup**
   - Create new account on production site
   - Check email for correct verification link
   - Should now point to your domain

## 🔍 Additional Configuration

### Custom Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the **Confirm signup** template
3. Update any hardcoded URLs to use `{{ .SiteURL }}`

Example template:
```html
<h2>Confirm your signup</h2>
<p>Follow this link to confirm your account:</p>
<p><a href="{{ .ConfirmationURL }}">Confirm your account</a></p>
```

### Auth Callback Handling

Update your auth context to handle the verification:

```javascript
// In AuthContext.jsx
useEffect(() => {
  // Handle auth state changes including email verification
  const { data: { subscription } } = supabase.auth.onAuthStateChange(
    async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        // User successfully verified email
        setUser(session.user);
        await loadUserProfile(session.user.id);
      }
      setLoading(false);
    }
  );

  return () => subscription?.unsubscribe();
}, []);
```

## ⚠️ Important Notes

1. **Redeploy after changes**: Changes take effect immediately in Supabase
2. **Clear browser cache**: Clear cache after updating settings
3. **Test thoroughly**: Test signup/verification flow on production
4. **Custom domains**: If using custom domain, update all URLs accordingly

## 🎯 Quick Fix Checklist

- [ ] Update Site URL in Supabase Dashboard
- [ ] Add production domain to redirect URLs
- [ ] Verify environment variables in Netlify
- [ ] Test email verification on production
- [ ] Clear any test users with localhost emails
- [ ] Check email templates for hardcoded URLs

## 🔗 Supabase Auth Settings Location

Dashboard → Project → Authentication → Settings → General