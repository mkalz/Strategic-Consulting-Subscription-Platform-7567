import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

const SubscriptionContext = createContext();

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within a SubscriptionProvider');
  }
  return context;
};

export const SubscriptionProvider = ({ children }) => {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      loadSubscription();
    } else {
      setSubscription(null);
      setLoading(false);
    }
  }, [user]);

  const loadSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        // Parse features JSON
        const formattedSubscription = {
          ...data,
          features: Array.isArray(data.features) ? data.features : [],
          projectLimit: getPlanLimits(data.plan).projectLimit,
          participantLimit: getPlanLimits(data.plan).participantLimit
        };
        setSubscription(formattedSubscription);
      } else {
        // Create default subscription if none exists
        await createDefaultSubscription();
      }
    } catch (error) {
      console.error('Error loading subscription:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([
          {
            user_id: user.id,
            plan: 'starter',
            status: 'active',
            ai_credits: 10,
            features: ['basic_analytics']
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const formattedSubscription = {
        ...data,
        features: Array.isArray(data.features) ? data.features : [],
        projectLimit: getPlanLimits(data.plan).projectLimit,
        participantLimit: getPlanLimits(data.plan).participantLimit
      };
      
      setSubscription(formattedSubscription);
    } catch (error) {
      console.error('Error creating default subscription:', error);
    }
  };

  const getPlanLimits = (plan) => {
    const limits = {
      starter: { projectLimit: 3, participantLimit: 25 },
      professional: { projectLimit: 10, participantLimit: 100 },
      enterprise: { projectLimit: -1, participantLimit: -1 }
    };
    return limits[plan] || limits.starter;
  };

  const upgradePlan = async (planId) => {
    try {
      const planFeatures = {
        starter: ['basic_analytics'],
        professional: [
          'advanced_analytics',
          'export_reports',
          'team_collaboration',
          'ai_module'
        ],
        enterprise: [
          'advanced_analytics',
          'export_reports',
          'team_collaboration',
          'ai_module',
          'custom_branding',
          'api_access',
          'priority_support'
        ]
      };

      const aiCredits = {
        starter: 10,
        professional: 50,
        enterprise: -1 // unlimited
      };

      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          plan: planId,
          features: planFeatures[planId] || [],
          ai_credits: aiCredits[planId] || 0,
          status: 'active'
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const formattedSubscription = {
        ...data,
        features: Array.isArray(data.features) ? data.features : [],
        projectLimit: getPlanLimits(data.plan).projectLimit,
        participantLimit: getPlanLimits(data.plan).participantLimit
      };

      setSubscription(formattedSubscription);
      return formattedSubscription;
    } catch (error) {
      console.error('Error upgrading plan:', error);
      throw error;
    }
  };

  const cancelSubscription = async () => {
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ status: 'canceled' })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const formattedSubscription = {
        ...data,
        features: Array.isArray(data.features) ? data.features : [],
        projectLimit: getPlanLimits(data.plan).projectLimit,
        participantLimit: getPlanLimits(data.plan).participantLimit
      };

      setSubscription(formattedSubscription);
      return formattedSubscription;
    } catch (error) {
      console.error('Error canceling subscription:', error);
      throw error;
    }
  };

  const updateAICredits = async (creditsToAdd) => {
    try {
      let newCredits;
      if (subscription.ai_credits === -1) {
        newCredits = -1; // Keep unlimited
      } else {
        newCredits = subscription.ai_credits + creditsToAdd;
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .update({ ai_credits: newCredits })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const formattedSubscription = {
        ...data,
        features: Array.isArray(data.features) ? data.features : [],
        projectLimit: getPlanLimits(data.plan).projectLimit,
        participantLimit: getPlanLimits(data.plan).participantLimit
      };

      setSubscription(formattedSubscription);
      return formattedSubscription;
    } catch (error) {
      console.error('Error updating AI credits:', error);
      throw error;
    }
  };

  const enableAIModule = async () => {
    try {
      if (subscription && !subscription.features.includes('ai_module')) {
        const updatedFeatures = [...subscription.features, 'ai_module'];
        
        const { data, error } = await supabase
          .from('subscriptions')
          .update({ features: updatedFeatures })
          .eq('user_id', user.id)
          .select()
          .single();

        if (error) throw error;

        const formattedSubscription = {
          ...data,
          features: Array.isArray(data.features) ? data.features : [],
          projectLimit: getPlanLimits(data.plan).projectLimit,
          participantLimit: getPlanLimits(data.plan).participantLimit
        };

        setSubscription(formattedSubscription);
        return formattedSubscription;
      }
      return subscription;
    } catch (error) {
      console.error('Error enabling AI module:', error);
      throw error;
    }
  };

  const value = {
    subscription,
    loading,
    upgradePlan,
    cancelSubscription,
    enableAIModule,
    updateAICredits,
    loadSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};