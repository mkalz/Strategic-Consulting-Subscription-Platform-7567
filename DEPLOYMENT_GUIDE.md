# Netlify Deployment Guide

## 🚀 Quick Deployment Steps

### 1. Build Test Locally
```bash
# Test the build locally first
npm run build
npm run preview
```

### 2. Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Connect your Git repository
4. Choose your repository

### 3. Configure Build Settings
**Build command:** `npm run build`
**Publish directory:** `dist`
**Node version:** `18`

### 4. Set Environment Variables
In Netlify dashboard → Site settings → Environment variables:
```
VITE_SUPABASE_URL = https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY = your-anon-key-here
```

### 5. Deploy
Click "Deploy site" - Netlify will automatically build and deploy!

## 🔧 Common Issues & Solutions

### Issue: Build fails with "Command failed"
**Solution:**
1. Check build logs for specific errors
2. Ensure all dependencies are in package.json
3. Test build locally: `npm run build`

### Issue: "Page not found" on refresh
**Solution:** The `_redirects` file should handle this. Ensure it contains:
```
/*    /index.html   200
```

### Issue: Environment variables not working
**Solution:**
1. Ensure variables start with `VITE_`
2. Set them in Netlify dashboard
3. Redeploy after adding variables

### Issue: Supabase connection fails
**Solution:**
1. Check environment variables are set correctly
2. Verify Supabase project is active
3. Check browser console for specific errors

## 📋 Deployment Checklist

- [ ] Repository connected to Netlify
- [ ] Build command set to `npm run build`
- [ ] Publish directory set to `dist`
- [ ] Environment variables configured
- [ ] Supabase project is active
- [ ] Local build test passes
- [ ] Domain configured (if custom)

## 🌐 Post-Deployment

1. **Test all features:**
   - User registration/login
   - Project creation
   - Real-time updates
   - Team management

2. **Monitor:**
   - Check Netlify function logs
   - Monitor Supabase usage
   - Set up error tracking

3. **Optimize:**
   - Enable Netlify Analytics
   - Set up custom domain
   - Configure CDN settings

## 🆘 Debug Deployment Issues

### Check Build Logs
1. Go to Netlify dashboard
2. Click on failed deployment
3. View build logs for errors

### Common Error Messages:

**"Module not found"**
- Missing dependency in package.json
- Incorrect import paths

**"Environment variable undefined"**
- Variables not set in Netlify
- Variables don't start with VITE_

**"Command not found"**
- Incorrect build command
- Missing script in package.json

**"Permission denied"**
- File permission issues
- Check file case sensitivity

### Manual Deploy (if needed)
```bash
# Build locally
npm run build

# Drag and drop dist/ folder to Netlify
```

---

**🎉 Once deployed successfully, your GCM platform will be live at your Netlify URL!**