-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.user_profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'consultant' CHECK (role IN ('consultant', 'admin', 'user')),
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teams table
CREATE TABLE public.teams (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  settings JSONB DEFAULT '{"allowMemberInvites": true, "defaultProjectAccess": "editor"}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Team members table
CREATE TABLE public.team_members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  team_id UUID REFERENCES public.teams(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  role TEXT DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(team_id, user_id)
);

-- Projects table
CREATE TABLE public.projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  focus_question TEXT NOT NULL,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'paused', 'archived')),
  phase TEXT DEFAULT 'brainstorming' CHECK (phase IN ('brainstorming', 'structuring', 'rating', 'analysis')),
  owner_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  team_id UUID REFERENCES public.teams(id) ON DELETE SET NULL,
  participant_count INTEGER DEFAULT 1,
  statement_count INTEGER DEFAULT 0,
  settings JSONB DEFAULT '{"allowParticipantInvites": true, "requireApproval": false, "isPublic": false}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statements table
CREATE TABLE public.statements (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  text TEXT NOT NULL,
  author_id UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
  source TEXT DEFAULT 'manual' CHECK (source IN ('manual', 'ai_generated')),
  importance_rating DECIMAL(3,2) CHECK (importance_rating >= 0 AND importance_rating <= 5),
  feasibility_rating DECIMAL(3,2) CHECK (feasibility_rating >= 0 AND feasibility_rating <= 5),
  cluster_id UUID,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Clusters table
CREATE TABLE public.clusters (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  color TEXT DEFAULT 'bg-blue-100 border-blue-300 text-blue-900',
  position JSONB DEFAULT '{"x": 0, "y": 0}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ratings table (for individual user ratings)
CREATE TABLE public.ratings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  statement_id UUID REFERENCES public.statements(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  importance DECIMAL(3,2) CHECK (importance >= 0 AND importance <= 5),
  feasibility DECIMAL(3,2) CHECK (feasibility >= 0 AND feasibility <= 5),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(statement_id, user_id)
);

-- AI Usage tracking table
CREATE TABLE public.ai_usage (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  usage_type TEXT NOT NULL CHECK (usage_type IN ('statement_generation', 'clustering', 'enhancement')),
  credits_used INTEGER NOT NULL DEFAULT 1,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User subscriptions table
CREATE TABLE public.subscriptions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('starter', 'professional', 'enterprise')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'expired')),
  current_period_end TIMESTAMP WITH TIME ZONE,
  ai_credits INTEGER DEFAULT 0,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);

-- Create indexes for better performance
CREATE INDEX idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX idx_projects_team_id ON public.projects(team_id);
CREATE INDEX idx_projects_status ON public.projects(status);
CREATE INDEX idx_statements_project_id ON public.statements(project_id);
CREATE INDEX idx_statements_author_id ON public.statements(author_id);
CREATE INDEX idx_statements_cluster_id ON public.statements(cluster_id);
CREATE INDEX idx_clusters_project_id ON public.clusters(project_id);
CREATE INDEX idx_ratings_statement_id ON public.ratings(statement_id);
CREATE INDEX idx_ratings_user_id ON public.ratings(user_id);
CREATE INDEX idx_team_members_team_id ON public.team_members(team_id);
CREATE INDEX idx_team_members_user_id ON public.team_members(user_id);
CREATE INDEX idx_ai_usage_user_id ON public.ai_usage(user_id);

-- Enable Row Level Security
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Row Level Security Policies

-- User Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON public.user_profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Teams: Users can view teams they're members of
CREATE POLICY "Users can view teams they belong to" ON public.teams
  FOR SELECT USING (
    owner_id = auth.uid() OR
    EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = teams.id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Team owners can update teams" ON public.teams
  FOR UPDATE USING (owner_id = auth.uid());

CREATE POLICY "Users can create teams" ON public.teams
  FOR INSERT WITH CHECK (owner_id = auth.uid());

-- Team Members: Users can view team members of teams they belong to
CREATE POLICY "Users can view team members" ON public.team_members
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.teams
      WHERE id = team_id AND (
        owner_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.team_members tm
          WHERE tm.team_id = teams.id AND tm.user_id = auth.uid()
        )
      )
    )
  );

-- Projects: Users can view their own projects and team projects
CREATE POLICY "Users can view own projects" ON public.projects
  FOR SELECT USING (
    owner_id = auth.uid() OR
    (team_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM public.team_members
      WHERE team_id = projects.team_id AND user_id = auth.uid()
    ))
  );

CREATE POLICY "Users can create projects" ON public.projects
  FOR INSERT WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Project owners can update projects" ON public.projects
  FOR UPDATE USING (owner_id = auth.uid());

-- Statements: Users can view statements from projects they have access to
CREATE POLICY "Users can view project statements" ON public.statements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE id = project_id AND (
        owner_id = auth.uid() OR
        (team_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.team_members
          WHERE team_id = projects.team_id AND user_id = auth.uid()
        ))
      )
    )
  );

CREATE POLICY "Users can create statements" ON public.statements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE id = project_id AND (
        owner_id = auth.uid() OR
        (team_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.team_members
          WHERE team_id = projects.team_id AND user_id = auth.uid()
        ))
      )
    )
  );

-- Clusters: Users can view clusters from projects they have access to
CREATE POLICY "Users can view project clusters" ON public.clusters
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.projects
      WHERE id = project_id AND (
        owner_id = auth.uid() OR
        (team_id IS NOT NULL AND EXISTS (
          SELECT 1 FROM public.team_members
          WHERE team_id = projects.team_id AND user_id = auth.uid()
        ))
      )
    )
  );

-- Ratings: Users can view and manage their own ratings
CREATE POLICY "Users can view own ratings" ON public.ratings
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create own ratings" ON public.ratings
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own ratings" ON public.ratings
  FOR UPDATE USING (user_id = auth.uid());

-- AI Usage: Users can view their own usage
CREATE POLICY "Users can view own ai usage" ON public.ai_usage
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create ai usage" ON public.ai_usage
  FOR INSERT WITH CHECK (user_id = auth.uid());

-- Subscriptions: Users can view their own subscription
CREATE POLICY "Users can view own subscription" ON public.subscriptions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can update own subscription" ON public.subscriptions
  FOR UPDATE USING (user_id = auth.uid());

-- Functions and Triggers

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER trigger_user_profiles_updated_at
  BEFORE UPDATE ON public.user_profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_teams_updated_at
  BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_projects_updated_at
  BEFORE UPDATE ON public.projects
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_statements_updated_at
  BEFORE UPDATE ON public.statements
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_clusters_updated_at
  BEFORE UPDATE ON public.clusters
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_ratings_updated_at
  BEFORE UPDATE ON public.ratings
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER trigger_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Function to update statement count in projects
CREATE OR REPLACE FUNCTION public.update_project_statement_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE public.projects 
    SET statement_count = statement_count + 1 
    WHERE id = NEW.project_id;
    RETURN NEW;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE public.projects 
    SET statement_count = statement_count - 1 
    WHERE id = OLD.project_id;
    RETURN OLD;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger for statement count
CREATE TRIGGER trigger_update_statement_count
  AFTER INSERT OR DELETE ON public.statements
  FOR EACH ROW EXECUTE FUNCTION public.update_project_statement_count();

-- Function to create user profile after signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.user_profiles (id, email, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', NEW.email)
  );
  
  -- Create default subscription
  INSERT INTO public.subscriptions (user_id, plan, ai_credits, features)
  VALUES (
    NEW.id,
    'starter',
    10,
    '["basic_analytics"]'::jsonb
  );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user
CREATE TRIGGER trigger_handle_new_user
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();