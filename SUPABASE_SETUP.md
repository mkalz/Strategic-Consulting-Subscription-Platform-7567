# Supabase Setup Guide for GCM Platform

## 🚀 Quick Setup Instructions

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Create a new organization (if needed)
4. Create a new project
5. Choose a database password (save this!)
6. Wait for project to be ready (~2 minutes)

### 2. Get Your Credentials
1. Go to Project Settings → API
2. Copy your:
   - **Project URL** (looks like: `https://abcdefgh.supabase.co`)
   - **Anon/Public Key** (starts with `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`)

### 3. Set Environment Variables
1. Create a `.env` file in your project root:
```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Schema
1. Go to Supabase Dashboard → SQL Editor
2. Copy and paste the entire contents of `supabase/schema.sql`
3. Click "Run" to create all tables and policies

### 5. Install Dependencies
```bash
npm install @supabase/supabase-js
```

### 6. Restart Development Server
```bash
npm run dev
```

## ✅ Verification Steps

1. **Test Authentication:**
   - Try creating a new account
   - Check if user appears in Authentication → Users

2. **Test Database:**
   - Create a new project in the app
   - Check if project appears in Database → Table Editor → projects

3. **Test Real-time:**
   - Open app in two browser windows
   - Add a statement in one window
   - Should appear in real-time in the other window

## 🗂️ Database Schema Overview

### Core Tables:
- **user_profiles** - Extended user information
- **projects** - GCM projects
- **statements** - Project statements
- **clusters** - Statement groupings
- **ratings** - User ratings for statements
- **teams** - Team management
- **team_members** - Team membership
- **subscriptions** - User plans and AI credits
- **ai_usage** - AI usage tracking

### Security Features:
- ✅ Row Level Security (RLS) enabled
- ✅ Users can only access their own data
- ✅ Team members can access team projects
- ✅ Automatic user profile creation
- ✅ Real-time subscriptions

## 🔧 Common Issues & Solutions

### Issue: "Missing Supabase environment variables"
**Solution:** Make sure your `.env` file is in the root directory and restart the dev server.

### Issue: "Insert violates row-level security policy"
**Solution:** The RLS policies are working correctly. Make sure you're signed in and trying to access your own data.

### Issue: "relation 'public.user_profiles' does not exist"
**Solution:** Run the database schema from `supabase/schema.sql` in the Supabase SQL Editor.

### Issue: Real-time not working
**Solution:** Check that your Supabase project has realtime enabled (it should be by default).

## 📊 Data Migration

If you have existing test data:

1. **Export existing data** (if any)
2. **Run the schema** to create tables
3. **Import data** using Supabase dashboard or API

## 🔒 Security Best Practices

1. **Never expose your service role key** in frontend code
2. **Use RLS policies** to control data access
3. **Validate data** on both client and server side
4. **Use prepared statements** to prevent SQL injection
5. **Regularly rotate API keys** in production

## 🚀 Production Deployment

For production deployment:

1. **Set up production environment variables** in your hosting platform
2. **Configure custom domain** for your Supabase project
3. **Set up database backups** in Supabase dashboard
4. **Monitor usage** and set up billing alerts
5. **Enable additional security features** as needed

## 📈 Monitoring & Analytics

Supabase provides built-in monitoring:
- **Database performance** metrics
- **API usage** statistics
- **Auth events** logging
- **Real-time connections** count

Access these in your Supabase dashboard under Reports.

## 🆘 Support

If you encounter issues:
1. Check the [Supabase Documentation](https://supabase.com/docs)
2. Visit [Supabase Discord](https://discord.supabase.com)
3. Check [GitHub Issues](https://github.com/supabase/supabase/issues)

---

**🎉 Once setup is complete, your GCM platform will have:**
- ✅ Real database persistence
- ✅ User authentication
- ✅ Real-time collaboration
- ✅ Secure data access
- ✅ Scalable infrastructure