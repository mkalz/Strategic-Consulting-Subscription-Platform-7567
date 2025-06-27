import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiUsers, FiTarget, FiBarChart3, FiLayers, FiZap, FiShield } = FiIcons;

const HomePage = () => {
  const features = [
    {
      icon: FiUsers,
      title: 'Collaborative Brainstorming',
      description: 'Engage stakeholders in structured idea generation sessions with real-time collaboration.'
    },
    {
      icon: FiLayers,
      title: 'Concept Structuring',
      description: 'Organize and categorize ideas using advanced clustering algorithms and visualization.'
    },
    {
      icon: FiTarget,
      title: 'Priority Rating',
      description: 'Enable participants to rate concepts on importance and feasibility for strategic decision-making.'
    },
    {
      icon: FiBarChart3,
      title: 'Advanced Analytics',
      description: 'Generate comprehensive reports with statistical analysis and actionable insights.'
    },
    {
      icon: FiZap,
      title: 'Real-time Updates',
      description: 'See changes instantly as participants contribute ideas and provide ratings.'
    },
    {
      icon: FiShield,
      title: 'Enterprise Security',
      description: 'Bank-level security with encrypted data transmission and secure cloud storage.'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Define Focus Question',
      description: 'Start by clearly defining the strategic question or challenge you want to address.'
    },
    {
      number: '02',
      title: 'Brainstorm Ideas',
      description: 'Invite stakeholders to contribute ideas and statements related to your focus question.'
    },
    {
      number: '03',
      title: 'Structure Concepts',
      description: 'Use our clustering tools to organize similar ideas into meaningful groups.'
    },
    {
      number: '04',
      title: 'Rate & Prioritize',
      description: 'Have participants rate concepts on importance and feasibility scales.'
    },
    {
      number: '05',
      title: 'Analyze Results',
      description: 'Generate comprehensive reports with visual maps and statistical insights.'
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
              Strategic Consulting
              <span className="text-primary-600 block">Made Visual</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Transform your strategic planning process with Group Concept Mapping. 
              Engage stakeholders, visualize complex ideas, and make data-driven decisions 
              with our professional consulting platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors flex items-center justify-center"
              >
                Start Free Trial
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="border border-primary-600 text-primary-600 hover:bg-primary-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
              >
                View Pricing
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
              Powerful Features for Strategic Consulting
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to conduct professional Group Concept Mapping sessions 
              and generate actionable strategic insights.
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
              The GCM Process
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven 5-step methodology to transform complex strategic 
              challenges into clear, actionable insights.
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
              Ready to Transform Your Strategic Planning?
            </h2>
            <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
              Join leading consultants and organizations who use StrategyMap to 
              facilitate better strategic decisions.
            </p>
            <Link
              to="/signup"
              className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-4 rounded-lg text-lg font-semibold transition-colors inline-flex items-center"
            >
              Start Your Free Trial
              <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;