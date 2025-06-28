import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiSettings, FiUpload, FiSave, FiRefreshCw, FiGlobe, FiMail, FiShield } = FiIcons;

const SiteConfigPanel = () => {
  const { siteConfig, updateSiteConfig } = useAdmin();
  const [config, setConfig] = useState(siteConfig);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateSiteConfig(config);
      // Show success message
    } catch (error) {
      console.error('Failed to save configuration:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadingLogo(true);
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      const logoUrl = URL.createObjectURL(file);
      setConfig({
        ...config,
        branding: {
          ...config.branding,
          logoUrl
        }
      });
    } catch (error) {
      console.error('Failed to upload logo:', error);
    } finally {
      setUploadingLogo(false);
    }
  };

  const configSections = [
    {
      id: 'general',
      title: 'General Settings',
      icon: FiGlobe,
      fields: [
        {
          key: 'siteName',
          label: 'Site Name',
          type: 'text',
          description: 'Display name for your GCM platform'
        },
        {
          key: 'siteDescription',
          label: 'Site Description',
          type: 'textarea',
          description: 'Brief description for SEO and social sharing'
        },
        {
          key: 'defaultLanguage',
          label: 'Default Language',
          type: 'select',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Spanish' },
            { value: 'fr', label: 'French' },
            { value: 'de', label: 'German' }
          ],
          description: 'Default language for new users'
        },
        {
          key: 'timezone',
          label: 'Default Timezone',
          type: 'select',
          options: [
            { value: 'UTC', label: 'UTC' },
            { value: 'America/New_York', label: 'Eastern Time' },
            { value: 'America/Chicago', label: 'Central Time' },
            { value: 'America/Denver', label: 'Mountain Time' },
            { value: 'America/Los_Angeles', label: 'Pacific Time' },
            { value: 'Europe/London', label: 'GMT' },
            { value: 'Europe/Paris', label: 'Central European Time' }
          ],
          description: 'Default timezone for timestamps'
        }
      ]
    },
    {
      id: 'branding',
      title: 'Branding & Appearance',
      icon: FiSettings,
      fields: [
        {
          key: 'primaryColor',
          label: 'Primary Color',
          type: 'color',
          description: 'Main brand color used throughout the interface'
        },
        {
          key: 'secondaryColor',
          label: 'Secondary Color',
          type: 'color',
          description: 'Secondary brand color for accents'
        },
        {
          key: 'customCSS',
          label: 'Custom CSS',
          type: 'textarea',
          description: 'Additional CSS for custom styling',
          rows: 6
        }
      ]
    },
    {
      id: 'email',
      title: 'Email Configuration',
      icon: FiMail,
      fields: [
        {
          key: 'fromEmail',
          label: 'From Email',
          type: 'email',
          description: 'Default sender email address'
        },
        {
          key: 'fromName',
          label: 'From Name',
          type: 'text',
          description: 'Default sender name'
        },
        {
          key: 'replyToEmail',
          label: 'Reply-To Email',
          type: 'email',
          description: 'Email address for replies'
        },
        {
          key: 'emailFooter',
          label: 'Email Footer',
          type: 'textarea',
          description: 'Footer text for all outgoing emails'
        }
      ]
    },
    {
      id: 'security',
      title: 'Security Settings',
      icon: FiShield,
      fields: [
        {
          key: 'requireEmailVerification',
          label: 'Require Email Verification',
          type: 'checkbox',
          description: 'Users must verify email before accessing platform'
        },
        {
          key: 'enableTwoFactor',
          label: 'Enable Two-Factor Authentication',
          type: 'checkbox',
          description: 'Allow users to enable 2FA for additional security'
        },
        {
          key: 'sessionTimeout',
          label: 'Session Timeout (hours)',
          type: 'number',
          description: 'Automatic logout after inactivity',
          min: 1,
          max: 168
        },
        {
          key: 'maxLoginAttempts',
          label: 'Max Login Attempts',
          type: 'number',
          description: 'Lock account after failed attempts',
          min: 3,
          max: 10
        }
      ]
    }
  ];

  const getFieldValue = (section, field) => {
    if (section === 'general') {
      return config[field] || '';
    }
    return config[section]?.[field] || '';
  };

  const setFieldValue = (section, field, value) => {
    if (section === 'general') {
      setConfig({ ...config, [field]: value });
    } else {
      setConfig({
        ...config,
        [section]: {
          ...config[section],
          [field]: value
        }
      });
    }
  };

  const renderField = (section, field) => {
    const value = getFieldValue(section.id, field.key);

    switch (field.type) {
      case 'text':
      case 'email':
      case 'number':
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => setFieldValue(section.id, field.key, e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            min={field.min}
            max={field.max}
          />
        );
      
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => setFieldValue(section.id, field.key, e.target.value)}
            rows={field.rows || 3}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => setFieldValue(section.id, field.key, e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          >
            {field.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      
      case 'checkbox':
        return (
          <div className="mt-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setFieldValue(section.id, field.key, e.target.checked)}
                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">{field.description}</span>
            </label>
          </div>
        );
      
      case 'color':
        return (
          <div className="mt-1 flex items-center space-x-3">
            <input
              type="color"
              value={value}
              onChange={(e) => setFieldValue(section.id, field.key, e.target.value)}
              className="h-10 w-20 border border-gray-300 rounded-md"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => setFieldValue(section.id, field.key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="#000000"
            />
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Site Configuration</h2>
          <p className="text-gray-600 mt-1">Customize your platform settings and appearance</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50"
        >
          {saving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Saving...
            </>
          ) : (
            <>
              <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
              Save Changes
            </>
          )}
        </button>
      </div>

      {/* Logo Upload */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Logo & Branding</h3>
        <div className="flex items-center space-x-6">
          <div className="flex-shrink-0">
            {config.branding?.logoUrl ? (
              <img
                src={config.branding.logoUrl}
                alt="Site Logo"
                className="h-16 w-16 object-contain border border-gray-200 rounded-lg"
              />
            ) : (
              <div className="h-16 w-16 bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-400 text-xs">No Logo</span>
              </div>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Logo
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                disabled={uploadingLogo}
              />
              {uploadingLogo && (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Recommended: PNG or SVG format, max 2MB
            </p>
          </div>
        </div>
      </div>

      {/* Configuration Sections */}
      {configSections.map((section) => (
        <motion.div
          key={section.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 rounded-lg p-6"
        >
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={section.icon} className="w-4 h-4 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {section.fields.map((field) => (
              <div key={field.key} className={field.type === 'textarea' && field.rows > 3 ? 'md:col-span-2' : ''}>
                <label className="block text-sm font-medium text-gray-700">
                  {field.label}
                </label>
                {renderField(section, field)}
                {field.description && field.type !== 'checkbox' && (
                  <p className="text-xs text-gray-500 mt-1">{field.description}</p>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Preview */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Preview</h3>
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center space-x-3 mb-4">
            {config.branding?.logoUrl && (
              <img
                src={config.branding.logoUrl}
                alt="Preview Logo"
                className="h-8 w-8 object-contain"
              />
            )}
            <span className="text-xl font-bold" style={{ color: config.branding?.primaryColor }}>
              {config.siteName || 'Your Site Name'}
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            {config.siteDescription || 'Your site description will appear here.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SiteConfigPanel;