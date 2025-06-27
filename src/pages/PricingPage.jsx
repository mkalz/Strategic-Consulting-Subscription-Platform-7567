import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX } = FiIcons;

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
        { name: 'Advanced analytics', included: true },
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
        { name: 'Advanced analytics', included: true },
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
            Select the perfect plan for your strategic consulting needs. 
            All plans include a 14-day free trial with full access to features.
          </p>
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
                      <span className={`text-sm ${
                        feature.included ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {feature.name}
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
                The 14-day free trial includes full access to all features of your chosen plan, 
                with no limitations on projects or participants.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. Changes take effect 
                at the start of your next billing cycle.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for Enterprise plans. 
                All payments are processed securely.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is there a setup fee?
              </h3>
              <p className="text-gray-600">
                No setup fees for Starter and Professional plans. Enterprise plans may include 
                custom onboarding services based on your needs.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;