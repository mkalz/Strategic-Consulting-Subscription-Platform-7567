import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiX, FiCreditCard, FiDownload, FiDollarSign } from 'react-icons/fi';

const BillingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      name: 'Starter',
      price: { monthly: 29, yearly: 290 },
      description: 'Perfect for small teams',
      features: [
        { name: 'Up to 5 team members', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'API access', included: false },
        { name: 'Advanced integrations', included: false },
        { name: 'Priority support', included: false }
      ],
      popular: false
    },
    {
      name: 'Professional',
      price: { monthly: 79, yearly: 790 },
      description: 'For growing businesses',
      features: [
        { name: 'Up to 25 team members', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'Priority email support', included: true },
        { name: 'API access', included: true },
        { name: 'Advanced integrations', included: true },
        { name: 'Priority support', included: false }
      ],
      popular: true
    },
    {
      name: 'Enterprise',
      price: { monthly: 199, yearly: 1990 },
      description: 'For large organizations',
      features: [
        { name: 'Unlimited team members', included: true },
        { name: 'Custom analytics', included: true },
        { name: '24/7 phone support', included: true },
        { name: 'Full API access', included: true },
        { name: 'Custom integrations', included: true },
        { name: 'Dedicated support', included: true }
      ],
      popular: false
    }
  ];

  const invoices = [
    { id: 'INV-001', date: '2024-01-15', amount: 79, status: 'paid', plan: 'Professional' },
    { id: 'INV-002', date: '2023-12-15', amount: 79, status: 'paid', plan: 'Professional' },
    { id: 'INV-003', date: '2023-11-15', amount: 29, status: 'paid', plan: 'Starter' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Billing & Subscriptions</h1>
        <p className="text-xl text-gray-600">
          Manage your subscription, view invoices, and update payment methods
        </p>
      </motion.div>

      {/* Current Plan */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-medium text-gray-900">Professional Plan</h3>
            <p className="text-gray-600">$79/month • Next billing date: February 15, 2024</p>
          </div>
          <div className="flex space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Change Plan
            </button>
            <button className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
              Cancel Subscription
            </button>
          </div>
        </div>
      </motion.div>

      {/* Billing Cycle Toggle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-gray-100 rounded-lg p-1 flex">
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'monthly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('yearly')}
            className={`px-4 py-2 rounded-md font-medium transition-colors ${
              billingCycle === 'yearly'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Yearly
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              Save 20%
            </span>
          </button>
        </div>
      </motion.div>

      {/* Pricing Plans */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {plans.map((plan, index) => (
          <div
            key={plan.name}
            className={`bg-white rounded-lg border-2 p-6 relative ${
              plan.popular ? 'border-blue-500' : 'border-gray-200'
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-gray-900">
                ${plan.price[billingCycle]}
                <span className="text-sm font-normal text-gray-600">
                  /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                </span>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex items-center">
                  {feature.included ? (
                    <FiCheck className="w-5 h-5 text-green-500 mr-3" />
                  ) : (
                    <FiX className="w-5 h-5 text-gray-300 mr-3" />
                  )}
                  <span className={feature.included ? 'text-gray-900' : 'text-gray-400'}>
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>

            <button
              className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                plan.popular
                  ? 'bg-blue-600 hover:bg-blue-700 text-white'
                  : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {plan.popular ? 'Upgrade to Pro' : 'Choose Plan'}
            </button>
          </div>
        ))}
      </motion.div>

      {/* Payment Method */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center mr-3">
              <FiCreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium">•••• •••• •••• 4242</p>
              <p className="text-sm text-gray-600">Expires 12/25</p>
            </div>
          </div>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Update Card
          </button>
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg border border-gray-200 p-6"
      >
        <h2 className="text-2xl font-semibold mb-4">Billing History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2">Invoice</th>
                <th className="text-left py-2">Date</th>
                <th className="text-left py-2">Plan</th>
                <th className="text-left py-2">Amount</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100">
                  <td className="py-3 font-mono text-sm">{invoice.id}</td>
                  <td className="py-3">{invoice.date}</td>
                  <td className="py-3">{invoice.plan}</td>
                  <td className="py-3">${invoice.amount}</td>
                  <td className="py-3">
                    <span className="inline-flex px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm">
                      <FiDownload className="w-4 h-4 inline mr-1" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default BillingPage;