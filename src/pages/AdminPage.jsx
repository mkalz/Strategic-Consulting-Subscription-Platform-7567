import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useAdmin } from '../contexts/AdminContext';
import APIKeysPanel from '../components/admin/APIKeysPanel';
import SiteConfigPanel from '../components/admin/SiteConfigPanel';
import UserManagementPanel from '../components/admin/UserManagementPanel';
import SystemMonitoringPanel from '../components/admin/SystemMonitoringPanel';
import FeatureTogglesPanel from '../components/admin/FeatureTogglesPanel';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiKey, FiUsers, FiMonitor, FiToggleLeft, FiShield, FiDatabase, FiMail } = FiIcons;

const AdminPage = () => {
  const { user } = useAuth();
  const { isAdmin, loading } = useAdmin();
  const [activeTab, setActiveTab] = useState('api-keys');

  // Redirect if not admin
  if (!loading && !isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <SafeIcon icon={FiShield} className="w-16 h-16 mx-auto text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  const tabs = [
    {
      id: 'api-keys',
      label: 'API Keys',
      icon: FiKey,
      description: 'Manage external service integrations'
    },
    {
      id: 'site-config',
      label: 'Site Configuration',
      icon: FiSettings,
      description: 'General site settings and branding'
    },
    {
      id: 'users',
      label: 'User Management',
      icon: FiUsers,
      description: 'Manage users and permissions'
    },
    {
      id: 'features',
      label: 'Feature Toggles',
      icon: FiToggleLeft,
      description: 'Enable/disable platform features'
    },
    {
      id: 'monitoring',
      label: 'System Monitoring',
      icon: FiMonitor,
      description: 'System health and analytics'
    }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'api-keys':
        return <APIKeysPanel />;
      case 'site-config':
        return <SiteConfigPanel />;
      case 'users':
        return <UserManagementPanel />;
      case 'features':
        return <FeatureTogglesPanel />;
      case 'monitoring':
        return <SystemMonitoringPanel />;
      default:
        return <APIKeysPanel />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Manage system configuration and settings</p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <SafeIcon icon={FiShield} className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-sm text-yellow-800">
                <strong>Admin Access:</strong> You have administrative privileges. Changes made here affect all users.
              </span>
            </div>
          </div>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8"
        >
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={tab.icon} className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
          
          {/* Tab Description */}
          <div className="px-6 py-3 bg-gray-50">
            <p className="text-sm text-gray-600">
              {tabs.find(tab => tab.id === activeTab)?.description}
            </p>
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPage;