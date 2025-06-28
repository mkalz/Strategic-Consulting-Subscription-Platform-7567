import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiZap } = FiIcons;

const PricingPage = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Starter',
      price: '$49',
      period: '/month',
      description: 'Perfect for small consulting projects and individual consultants.',
      features: [
        { name: 'Up to 3 active projects', included: true },
        { name: 'Up to 25 participants per project', included: true },
        { name: 'Basic concept mapping tools', included: true },
        { name: 'Standard reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'Data export (CSV)', included: true },
        { name: 'AI Brainstorming Assistant', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Start Free Trial',
      popular: false
    },
    {
      name: 'Professional',
      price: '$149',
      period: '/month',
      description: 'Ideal for consulting firms and organizations with multiple projects.',
      features: [
        { name: 'Up to 10 active projects', included: true },
        { name: 'Up to 100 participants per project', included: true },
        { name: 'Advanced concept mapping tools', included: true },
        { name: 'Advanced reporting & analytics', included: true },
        { name: 'Priority email & chat support', included: true },
        { name: 'Data export (CSV, PDF, PowerPoint)', included: true },
        { name: 'AI Brainstorming Assistant', included: true, highlight: true },
        { name: '50 AI credits per month', included: true, highlight: true },
        { name: 'Custom branding', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: true }
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with complex strategic consulting needs.',
      features: [
        { name: 'Unlimited active projects', included: true },
        { name: 'Unlimited participants', included: true },
        { name: 'Full suite of mapping tools', included: true },
        { name: 'Custom reporting & dashboards', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'All export formats + custom', included: true },
        { name: 'AI Brainstorming Assistant', included: true, highlight: true },
        { name: 'Unlimited AI credits', included: true, highlight: true },
        { name: 'Full custom branding', included: true },
        { name: 'Full API access', included: true },
        { name: 'Priority support', included: true }
      ],
      cta: 'Contact Sales',
      popular: false
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
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Select the perfect plan for your strategic consulting needs. All plans include a 14-day free trial with full access to features.
          </p>
        </motion.div>

        {/* AI Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-2xl p-8 mb-12"
        >
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiZap} className="w-8 h-8 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-purple-900 mb-2">
              NEW: AI-Powered Brainstorming
            </h2>
            <p className="text-purple-800 mb-6 max-w-2xl mx-auto">
              Generate intelligent statement suggestions tailored to your focus question. Our AI assistant helps kickstart brainstorming sessions and enhances idea generation with contextually relevant suggestions.
            </p>
            <div className="flex items-center justify-center space-x-8 text-sm">
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2" />
                Contextual statement generation
              </div>
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2" />
                Multiple creativity levels
              </div>
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiCheck} className="w-4 h-4 mr-2" />
                Industry-specific suggestions
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-lg overflow-hidden relative ${
                plan.popular ? 'ring-2 ring-primary-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-primary-500 text-white px-4 py-1 text-sm font-medium rounded-b-md">
                  Most Popular
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="text-gray-600">
                    {plan.period}
                  </span>
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
                      <span
                        className={`text-sm ${
                          feature.included ? 'text-gray-900' : 'text-gray-500'
                        } ${feature.highlight ? 'font-semibold' : ''}`}
                      >
                        {feature.name}
                        {feature.highlight && (
                          <SafeIcon icon={FiZap} className="w-4 h-4 inline ml-1 text-purple-600" />
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <Link
                  to={user ? '/dashboard' : '/signup'}
                  className={`block w-full text-center py-3 px-4 rounded-lg font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-primary-600 hover:bg-primary-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Credits Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8 mb-16"
        >
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <SafeIcon icon={FiZap} className="w-6 h-6 text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Credits Add-Ons</h2>
            <p className="text-gray-600">Need more AI power? Purchase additional credits anytime.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Starter Pack', credits: 25, price: '$9.99', popular: false },
              { name: 'Professional Pack', credits: 100, price: '$29.99', popular: true, savings: '25%' },
              { name: 'Enterprise Pack', credits: 500, price: '$99.99', popular: false, savings: '50%' }
            ].map((pack) => (
              <div
                key={pack.name}
                className={`border-2 rounded-lg p-6 text-center ${
                  pack.popular ? 'border-purple-500 bg-purple-50' : 'border-gray-200'
                }`}
              >
                {pack.popular && (
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium mb-4 inline-block">
                    Best Value
                  </div>
                )}
                <h3 className="font-semibold text-gray-900 mb-2">{pack.name}</h3>
                <div className="text-3xl font-bold text-purple-600 mb-2">{pack.credits}</div>
                <div className="text-sm text-gray-600 mb-3">AI Credits</div>
                <div className="text-2xl font-bold text-gray-900 mb-2">{pack.price}</div>
                {pack.savings && (
                  <div className="text-sm text-green-600 font-medium">Save {pack.savings}</div>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                The 14-day free trial includes full access to all features of your chosen plan, with no limitations on projects or participants.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do AI credits work?
              </h3>
              <p className="text-gray-600">
                AI credits are used for generating and enhancing statements. 1 credit typically generates 4-5 statements. Credits never expire and can be purchased as needed.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is the AI feature available on all plans?
              </h3>
              <p className="text-gray-600">
                AI features are included with Professional and Enterprise plans. Starter plan users can purchase AI credits separately.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;