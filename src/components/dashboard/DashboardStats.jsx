import React from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../contexts/ProjectContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFolderPlus, FiUsers, FiMessageSquare, FiTrendingUp } = FiIcons;

const DashboardStats = () => {
  const { projects } = useProjects();

  const stats = [
    {
      title: 'Total Projects',
      value: projects.length,
      icon: FiFolderPlus,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase'
    },
    {
      title: 'Active Participants',
      value: projects.reduce((sum, p) => sum + p.participantCount, 0),
      icon: FiUsers,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase'
    },
    {
      title: 'Total Statements',
      value: projects.reduce((sum, p) => sum + p.statementCount, 0),
      icon: FiMessageSquare,
      color: 'bg-purple-500',
      change: '+23%',
      changeType: 'increase'
    },
    {
      title: 'Completion Rate',
      value: projects.length > 0 ? Math.round((projects.filter(p => p.status === 'completed').length / projects.length) * 100) : 0,
      icon: FiTrendingUp,
      color: 'bg-orange-500',
      change: '+5%',
      changeType: 'increase',
      suffix: '%'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600">{stat.title}</p>
              <div className="flex items-baseline">
                <p className="text-2xl font-semibold text-gray-900">
                  {stat.value}{stat.suffix}
                </p>
                <p className={`ml-2 text-sm font-medium ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DashboardStats;