import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import CreateProjectModal from '../components/projects/CreateProjectModal';
import ProjectCard from '../components/projects/ProjectCard';
import DashboardStats from '../components/dashboard/DashboardStats';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiSettings, FiTrendingUp } = FiIcons;

const DashboardPage = () => {
  const { user } = useAuth();
  const { projects, loading } = useProjects();
  const { subscription } = useSubscription();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {user?.name}
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your strategic consulting projects and insights
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link
                to="/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                New Project
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <DashboardStats />

        {/* Subscription Status */}
        {subscription && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-lg shadow-sm p-6 mb-8"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-4">
                  <SafeIcon icon={FiTrendingUp} className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {subscription.plan.charAt(0).toUpperCase() + subscription.plan.slice(1)} Plan
                  </h3>
                  <p className="text-gray-600">
                    {subscription.projectLimit === -1 ? 'Unlimited' : `${projects.length}/${subscription.projectLimit}`} projects used
                  </p>
                </div>
              </div>
              <Link
                to="/pricing"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Manage Plan
              </Link>
            </div>
          </motion.div>
        )}

        {/* Active Projects */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Active Projects ({activeProjects.length})
            </h2>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-2/3 mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : activeProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={FiPlus} className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No active projects yet
              </h3>
              <p className="text-gray-600 mb-6">
                Create your first Group Concept Mapping project to get started.
              </p>
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                Create Project
              </button>
            </div>
          )}
        </motion.section>

        {/* Completed Projects */}
        {completedProjects.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Completed Projects ({completedProjects.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
};

export default DashboardPage;