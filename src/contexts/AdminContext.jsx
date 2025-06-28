import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const AdminContext = createContext();

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

export const AdminProvider = ({ children }) => {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [apiKeys, setApiKeys] = useState({});
  const [siteConfig, setSiteConfig] = useState({
    siteName: 'GCM StrategyMap',
    siteDescription: 'Professional Group Concept Mapping platform for strategic consulting',
    defaultLanguage: 'en',
    timezone: 'UTC',
    branding: {
      primaryColor: '#3b82f6',
      secondaryColor: '#64748b',
      logoUrl: '',
      customCSS: ''
    },
    email: {
      fromEmail: 'noreply@strategymap.com',
      fromName: 'StrategyMap Platform',
      replyToEmail: 'support@strategymap.com',
      emailFooter: 'This email was sent by StrategyMap. If you have questions, please contact our support team.'
    },
    security: {
      requireEmailVerification: true,
      enableTwoFactor: false,
      sessionTimeout: 24,
      maxLoginAttempts: 5
    }
  });

  useEffect(() => {
    if (user) {
      checkAdminStatus();
      loadAPIKeys();
      loadSiteConfig();
    } else {
      setIsAdmin(false);
      setLoading(false);
    }
  }, [user]);

  const checkAdminStatus = async () => {
    try {
      // In a real app, this would check user roles/permissions
      // For demo purposes, we'll check if user email contains 'admin'
      const adminStatus = user?.email?.includes('admin') || user?.role === 'admin';
      setIsAdmin(adminStatus);
    } catch (error) {
      console.error('Failed to check admin status:', error);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  const loadAPIKeys = async () => {
    try {
      // Simulate API call to load encrypted API keys
      const mockKeys = {
        openai: process.env.REACT_APP_OPENAI_API_KEY || '',
        anthropic: process.env.REACT_APP_ANTHROPIC_API_KEY || '',
        'azure-openai': process.env.REACT_APP_AZURE_OPENAI_KEY || '',
        sendgrid: process.env.REACT_APP_SENDGRID_API_KEY || '',
        stripe: process.env.REACT_APP_STRIPE_SECRET_KEY || '',
        analytics: process.env.REACT_APP_GA_TRACKING_ID || ''
      };
      setApiKeys(mockKeys);
    } catch (error) {
      console.error('Failed to load API keys:', error);
    }
  };

  const loadSiteConfig = async () => {
    try {
      // In a real app, this would load from database
      const savedConfig = localStorage.getItem('siteConfig');
      if (savedConfig) {
        setSiteConfig({ ...siteConfig, ...JSON.parse(savedConfig) });
      }
    } catch (error) {
      console.error('Failed to load site config:', error);
    }
  };

  const updateAPIKey = async (serviceId, apiKey) => {
    try {
      // In a real app, this would encrypt and store the API key securely
      setApiKeys(prev => ({
        ...prev,
        [serviceId]: apiKey
      }));

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log(`API key updated for ${serviceId}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to update API key:', error);
      throw error;
    }
  };

  const testAPIConnection = async (serviceId, apiKey) => {
    try {
      // Simulate API connection test
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock different responses based on service
      const responses = {
        openai: { success: true, message: 'OpenAI API connection successful' },
        anthropic: { success: true, message: 'Claude API connection successful' },
        sendgrid: { success: true, message: 'SendGrid API connection successful' },
        stripe: { success: true, message: 'Stripe API connection successful' }
      };

      // Simulate occasional failures for demo
      if (Math.random() < 0.1) {
        return { success: false, error: 'Connection timeout' };
      }

      return responses[serviceId] || { success: true, message: 'API connection successful' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const updateSiteConfig = async (newConfig) => {
    try {
      setSiteConfig(newConfig);
      
      // Save to localStorage for demo (in real app, save to database)
      localStorage.setItem('siteConfig', JSON.stringify(newConfig));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Site configuration updated');
      return { success: true };
    } catch (error) {
      console.error('Failed to update site config:', error);
      throw error;
    }
  };

  const getUsers = async (page = 1, limit = 10, search = '') => {
    try {
      // Simulate API call for user management
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockUsers = [
        {
          id: '1',
          name: 'John Smith',
          email: 'john@company.com',
          role: 'admin',
          status: 'active',
          lastLogin: '2024-01-20T10:30:00Z',
          createdAt: '2024-01-01T00:00:00Z',
          projectCount: 5
        },
        {
          id: '2',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          role: 'consultant',
          status: 'active',
          lastLogin: '2024-01-19T15:45:00Z',
          createdAt: '2024-01-05T00:00:00Z',
          projectCount: 12
        },
        {
          id: '3',
          name: 'Mike Wilson',
          email: 'mike@company.com',
          role: 'user',
          status: 'inactive',
          lastLogin: '2024-01-10T09:15:00Z',
          createdAt: '2024-01-10T00:00:00Z',
          projectCount: 3
        }
      ];

      // Filter by search if provided
      const filteredUsers = search 
        ? mockUsers.filter(user => 
            user.name.toLowerCase().includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase())
          )
        : mockUsers;

      return {
        users: filteredUsers,
        total: filteredUsers.length,
        page,
        totalPages: Math.ceil(filteredUsers.length / limit)
      };
    } catch (error) {
      console.error('Failed to get users:', error);
      throw error;
    }
  };

  const updateUserRole = async (userId, newRole) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`User ${userId} role updated to ${newRole}`);
      return { success: true };
    } catch (error) {
      console.error('Failed to update user role:', error);
      throw error;
    }
  };

  const toggleUserStatus = async (userId) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      console.log(`User ${userId} status toggled`);
      return { success: true };
    } catch (error) {
      console.error('Failed to toggle user status:', error);
      throw error;
    }
  };

  const getSystemMetrics = async () => {
    try {
      // Simulate API call for system monitoring
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        uptime: '99.9%',
        responseTime: '150ms',
        activeUsers: 1250,
        totalProjects: 3420,
        apiCalls: 15680,
        errors: 12,
        cpu: 45,
        memory: 67,
        disk: 23,
        bandwidth: 156
      };
    } catch (error) {
      console.error('Failed to get system metrics:', error);
      throw error;
    }
  };

  const value = {
    isAdmin,
    loading,
    apiKeys,
    siteConfig,
    updateAPIKey,
    testAPIConnection,
    updateSiteConfig,
    getUsers,
    updateUserRole,
    toggleUserStatus,
    getSystemMetrics
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};