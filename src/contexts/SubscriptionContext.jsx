import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

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
      // For now, use mock data since Supabase subscription table might not be ready
      const mockSubscription = {
        id: 'mock_sub_1',
        user_id: user.id,
        plan: 'professional',
        status: 'active',
        ai_credits: 50,
        features: ['basic_analytics', 'advanced_analytics', 'export_reports', 'team_collaboration', 'ai_module'],
        projectLimit: 10,
        participantLimit: 100,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      setSubscription(mockSubscription);
    } catch (error) {
      console.error('Error loading subscription:', error);
      // Set default subscription on error
      setSubscription({
        plan: 'starter',
        status: 'active',
        ai_credits: 10,
        features: ['basic_analytics'],
        projectLimit: 3,
        participantLimit: 25
      });
    } finally {
      setLoading(false);
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

      const updatedSubscription = {
        ...subscription,
        plan: planId,
        features: planFeatures[planId] || [],
        ai_credits: aiCredits[planId] || 0,
        status: 'active',
        ...getPlanLimits(planId)
      };

      setSubscription(updatedSubscription);
      return updatedSubscription;
    } catch (error) {
      console.error('Error upgrading plan:', error);
      throw error;
    }
  };

  const value = {
    subscription,
    loading,
    upgradePlan,
    loadSubscription
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};