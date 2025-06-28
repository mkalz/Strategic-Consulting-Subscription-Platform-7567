import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX } = FiIcons;

const PricingPage = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const plans = [
    {
      id: 'starter',
      name: t('pricing.plans.starter.name'),
      price: t('pricing.plans.starter.price'),
      period: t('pricing.plans.starter.period'),
      description: t('pricing.plans.starter.description'),
      features: [
        { name: t('pricing.plans.starter.features.projects'), included: true },
        { name: t('pricing.plans.starter.features.participants'), included: true },
        { name: t('pricing.plans.starter.features.mapping'), included: true },
        { name: t('pricing.plans.starter.features.reporting'), included: true },
        { name: t('pricing.plans.starter.features.support'), included: true },
        { name: t('pricing.plans.starter.features.export'), included: true },
        { name: t('pricing.plans.starter.features.analytics'), included: false },
        { name: t('pricing.plans.starter.features.branding'), included: false },
        { name: t('pricing.plans.starter.features.api'), included: false },
        { name: t('pricing.plans.starter.features.priority'), included: false }
      ],
      cta: t('pricing.plans.starter.cta'),
      popular: false
    },
    {
      id: 'professional',
      name: t('pricing.plans.professional.name'),
      price: t('pricing.plans.professional.price'),
      period: t('pricing.plans.professional.period'),
      description: t('pricing.plans.professional.description'),
      features: [
        { name: t('pricing.plans.professional.features.projects'), included: true },
        { name: t('pricing.plans.professional.features.participants'), included: true },
        { name: t('pricing.plans.professional.features.mapping'), included: true },
        { name: t('pricing.plans.professional.features.reporting'), included: true },
        { name: t('pricing.plans.professional.features.support'), included: true },
        { name: t('pricing.plans.professional.features.export'), included: true },
        { name: t('pricing.plans.professional.features.branding'), included: true },
        { name: t('pricing.plans.professional.features.collaboration'), included: true },
        { name: t('pricing.plans.professional.features.api'), included: false },
        { name: t('pricing.plans.professional.features.whitelabel'), included: false }
      ],
      cta: t('pricing.plans.professional.cta'),
      popular: true
    },
    {
      id: 'enterprise',
      name: t('pricing.plans.enterprise.name'),
      price: t('pricing.plans.enterprise.price'),
      period: t('pricing.plans.enterprise.period'),
      description: t('pricing.plans.enterprise.description'),
      features: [
        { name: t('pricing.plans.enterprise.features.projects'), included: true },
        { name: t('pricing.plans.enterprise.features.participants'), included: true },
        { name: t('pricing.plans.enterprise.features.platform'), included: true },
        { name: t('pricing.plans.enterprise.features.dashboards'), included: true },
        { name: t('pricing.plans.enterprise.features.manager'), included: true },
        { name: t('pricing.plans.enterprise.features.export'), included: true },
        { name: t('pricing.plans.enterprise.features.whitelabel'), included: true },
        { name: t('pricing.plans.enterprise.features.api'), included: true },
        { name: t('pricing.plans.enterprise.features.deployment'), included: true },
        { name: t('pricing.plans.enterprise.features.integrations'), included: true }
      ],
      cta: t('pricing.plans.enterprise.cta'),
      popular: false
    }
  ];

  const faqItems = [
    {
      question: t('pricing.faq.questions.trial.question'),
      answer: t('pricing.faq.questions.trial.answer')
    },
    {
      question: t('pricing.faq.questions.changePlans.question'),
      answer: t('pricing.faq.questions.changePlans.answer')
    },
    {
      question: t('pricing.faq.questions.billing.question'),
      answer: t('pricing.faq.questions.billing.answer')
    },
    {
      question: t('pricing.faq.questions.custom.question'),
      answer: t('pricing.faq.questions.custom.answer')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('pricing.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('pricing.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${
                plan.popular
                  ? 'border-2 border-primary-500 transform scale-105'
                  : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    {t('pricing.mostPopular')}
                  </span>
                </div>
              )}

              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">{plan.period}</span>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <SafeIcon
                        icon={feature.included ? FiCheck : FiX}
                        className={`w-5 h-5 mr-3 ${
                          feature.included ? 'text-green-500' : 'text-gray-400'
                        }`}
                      />
                      <span className={feature.included ? 'text-gray-900' : 'text-gray-500'}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={user ? '/dashboard' : '/signup'}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-medium transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'border border-primary-600 text-primary-600 hover:bg-primary-50'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            {t('pricing.faq.title')}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqItems.map((item, index) => (
              <div key={index}>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {item.question}
                </h3>
                <p className="text-gray-600">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;