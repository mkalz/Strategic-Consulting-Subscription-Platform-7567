import React from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiShield, FiUsers, FiBarChart2, FiLayers, FiCreditCard } from 'react-icons/fi';

const HomePage = () => {
  const features = [
    {
      icon: FiUsers,
      title: 'User Management',
      description: 'Complete user authentication and management system with roles and permissions.'
    },
    {
      icon: FiCreditCard,
      title: 'Billing & Subscriptions',
      description: 'Stripe integration with subscription plans and payment processing.'
    },
    {
      icon: FiBarChart2,
      title: 'Analytics Dashboard',
      description: 'Beautiful charts and metrics to track your SaaS performance.'
    },
    {
      icon: FiLayers,
      title: 'Component Library',
      description: 'Pre-built React components for rapid SaaS development.'
    },
    {
      icon: FiZap,
      title: 'API Integration',
      description: 'Ready-to-use API endpoints and data management patterns.'
    },
    {
      icon: FiShield,
      title: 'Security Features',
      description: 'Enterprise-grade security with authentication and authorization.'
    }
  ];

  const stats = [
    { label: 'Components', value: '50+' },
    { label: 'Pages', value: '12' },
    { label: 'Integrations', value: '8' },
    { label: 'Lines of Code', value: '10K+' }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          SaaS Prebuilt{' '}
          <span className="block text-blue-600">Components</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Accelerate your SaaS development with our comprehensive library of pre-built components, pages, and integrations. Build faster, ship sooner.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Get Started
          </button>
          <button className="border border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold transition-colors">
            View Components
          </button>
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <feature.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="bg-blue-600 rounded-lg p-8 text-center text-white"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to Build Your SaaS?</h2>
        <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
          Start with our component library and ship your SaaS product faster than ever. 
          Everything you need is already built and ready to customize.
        </p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
          Start Building Now
        </button>
      </motion.div>
    </div>
  );
};

export default HomePage;