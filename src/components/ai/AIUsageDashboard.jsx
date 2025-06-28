import React from 'react';
import { motion } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiTrendingUp, FiActivity, FiClock, FiLayers } = FiIcons;

const AIUsageDashboard = () => {
  const { aiCredits, aiUsage } = useAI();

  const totalCreditsUsed = aiUsage.reduce((sum, usage) => sum + usage.creditsUsed, 0);
  const totalStatementsGenerated = aiUsage.reduce((sum, usage) => sum + (usage.statementsGenerated || 0), 0);
  const totalClustersGenerated = aiUsage.reduce((sum, usage) => sum + (usage.clustersGenerated || 0), 0);

  const stats = [
    {
      title: 'Available Credits',
      value: aiCredits === -1 ? '∞' : aiCredits,
      icon: FiZap,
      color: 'bg-purple-500'
    },
    {
      title: 'Credits Used',
      value: totalCreditsUsed,
      icon: FiActivity,
      color: 'bg-blue-500'
    },
    {
      title: 'Statements Generated',
      value: totalStatementsGenerated,
      icon: FiTrendingUp,
      color: 'bg-green-500'
    },
    {
      title: 'Clusters Generated',
      value: totalClustersGenerated,
      icon: FiLayers,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center">
              <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mr-4`}>
                <SafeIcon icon={stat.icon} className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Usage History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Recent AI Usage</h3>
        </div>
        
        {aiUsage.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <SafeIcon icon={FiZap} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No AI usage yet</p>
            <p className="text-sm">Start using AI features to see your usage history here.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {aiUsage.map((usage, index) => (
              <motion.div
                key={usage.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium text-gray-900">{usage.projectTitle}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        usage.type === 'statement_generation' 
                          ? 'bg-blue-100 text-blue-800'
                          : usage.type === 'clustering'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {usage.type === 'statement_generation' && <SafeIcon icon={FiTrendingUp} className="w-3 h-3 mr-1" />}
                        {usage.type === 'clustering' && <SafeIcon icon={FiLayers} className="w-3 h-3 mr-1" />}
                        {usage.type.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {format(new Date(usage.timestamp), 'MMM d, yyyy at h:mm a')}
                    </p>
                    {usage.statementsGenerated && (
                      <p className="text-sm text-green-600 mt-1">
                        Generated {usage.statementsGenerated} statements
                      </p>
                    )}
                    {usage.clustersGenerated && (
                      <p className="text-sm text-purple-600 mt-1">
                        Generated {usage.clustersGenerated} clusters
                      </p>
                    )}
                    {usage.statementsEnhanced && (
                      <p className="text-sm text-blue-600 mt-1">
                        Enhanced {usage.statementsEnhanced} statements
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                      -{usage.creditsUsed} credits
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AIUsageDashboard;