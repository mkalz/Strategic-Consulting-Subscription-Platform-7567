# Database Integration Plan for GCM Platform

## 🎯 Current Status
- **Frontend**: Complete React application ✅
- **Backend**: None (mock data only) ❌
- **Database**: None ❌
- **Authentication**: Mock only ❌

## 🛠️ Integration Options

### Option 1: Supabase (Recommended)
**Why Supabase:**
- PostgreSQL database
- Built-in authentication
- Real-time subscriptions
- REST API auto-generated
- File storage included
- Free tier available

**Setup Steps:**
1. Create Supabase project
2. Set up database schema
3. Configure authentication
4. Update React app with Supabase client
5. Replace mock data with real API calls

### Option 2: Firebase
**Features:**
- Firestore NoSQL database
- Firebase Auth
- Real-time updates
- Good React integration

### Option 3: Custom Backend
**Stack Options:**
- Node.js + Express + PostgreSQL
- Python + FastAPI + PostgreSQL
- .NET Core + SQL Server

## 📊 Database Schema Design

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  role VARCHAR(50) DEFAULT 'consultant',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Projects Table
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  focus_question TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  phase VARCHAR(50) DEFAULT 'brainstorming',
  owner_id UUID REFERENCES users(id),
  participant_count INTEGER DEFAULT 1,
  statement_count INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Statements Table
```sql
CREATE TABLE statements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES projects(id),
  text TEXT NOT NULL,
  author_id UUID REFERENCES users(id),
  source VARCHAR(50) DEFAULT 'manual',
  importance_rating DECIMAL(3,2),
  feasibility_rating DECIMAL(3,2),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Teams Table
```sql
CREATE TABLE teams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Team Members Table
```sql
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  team_id UUID REFERENCES teams(id),
  user_id UUID REFERENCES users(id),
  role VARCHAR(50) DEFAULT 'member',
  status VARCHAR(50) DEFAULT 'active',
  joined_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);
```

## 🔧 Implementation Steps

### Phase 1: Supabase Setup
1. **Create Supabase Project**
   ```bash
   # Visit https://supabase.com
   # Create new project
   # Get API URL and anon key
   ```

2. **Install Dependencies**
   ```bash
   npm install @supabase/supabase-js
   ```

3. **Environment Variables**
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```

### Phase 2: Database Schema
1. **Run SQL in Supabase Dashboard**
2. **Set up Row Level Security (RLS)**
3. **Create policies for data access**

### Phase 3: Update React Code
1. **Replace AuthContext with Supabase Auth**
2. **Update ProjectContext with real API calls**
3. **Add error handling and loading states**
4. **Implement real-time features**

## 🚀 Quick Start with Supabase

### 1. Create Supabase Client
```javascript
// src/lib/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

### 2. Update Auth Context
```javascript
// src/contexts/AuthContext.jsx
import { supabase } from '../lib/supabase'

const login = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  })
  
  if (error) throw error
  return data.user
}
```

### 3. Update Project Context
```javascript
// src/contexts/ProjectContext.jsx
const loadProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('owner_id', user.id)
  
  if (error) throw error
  setProjects(data)
}
```

## 📈 Migration Strategy

### Step 1: Parallel Development
- Keep mock data as fallback
- Add database integration alongside
- Use feature flags to switch between modes

### Step 2: Gradual Migration
- Start with user authentication
- Then projects and statements
- Finally teams and advanced features

### Step 3: Data Migration
- Export any test data
- Import into new database
- Verify all functionality works

## 🔒 Security Considerations

### Row Level Security (RLS)
```sql
-- Users can only see their own data
CREATE POLICY "Users can view own projects" ON projects
FOR SELECT USING (auth.uid() = owner_id);

-- Team members can see team projects
CREATE POLICY "Team members can view team projects" ON projects
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM team_members tm
    JOIN teams t ON t.id = tm.team_id
    WHERE tm.user_id = auth.uid()
    AND t.id = projects.team_id
  )
);
```

### API Security
- All database access through RLS
- No direct database access from frontend
- Secure API keys in environment variables

## 💡 Recommendations

1. **Start with Supabase** - Fastest to implement
2. **Implement authentication first** - Core requirement
3. **Add real-time features** - Enhance collaboration
4. **Plan for scaling** - Design for growth
5. **Backup strategy** - Regular database backups

## 📋 Implementation Checklist

- [ ] Choose database solution
- [ ] Set up database schema
- [ ] Configure authentication
- [ ] Update React contexts
- [ ] Replace mock data with API calls
- [ ] Add error handling
- [ ] Implement real-time features
- [ ] Set up deployment with database
- [ ] Add data backup strategy
- [ ] Test all functionality

## 🎯 Timeline Estimate

- **Supabase Setup**: 1-2 hours
- **Schema Creation**: 2-3 hours  
- **Authentication Integration**: 3-4 hours
- **Project Management**: 4-6 hours
- **Teams & Collaboration**: 3-4 hours
- **Testing & Polish**: 2-3 hours

**Total: 15-22 hours** for full database integration