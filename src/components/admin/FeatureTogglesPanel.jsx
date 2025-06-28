import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiToggleLeft, FiToggleRight, FiZap, FiUsers, FiBarChart3, FiMail, FiShield, FiGlobe } = FiIcons;

const FeatureTogglesPanel = () => {
  const [features, setFeatures] = useState({
    aiModule: true,
    realTimeCollaboration: true,
    advancedAnalytics: true,
    emailNotifications: true,
    teamManagement: true,
    customBranding: false,
    apiAccess: false,
    ssoIntegration: false,
    auditLogs: true,
    exportFeatures: true,
    mobileApp: false,
    webhooks: false
  });

  const [saving, setSaving] = useState(false);

  const featureGroups = [
    {
      name: 'Core Features',
      description: 'Essential platform functionality',
      features: [
        {
          key: 'aiModule',
          name: 'AI Module',
          description: 'AI-powered brainstorming and clustering',
          icon: FiZap,
          impact: 'High',
          beta: false
        },
        {
          key: 'realTimeCollaboration',
          name: 'Real-time Collaboration',
          description: 'Live editing and participant interaction',
          icon: FiUsers,
          impact: 'High',
          beta: false
        },
        {
          key: 'advancedAnalytics',
          name: 'Advanced Analytics',
          description: 'Detailed reporting and insights',
          icon: FiBarChart3,
          impact: 'Medium',
          beta: false
        }
      ]
    },
    {
      name: 'Communication',
      description: 'User communication and notifications',
      features: [
        {
          key: 'emailNotifications',
          name: 'Email Notifications',
          description: 'Automated email alerts and updates',
          icon: FiMail,
          impact: 'Medium',
          beta: false
        },
        {
          key: 'webhooks',
          name: 'Webhooks',
          description: 'External system integrations',
          icon: FiGlobe,
          impact: 'Low',
          beta: true
        }
      ]
    },
    {
      name: 'Team & Enterprise',
      description: 'Team collaboration and enterprise features',
      features: [
        {
          key: 'teamManagement',
          name: 'Team Management',
          description: 'Multi-user teams and permissions',
          icon: FiUsers,
          impact: 'High',
          beta: false
        },
        {
          key: 'customBranding',
          name: 'Custom Branding',
          description: 'White-label customization options',
          icon: FiShield,
          impact: 'Low',
          beta: false
        },
        {
          key: 'ssoIntegration',
          name: 'SSO Integration',
          description: 'Single sign-on with SAML/OAuth',
          icon: FiShield,
          impact: 'Medium',
          beta: true
        },
        {
          key: 'auditLogs',
          name: 'Audit Logs',
          description: 'Detailed activity tracking',
          icon: FiShield,
          impact: 'Medium',
          beta: false
        }
      ]
    },
    {
      name: 'Data & Integration',
      description: 'Data management and external integrations',
      features: [
        {
          key: 'exportFeatures',
          name: 'Export Features',
          description: 'Multiple export formats (PDF, CSV, etc.)',
          icon: FiBarChart3,
          impact: 'Medium',
          beta: false
        },
        {
          key: 'apiAccess',
          name: 'API Access',
          description: 'RESTful API for external integrations',
          icon: FiGlobe,
          impact: 'Low',
          beta: false
        },
        {
          key: 'mobileApp',
          name: 'Mobile App',
          description: 'Native mobile applications',
          icon: FiUsers,
          impact: 'High',
          beta: true
        }
      ]
    }
  ];

  const toggleFeature = (featureKey) => {
    setFeatures(prev => ({
      ...prev,
      [featureKey]: !prev[featureKey]
    }));
  };

  const saveChanges = async () => {
    setSaving(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Feature toggles saved:', features);
    } catch (error) {
      console.error('Failed to save feature toggles:', error);
    } finally {
      setSaving(false);
    }
  };

  const getImpactColor = (impact) => {
    switch (impact) {
      case 'High':
        return 'text-red-600 bg-red-100';
      case 'Medium':
        return 'text-yellow-600 bg-yellow-100';
      case 'Low':
        return 'text-green-600 bg-green-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const enabledCount = Object.values(features).filter(Boolean).length;
  const totalCount = Object.keys(features).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Feature Toggles</h2>
          <p className="text-gray-600 mt-1">
            Enable or disable platform features. Changes affect all users immediately.
          </p>
        </div>
        <button
          onClick={saveChanges}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            'Save Changes'
          )}
        </button>
      </div>

      {/* Overview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Feature Overview</h3>
          <div className="text-sm text-gray-600">
            {enabledCount} of {totalCount} features enabled
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(enabledCount / totalCount) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Feature Groups */}
      {featureGroups.map((group, groupIndex) => (
        <motion.div
          key={group.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900">{group.name}</h3>
            <p className="text-gray-600 text-sm">{group.description}</p>
          </div>

          <div className="space-y-4">
            {group.features.map((feature) => (
              <div
                key={feature.key}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                    <SafeIcon icon={feature.icon} className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{feature.name}</h4>
                      {feature.beta && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                          Beta
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(feature.impact)}`}>
                        {feature.impact} Impact
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>

                <button
                  onClick={() => toggleFeature(feature.key)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                    features[feature.key]
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <SafeIcon 
                    icon={features[feature.key] ? FiToggleRight : FiToggleLeft} 
                    className="w-5 h-5" 
                  />
                  <span className="text-sm font-medium">
                    {features[feature.key] ? 'Enabled' : 'Disabled'}
                  </span>
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Warning */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
        <div className="flex items-start">
          <SafeIcon icon={FiShield} className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
          <div>
            <h4 className="font-medium text-yellow-900 mb-1">Important Notes</h4>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Feature changes take effect immediately for all users</li>
              <li>• Beta features may have limited functionality or stability</li>
              <li>• Disabling core features may impact user experience</li>
              <li>• Some features require API keys to be configured</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureTogglesPanel;