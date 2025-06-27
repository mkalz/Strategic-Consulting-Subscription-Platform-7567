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
    if (user) {
      // Simulate fetching subscription data
      const mockSubscription = {
        id: 'sub_1',
        plan: 'professional',
        status: 'active',
        currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        projectLimit: 10,
        participantLimit: 100,
        features: ['advanced_analytics', 'export_reports', 'team_collaboration']
      };
      setSubscription(mockSubscription);
    }
    setLoading(false);
  }, [user]);

  const upgradePlan = async (planId) => {
    // Simulate plan upgrade
    const updatedSubscription = {
      ...subscription,
      plan: planId,
      projectLimit: planId === 'enterprise' ? -1 : planId === 'professional' ? 10 : 3,
      participantLimit: planId === 'enterprise' ? -1 : planId === 'professional' ? 100 : 25
    };
    setSubscription(updatedSubscription);
    return updatedSubscription;
  };

  const cancelSubscription = async () => {
    const updatedSubscription = {
      ...subscription,
      status: 'canceled'
    };
    setSubscription(updatedSubscription);
    return updatedSubscription;
  };

  const value = {
    subscription,
    upgradePlan,
    cancelSubscription,
    loading
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
};