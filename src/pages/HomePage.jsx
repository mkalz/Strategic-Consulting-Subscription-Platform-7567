import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiLayers, FiStar, FiBarChart2, FiClock, FiShield } = FiIcons;

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FiUsers,
      title: t('home.features.collaboration.title'),
      description: t('home.features.collaboration.description')
    },
    {
      icon: FiLayers,
      title: t('home.features.structuring.title'),
      description: t('home.features.structuring.description')
    },
    {
      icon: FiStar,
      title: t('home.features.rating.title'),
      description: t('home.features.rating.description')
    },
    {
      icon: FiBarChart2,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description')
    },
    {
      icon: FiClock,
      title: t('home.features.realtime.title'),
      description: t('home.features.realtime.description')
    },
    {
      icon: FiShield,
      title: t('home.features.security.title'),
      description: t('home.features.security.description')
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: t('gcm.phases.brainstorming'),
      description: 'Generate ideas and statements related to your strategic focus question'
    },
    {
      number: '02',
      title: t('gcm.phases.structuring'),
      description: 'Organize concepts into meaningful clusters and relationships'
    },
    {
      number: '03',
      title: t('gcm.phases.rating'),
      description: 'Rate statements on importance and feasibility for prioritization'
    },
    {
      number: '04',
      title: t('gcm.phases.analysis'),
      description: 'Generate insights and actionable strategic recommendations'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.heroTitle')}{' '}
              <span className="block text-primary-600">{t('home.heroSubtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                {t('home.startFreeTrial')}
              </Link>
              <Link
                to="/pricing"
                className="border-2 border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors"
              >
                {t('home.viewPricing')}
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.featuresTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.featuresDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-6">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.processTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.processDescription')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mb-6 mx-auto">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              {t('home.ctaDescription')}
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-primary-50 transition-colors"
            >
              {t('home.startFreeTrial')}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;