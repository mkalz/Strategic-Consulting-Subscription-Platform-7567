import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useProjects } from '../contexts/ProjectContext';
import { useSubscription } from '../contexts/SubscriptionContext';
import { useAI } from '../contexts/AIContext';
import { useLanguage } from '../contexts/LanguageContext';
import CreateProjectModal from '../components/projects/CreateProjectModal';
import ProjectCard from '../components/projects/ProjectCard';
import DashboardStats from '../components/dashboard/DashboardStats';
import AIUsageDashboard from '../components/ai/AIUsageDashboard';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiSettings, FiTrendingUp, FiZap, FiRefreshCw, FiAlertCircle } = FiIcons;

const DashboardPage = () => {
  const { user } = useAuth();
  const { projects, loading, loadProjects } = useProjects();
  const { subscription } = useSubscription();
  const { hasAIAccess, aiCredits } = useAI();
  const { t } = useLanguage();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [connectionStatus, setConnectionStatus] = useState('checking');

  // Force reload projects when user changes or component mounts
  useEffect(() => {
    if (user?.id) {
      console.log('Dashboard mounted, loading projects for user:', user.id);
      loadProjects().then(() => {
        setConnectionStatus('connected');
      }).catch(() => {
        setConnectionStatus('error');
      });
    }
  }, [user?.id, loadProjects]);

  const activeProjects = projects.filter(p => p.status === 'active');
  const completedProjects = projects.filter(p => p.status === 'completed');

  const handleRefreshProjects = () => {
    console.log('Manually refreshing projects...');
    setConnectionStatus('checking');
    loadProjects().then(() => {
      setConnectionStatus('connected');
    }).catch(() => {
      setConnectionStatus('error');
    });
  };

  const handleCreateProject = () => {
    console.log('Opening create project modal');
    setIsCreateModalOpen(true);
  };

  const handleCloseModal = () => {
    console.log('Closing create project modal');
    setIsCreateModalOpen(false);
  };

  // Show loading state while checking connection
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
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
              {/* Connection Status */}
              <div className="flex items-center space-x-2">
                {connectionStatus === 'checking' && (
                  <div className="flex items-center text-yellow-600">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-yellow-600 mr-2"></div>
                    <span className="text-sm">Connecting...</span>
                  </div>
                )}
                {connectionStatus === 'connected' && (
                  <div className="flex items-center text-green-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-sm">Connected</span>
                  </div>
                )}
                {connectionStatus === 'error' && (
                  <div className="flex items-center text-red-600">
                    <SafeIcon icon={FiAlertCircle} className="w-4 h-4 mr-2" />
                    <span className="text-sm">Connection Error</span>
                  </div>
                )}
              </div>

              <button
                onClick={handleRefreshProjects}
                disabled={loading}
                className="inline-flex items-center px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                <SafeIcon icon={FiRefreshCw} className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <Link
                to="/settings"
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                Settings
              </Link>
              <button
                onClick={handleCreateProject}
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

        {/* Subscription & AI Status */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Subscription Status */}
          {subscription && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-lg shadow-sm p-6"
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
                      {subscription.projectLimit === -1 
                        ? 'Unlimited projects' 
                        : `${projects.length}/${subscription.projectLimit} projects used`}
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

          {/* AI Status */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-lg shadow-sm p-6"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                  hasAIAccess ? 'bg-purple-100' : 'bg-gray-100'
                }`}>
                  <SafeIcon icon={FiZap} className={`w-5 h-5 ${
                    hasAIAccess ? 'text-purple-600' : 'text-gray-400'
                  }`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    AI Assistant
                  </h3>
                  <p className="text-gray-600">
                    {hasAIAccess 
                      ? (aiCredits === -1 ? 'Unlimited credits' : `${aiCredits} credits remaining`)
                      : 'Not enabled'}
                  </p>
                </div>
              </div>
              {hasAIAccess ? (
                <button
                  onClick={() => setActiveTab('ai')}
                  className="text-purple-600 hover:text-purple-700 font-medium"
                >
                  View Usage
                </button>
              ) : (
                <Link
                  to="/pricing"
                  className="text-primary-600 hover:text-primary-700 font-medium"
                >
                  Enable AI
                </Link>
              )}
            </div>
          </motion.div>
        </div>

        {/* Debug Info */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              Debug: User ID: {user?.id} | Projects loaded: {projects.length} | Loading: {loading ? 'Yes' : 'No'} | Status: {connectionStatus}
            </p>
          </div>
        )}

        {/* Connection Error Alert */}
        {connectionStatus === 'error' && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-center">
              <SafeIcon icon={FiAlertCircle} className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h4 className="font-medium text-red-900">Connection Error</h4>
                <p className="text-sm text-red-700">
                  Unable to connect to the database. Please check your connection and try refreshing.
                </p>
              </div>
              <button
                onClick={handleRefreshProjects}
                className="ml-auto px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              <button
                onClick={() => setActiveTab('projects')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'projects'
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Projects
              </button>
              {hasAIAccess && (
                <button
                  onClick={() => setActiveTab('ai')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center ${
                    activeTab === 'ai'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <SafeIcon icon={FiZap} className="w-4 h-4 mr-1" />
                  AI Usage
                </button>
              )}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'projects' && (
          <>
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
                    onClick={handleCreateProject}
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
          </>
        )}

        {activeTab === 'ai' && hasAIAccess && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <AIUsageDashboard />
          </motion.div>
        )}
      </div>

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default DashboardPage;