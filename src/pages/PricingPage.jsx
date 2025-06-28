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
      price: '$29',
      period: '/month',
      description: 'Perfect for small teams and individual consultants',
      features: [
        { name: 'Up to 3 projects', included: true },
        { name: 'Up to 25 participants', included: true },
        { name: 'Basic concept mapping', included: true },
        { name: 'Standard reporting', included: true },
        { name: 'Email support', included: true },
        { name: 'Data export (CSV)', included: true },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom branding', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Get Started',
      popular: false
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'For growing consulting practices and larger teams',
      features: [
        { name: 'Up to 10 projects', included: true },
        { name: 'Up to 100 participants', included: true },
        { name: 'Advanced concept mapping', included: true },
        { name: 'Advanced analytics & reporting', included: true },
        { name: 'Priority support', included: true },
        { name: 'All export formats', included: true },
        { name: 'Custom branding', included: true },
        { name: 'Team collaboration', included: true },
        { name: 'API access', included: false },
        { name: 'White-label options', included: false }
      ],
      cta: 'Start Free Trial',
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'For large organizations with specific requirements',
      features: [
        { name: 'Unlimited projects', included: true },
        { name: 'Unlimited participants', included: true },
        { name: 'Full platform access', included: true },
        { name: 'Custom analytics dashboards', included: true },
        { name: 'Dedicated success manager', included: true },
        { name: 'All export formats', included: true },
        { name: 'Full white-label', included: true },
        { name: 'API access', included: true },
        { name: 'On-premise deployment', included: true },
        { name: 'Custom integrations', included: true }
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
            Start with a 14-day free trial. No credit card required.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-lg shadow-sm overflow-hidden relative ${
                plan.popular ? 'border-2 border-primary-500 transform scale-105' : 'border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
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
            Frequently Asked Questions
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What's included in the free trial?
              </h3>
              <p className="text-gray-600">
                The 14-day free trial includes full access to all Professional plan features 
                with no limitations or restrictions.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I change plans later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade or downgrade your plan at any time. 
                Changes take effect immediately.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How does billing work?
              </h3>
              <p className="text-gray-600">
                All plans are billed monthly or annually. You can cancel anytime 
                with no long-term commitments.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer custom solutions?
              </h3>
              <p className="text-gray-600">
                Yes, our Enterprise plan includes custom features, integrations, 
                and dedicated support for large organizations.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;