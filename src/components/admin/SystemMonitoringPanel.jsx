import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../../contexts/AdminContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMonitor, FiCpu, FiHardDrive, FiWifi, FiActivity, FiUsers, FiAlertTriangle, FiCheckCircle } = FiIcons;

const SystemMonitoringPanel = () => {
  const { getSystemMetrics } = useAdmin();
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    loadMetrics();
    const interval = setInterval(loadMetrics, 30000); // Update every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const loadMetrics = async () => {
    try {
      const data = await getSystemMetrics();
      setMetrics(data);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to load system metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (value, thresholds) => {
    if (value >= thresholds.danger) return 'text-red-600 bg-red-100';
    if (value >= thresholds.warning) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  const getProgressColor = (value, thresholds) => {
    if (value >= thresholds.danger) return 'bg-red-500';
    if (value >= thresholds.warning) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">System Monitoring</h2>
          <p className="text-gray-600 mt-1">
            Real-time system health and performance metrics
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Last updated: {lastUpdated.toLocaleTimeString()}
        </div>
      </div>

      {/* System Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Uptime',
            value: metrics?.uptime,
            icon: FiCheckCircle,
            color: 'bg-green-500',
            status: 'healthy'
          },
          {
            title: 'Response Time',
            value: metrics?.responseTime,
            icon: FiActivity,
            color: 'bg-blue-500',
            status: 'healthy'
          },
          {
            title: 'Active Users',
            value: metrics?.activeUsers?.toLocaleString(),
            icon: FiUsers,
            color: 'bg-purple-500',
            status: 'healthy'
          },
          {
            title: 'API Calls',
            value: metrics?.apiCalls?.toLocaleString(),
            icon: FiWifi,
            color: 'bg-orange-500',
            status: 'healthy'
          }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Resource Usage */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Resource Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'CPU Usage',
              value: metrics?.cpu,
              icon: FiCpu,
              unit: '%',
              thresholds: { warning: 70, danger: 90 }
            },
            {
              name: 'Memory Usage',
              value: metrics?.memory,
              icon: FiMonitor,
              unit: '%',
              thresholds: { warning: 80, danger: 95 }
            },
            {
              name: 'Disk Usage',
              value: metrics?.disk,
              icon: FiHardDrive,
              unit: '%',
              thresholds: { warning: 80, danger: 95 }
            },
            {
              name: 'Bandwidth',
              value: metrics?.bandwidth,
              icon: FiWifi,
              unit: 'Mbps',
              thresholds: { warning: 80, danger: 95 }
            }
          ].map((resource, index) => (
            <motion.div
              key={resource.name}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center mb-3">
                <SafeIcon icon={resource.icon} className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-600 mb-2">{resource.name}</p>
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                  <div
                    className={`h-3 rounded-full transition-all duration-500 ${getProgressColor(resource.value, resource.thresholds)}`}
                    style={{ width: `${Math.min(resource.value, 100)}%` }}
                  ></div>
                </div>
                <p className={`text-lg font-semibold px-2 py-1 rounded-full ${getStatusColor(resource.value, resource.thresholds)}`}>
                  {resource.value}{resource.unit}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Error Logs */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Errors</h3>
          <div className="space-y-3">
            {[
              {
                time: '2 minutes ago',
                error: 'API rate limit exceeded',
                severity: 'warning'
              },
              {
                time: '15 minutes ago',
                error: 'Database connection timeout',
                severity: 'error'
              },
              {
                time: '1 hour ago',
                error: 'Invalid API key provided',
                severity: 'warning'
              }
            ].map((log, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
                <SafeIcon 
                  icon={log.severity === 'error' ? FiAlertTriangle : FiActivity} 
                  className={`w-4 h-4 mt-0.5 ${
                    log.severity === 'error' ? 'text-red-600' : 'text-yellow-600'
                  }`} 
                />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{log.error}</p>
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
          <div className="space-y-4">
            {[
              { service: 'Web Server', status: 'healthy', uptime: '99.9%' },
              { service: 'Database', status: 'healthy', uptime: '99.8%' },
              { service: 'Redis Cache', status: 'healthy', uptime: '100%' },
              { service: 'Email Service', status: 'warning', uptime: '98.5%' },
              { service: 'File Storage', status: 'healthy', uptime: '99.9%' }
            ].map((service, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    service.status === 'healthy' ? 'bg-green-500' : 
                    service.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}></div>
                  <span className="text-sm font-medium text-gray-900">{service.service}</span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{service.uptime}</p>
                  <p className={`text-xs ${
                    service.status === 'healthy' ? 'text-green-600' : 
                    service.status === 'warning' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {service.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitoringPanel;