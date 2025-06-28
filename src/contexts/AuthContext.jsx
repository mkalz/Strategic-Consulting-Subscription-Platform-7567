import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event, session?.user?.email);
        
        if (session?.user) {
          setUser(session.user);
          await handleUserProfile(session.user, event);
        } else {
          setUser(null);
          setProfile(null);
        }
        setLoading(false);
      }
    );

    return () => subscription?.unsubscribe();
  }, []);

  const getInitialSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      if (session?.user) {
        setUser(session.user);
        await handleUserProfile(session.user, 'INITIAL_SESSION');
      }
    } catch (error) {
      console.error('Error getting initial session:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserProfile = async (authUser, event) => {
    try {
      console.log('Handling user profile for:', authUser.email, 'Event:', event);
      
      // First, try to load existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (existingProfile) {
        console.log('Found existing profile:', existingProfile);
        setProfile(existingProfile);
        return;
      }

      // If no profile exists and this is a new signup, create one
      if (fetchError?.code === 'PGRST116' || event === 'SIGNED_UP') {
        console.log('Creating new user profile...');
        
        const profileData = {
          id: authUser.id,
          email: authUser.email,
          name: authUser.user_metadata?.name || authUser.email.split('@')[0],
          role: 'consultant'
        };

        const { data: newProfile, error: createError } = await supabase
          .from('user_profiles')
          .insert([profileData])
          .select()
          .single();

        if (createError) {
          console.error('Error creating user profile:', createError);
          // If profile creation fails, still set the auth user
          setProfile({
            id: authUser.id,
            email: authUser.email,
            name: authUser.user_metadata?.name || authUser.email.split('@')[0],
            role: 'consultant'
          });
        } else {
          console.log('Created new profile:', newProfile);
          setProfile(newProfile);
          
          // Also create default subscription
          await createDefaultSubscription(authUser.id);
        }
      }
    } catch (error) {
      console.error('Error handling user profile:', error);
      // Fallback: create a profile object from auth user
      setProfile({
        id: authUser.id,
        email: authUser.email,
        name: authUser.user_metadata?.name || authUser.email.split('@')[0],
        role: 'consultant'
      });
    }
  };

  const createDefaultSubscription = async (userId) => {
    try {
      const { error } = await supabase
        .from('subscriptions')
        .insert([{
          user_id: userId,
          plan: 'starter',
          status: 'active',
          ai_credits: 10,
          features: ['basic_analytics']
        }]);

      if (error) {
        console.error('Error creating default subscription:', error);
      } else {
        console.log('Created default subscription for user');
      }
    } catch (error) {
      console.error('Error creating subscription:', error);
    }
  };

  const signUp = async (email, password, name) => {
    try {
      console.log('🚀 Starting signup for:', email);
      
      // Test Supabase connection first
      const { data: testData, error: testError } = await supabase.from('user_profiles').select('count').limit(1);
      if (testError) {
        console.error('❌ Supabase connection test failed:', testError);
        throw new Error('Database connection failed. Please check your internet connection.');
      }
      console.log('✅ Supabase connection test passed');

      const { data, error } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: {
          data: {
            name: name?.trim() || email.split('@')[0]
          }
        }
      });

      console.log('📧 Signup response:', { data, error });

      if (error) {
        console.error('❌ Signup error:', error);
        
        // Handle specific error cases
        if (error.message.includes('email')) {
          throw new Error('Please enter a valid email address');
        }
        if (error.message.includes('password')) {
          throw new Error('Password must be at least 6 characters long');
        }
        if (error.message.includes('already registered')) {
          throw new Error('An account with this email already exists');
        }
        
        throw new Error(error.message || 'Failed to create account');
      }

      if (data.user) {
        console.log('✅ User created successfully:', data.user.id);
        
        // Check if email confirmation is required
        if (data.user && !data.session) {
          console.log('📬 Email confirmation required');
          return {
            user: data.user,
            error: null,
            message: 'Please check your email for verification link'
          };
        } else {
          console.log('🎉 User logged in immediately');
          return {
            user: data.user,
            error: null,
            message: null
          };
        }
      } else {
        throw new Error('Failed to create user account');
      }

    } catch (error) {
      console.error('❌ Signup process failed:', error);
      return { 
        user: null, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    }
  };

  const signIn = async (email, password) => {
    try {
      console.log('🔑 Starting signin for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password
      });

      if (error) {
        console.error('❌ Login error:', error);
        
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password');
        }
        if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the verification link');
        }
        
        throw new Error(error.message);
      }

      console.log('✅ Login successful:', data.user?.email);
      return { user: data.user, error: null };
    } catch (error) {
      console.error('❌ Login process failed:', error);
      return { user: null, error: error.message };
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setUser(null);
      setProfile(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const updateProfile = async (updates) => {
    try {
      if (!user) throw new Error('No user logged in');

      const { data, error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (error) {
      console.error('Profile update error:', error);
      return { data: null, error: error.message };
    }
  };

  // Legacy methods for backwards compatibility
  const login = signIn;
  const signup = signUp;
  const logout = signOut;

  const value = {
    user: profile || user, // Return profile data with fallback to auth user
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    // Legacy methods
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};