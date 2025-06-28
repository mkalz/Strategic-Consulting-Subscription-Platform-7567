import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiUsers, FiTarget, FiBarChart3, FiLayers, FiZap, FiShield } = FiIcons;

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
      icon: FiTarget,
      title: t('home.features.rating.title'),
      description: t('home.features.rating.description')
    },
    {
      icon: FiBarChart3,
      title: t('home.features.analytics.title'),
      description: t('home.features.analytics.description')
    },
    {
      icon: FiZap,
      title: t('home.features.realtime.title'),
      description: t('home.features.realtime.description')
    },
    {
      icon: FiShield,
      title: t('home.features.security.title'),
      description: t('home.features.security.description')
    }
  ];

  const steps = [
    {
      number: '01',
      title: t('gcm.phases.brainstorming'),
      description: t('gcm.brainstorming.description')
    },
    {
      number: '02',
      title: t('gcm.phases.structuring'),
      description: t('gcm.structuring.description')
    },
    {
      number: '03',
      title: t('gcm.phases.rating'),
      description: t('gcm.rating.description')
    },
    {
      number: '04',
      title: t('gcm.phases.analysis'),
      description: t('gcm.analysis.description')
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {t('home.heroTitle')}
              <span className="text-primary-600 block">{t('home.heroSubtitle')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              {t('home.heroDescription')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                {t('home.startFreeTrial')}
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
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
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <SafeIcon icon={feature.icon} className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('home.processTitle')}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t('home.processDescription')}
            </p>
          </motion.div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 bg-white rounded-xl p-8 shadow-sm">
                  <div className="flex items-center mb-4">
                    <span className="text-3xl font-bold text-primary-600 mr-4">
                      {step.number}
                    </span>
                    <h3 className="text-2xl font-semibold text-gray-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 text-lg">
                    {step.description}
                  </p>
                </div>
                <div className="w-32 h-32 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-4xl font-bold text-primary-600">
                    {step.number}
                  </span>
                </div>
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
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home.ctaTitle')}
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              {t('home.ctaDescription')}
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
            >
              {t('home.startFreeTrial')}
              <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;