import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiKey, FiEye, FiEyeOff, FiSave, FiRefreshCw, FiCheck, FiX, FiAlertTriangle } = FiIcons;

const APIKeysPanel = () => {
  const { apiKeys, updateAPIKey, testAPIConnection } = useAdmin();
  const [showKeys, setShowKeys] = useState({});
  const [editingKey, setEditingKey] = useState(null);
  const [keyValues, setKeyValues] = useState({});
  const [testingConnection, setTestingConnection] = useState({});
  const [connectionStatus, setConnectionStatus] = useState({});

  const apiServices = [
    {
      id: 'openai',
      name: 'OpenAI (ChatGPT)',
      description: 'GPT-4 and GPT-3.5 for AI brainstorming and clustering',
      icon: '🤖',
      placeholder: 'sk-...',
      required: true,
      testEndpoint: 'https://api.openai.com/v1/models',
      documentation: 'https://platform.openai.com/docs/api-reference'
    },
    {
      id: 'anthropic',
      name: 'Anthropic Claude',
      description: 'Claude AI for advanced reasoning and analysis',
      icon: '🧠',
      placeholder: 'sk-ant-...',
      required: false,
      testEndpoint: 'https://api.anthropic.com/v1/messages',
      documentation: 'https://docs.anthropic.com/claude/reference'
    },
    {
      id: 'azure-openai',
      name: 'Azure OpenAI',
      description: 'Enterprise OpenAI through Microsoft Azure',
      icon: '☁️',
      placeholder: 'your-azure-key',
      required: false,
      testEndpoint: null,
      documentation: 'https://docs.microsoft.com/en-us/azure/cognitive-services/openai/'
    },
    {
      id: 'sendgrid',
      name: 'SendGrid',
      description: 'Email delivery service for notifications',
      icon: '📧',
      placeholder: 'SG...',
      required: false,
      testEndpoint: 'https://api.sendgrid.com/v3/user/profile',
      documentation: 'https://docs.sendgrid.com/api-reference'
    },
    {
      id: 'stripe',
      name: 'Stripe',
      description: 'Payment processing for subscriptions',
      icon: '💳',
      placeholder: 'sk_live_... or sk_test_...',
      required: false,
      testEndpoint: 'https://api.stripe.com/v1/account',
      documentation: 'https://stripe.com/docs/api'
    },
    {
      id: 'analytics',
      name: 'Google Analytics',
      description: 'Website analytics and user tracking',
      icon: '📊',
      placeholder: 'GA-...',
      required: false,
      testEndpoint: null,
      documentation: 'https://developers.google.com/analytics/devguides/reporting/core/v4'
    }
  ];

  const handleEdit = (serviceId) => {
    setEditingKey(serviceId);
    setKeyValues({
      ...keyValues,
      [serviceId]: apiKeys[serviceId] || ''
    });
  };

  const handleSave = async (serviceId) => {
    try {
      await updateAPIKey(serviceId, keyValues[serviceId]);
      setEditingKey(null);
      setConnectionStatus({
        ...connectionStatus,
        [serviceId]: { status: 'saved', message: 'API key saved successfully' }
      });
      
      // Clear status after 3 seconds
      setTimeout(() => {
        setConnectionStatus(prev => ({
          ...prev,
          [serviceId]: null
        }));
      }, 3000);
    } catch (error) {
      setConnectionStatus({
        ...connectionStatus,
        [serviceId]: { status: 'error', message: 'Failed to save API key' }
      });
    }
  };

  const handleCancel = (serviceId) => {
    setEditingKey(null);
    setKeyValues({
      ...keyValues,
      [serviceId]: apiKeys[serviceId] || ''
    });
  };

  const handleTestConnection = async (serviceId) => {
    if (!apiKeys[serviceId] && !keyValues[serviceId]) {
      setConnectionStatus({
        ...connectionStatus,
        [serviceId]: { status: 'error', message: 'No API key provided' }
      });
      return;
    }

    setTestingConnection({ ...testingConnection, [serviceId]: true });
    
    try {
      const result = await testAPIConnection(serviceId, keyValues[serviceId] || apiKeys[serviceId]);
      setConnectionStatus({
        ...connectionStatus,
        [serviceId]: result.success 
          ? { status: 'success', message: 'Connection successful' }
          : { status: 'error', message: result.error || 'Connection failed' }
      });
    } catch (error) {
      setConnectionStatus({
        ...connectionStatus,
        [serviceId]: { status: 'error', message: 'Connection test failed' }
      });
    } finally {
      setTestingConnection({ ...testingConnection, [serviceId]: false });
    }
  };

  const toggleKeyVisibility = (serviceId) => {
    setShowKeys({
      ...showKeys,
      [serviceId]: !showKeys[serviceId]
    });
  };

  const maskKey = (key) => {
    if (!key) return '';
    if (key.length <= 8) return '••••••••';
    return key.substring(0, 4) + '••••••••' + key.substring(key.length - 4);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiKey} className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">API Key Management</h3>
            <p className="text-blue-800 mb-4">
              Configure external service integrations by adding your API keys. These keys are encrypted and stored securely.
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3">
              <div className="flex items-center">
                <SafeIcon icon={FiAlertTriangle} className="w-4 h-4 text-yellow-600 mr-2" />
                <span className="text-sm text-yellow-800">
                  <strong>Security Note:</strong> API keys are encrypted at rest and in transit. Only administrators can view and modify them.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* API Services */}
      <div className="grid grid-cols-1 gap-6">
        {apiServices.map((service) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <span className="text-2xl">{service.icon}</span>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                    {service.name}
                    {service.required && (
                      <span className="ml-2 px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Required
                      </span>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">{service.description}</p>
                </div>
              </div>
              
              {service.documentation && (
                <a
                  href={service.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  Documentation →
                </a>
              )}
            </div>

            {/* API Key Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  API Key
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    {editingKey === service.id ? (
                      <input
                        type={showKeys[service.id] ? 'text' : 'password'}
                        value={keyValues[service.id] || ''}
                        onChange={(e) => setKeyValues({
                          ...keyValues,
                          [service.id]: e.target.value
                        })}
                        placeholder={service.placeholder}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      />
                    ) : (
                      <input
                        type="text"
                        value={apiKeys[service.id] ? maskKey(apiKeys[service.id]) : 'Not configured'}
                        readOnly
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600"
                      />
                    )}
                    
                    {(editingKey === service.id || apiKeys[service.id]) && (
                      <button
                        onClick={() => toggleKeyVisibility(service.id)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <SafeIcon icon={showKeys[service.id] ? FiEyeOff : FiEye} className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {editingKey === service.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleSave(service.id)}
                        className="px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors"
                      >
                        <SafeIcon icon={FiSave} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleCancel(service.id)}
                        className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <SafeIcon icon={FiX} className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleEdit(service.id)}
                      className="px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      {apiKeys[service.id] ? 'Edit' : 'Add'}
                    </button>
                  )}

                  {service.testEndpoint && (apiKeys[service.id] || editingKey === service.id) && (
                    <button
                      onClick={() => handleTestConnection(service.id)}
                      disabled={testingConnection[service.id]}
                      className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50"
                    >
                      {testingConnection[service.id] ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <SafeIcon icon={FiRefreshCw} className="w-4 h-4" />
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Connection Status */}
              <AnimatePresence>
                {connectionStatus[service.id] && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className={`p-3 rounded-md ${
                      connectionStatus[service.id].status === 'success'
                        ? 'bg-green-50 border border-green-200'
                        : connectionStatus[service.id].status === 'error'
                        ? 'bg-red-50 border border-red-200'
                        : 'bg-blue-50 border border-blue-200'
                    }`}
                  >
                    <div className="flex items-center">
                      <SafeIcon 
                        icon={
                          connectionStatus[service.id].status === 'success' ? FiCheck :
                          connectionStatus[service.id].status === 'error' ? FiX : FiRefreshCw
                        } 
                        className={`w-4 h-4 mr-2 ${
                          connectionStatus[service.id].status === 'success' ? 'text-green-600' :
                          connectionStatus[service.id].status === 'error' ? 'text-red-600' : 'text-blue-600'
                        }`} 
                      />
                      <span className={`text-sm ${
                        connectionStatus[service.id].status === 'success' ? 'text-green-800' :
                        connectionStatus[service.id].status === 'error' ? 'text-red-800' : 'text-blue-800'
                      }`}>
                        {connectionStatus[service.id].message}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Usage Guidelines */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">API Key Guidelines</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Security Best Practices</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Use environment-specific keys (test vs production)</li>
              <li>• Regularly rotate API keys for security</li>
              <li>• Monitor API usage and set billing alerts</li>
              <li>• Restrict key permissions to minimum required</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-gray-900 mb-2">Troubleshooting</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Ensure keys have correct permissions</li>
              <li>• Check API rate limits and quotas</li>
              <li>• Verify billing status with providers</li>
              <li>• Test connections after key updates</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIKeysPanel;