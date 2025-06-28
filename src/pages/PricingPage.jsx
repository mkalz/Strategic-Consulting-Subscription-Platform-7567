import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiCheck, FiX, FiZap, FiHeart, FiStar, FiSmile, FiSun, FiGift } = FiIcons;

const PricingPage = () => {
  const { user } = useAuth();

  const plans = [
    {
      name: 'Happy Starter',
      price: '€39',
      period: '/month',
      description: 'Perfect for small teams beginning their strategic adventure!',
      features: [
        { name: 'Up to 3 joyful projects', included: true },
        { name: 'Up to 25 happy participants', included: true },
        { name: 'Basic concept mapping magic', included: true },
        { name: 'Cheerful reporting', included: true },
        { name: 'Friendly email support', included: true },
        { name: 'Data export (CSV)', included: true },
        { name: 'AI Happiness Assistant', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'Custom Italian branding', included: false },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false }
      ],
      cta: 'Begin Your Journey',
      popular: false,
      color: 'from-yellow-400 to-orange-400',
      border: 'border-yellow-400',
      icon: FiSun
    },
    {
      name: 'Professional Explorer',
      price: '€99',
      period: '/month',
      description: 'For teams ready to discover strategic happiness together!',
      features: [
        { name: 'Up to 10 delightful projects', included: true },
        { name: 'Up to 100 enthusiastic participants', included: true },
        { name: 'Advanced mapping adventures', included: true },
        { name: 'Insightful analytics & reporting', included: true },
        { name: 'Priority support with a smile', included: true },
        { name: 'All export formats (CSV, PDF, PowerPoint)', included: true },
        { name: 'AI Happiness Assistant', included: true, highlight: true },
        { name: '50 magical AI credits per month', included: true, highlight: true },
        { name: 'Custom Italian branding', included: true },
        { name: 'API access', included: false },
        { name: 'Dedicated happiness manager', included: true }
      ],
      cta: 'Start Exploring',
      popular: true,
      color: 'from-red-400 to-pink-400',
      border: 'border-red-400',
      icon: FiHeart
    },
    {
      name: 'Enterprise Happiness',
      price: 'Custom',
      period: '',
      description: 'For organizations seeking unlimited strategic joy!',
      features: [
        { name: 'Unlimited joyful projects', included: true },
        { name: 'Unlimited happy participants', included: true },
        { name: 'Complete mapping universe', included: true },
        { name: 'Custom happiness dashboards', included: true },
        { name: 'Dedicated Italian success manager', included: true },
        { name: 'All formats + custom exports', included: true },
        { name: 'AI Happiness Assistant', included: true, highlight: true },
        { name: 'Unlimited magical AI credits', included: true, highlight: true },
        { name: 'Full Italian custom branding', included: true },
        { name: 'Complete API access', included: true },
        { name: 'White-glove onboarding', included: true }
      ],
      cta: 'Contact Our Happiness Team',
      popular: false,
      color: 'from-blue-400 to-purple-400',
      border: 'border-blue-400',
      icon: FiStar
    }
  ];

  return (
    <div 
      className="min-h-screen py-12 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 25%, #fecaca 50%, #ede9fe 75%, #ddd6fe 100%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 bg-yellow-300 rounded-full opacity-20"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 20 + Math.random() * 15,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="mb-6 flex justify-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-6 border-white shadow-2xl flex items-center justify-center"
            >
              <SafeIcon icon={FiGift} className="w-12 h-12 text-white" />
            </motion.div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold text-orange-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Choose Your Happy Plan
          </h1>
          <p className="text-xl text-orange-600 max-w-3xl mx-auto" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Every plan designed to bring joy to your strategic planning adventure. 
            Start your 14-day free trial and discover the happiness of organized thinking!
          </p>
        </motion.div>

        {/* AI Feature Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 border-4 border-purple-400 rounded-3xl p-8 mb-12 transform hover:rotate-1 transition-all duration-300"
        >
          <div className="text-center">
            <div className="w-20 h-20 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
              <SafeIcon icon={FiZap} className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              NEW: AI Happiness Assistant! ✨
            </h2>
            <p className="text-purple-800 mb-6 max-w-2xl mx-auto text-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Meet your new strategic companion! Our AI assistant generates joyful ideas, suggests happy solutions, 
              and helps transform complex challenges into delightful adventures.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiSmile} className="w-5 h-5 mr-2" />
                <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Joyful idea generation</span>
              </div>
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiHeart} className="w-5 h-5 mr-2" />
                <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Multiple happiness levels</span>
              </div>
              <div className="flex items-center text-purple-700">
                <SafeIcon icon={FiStar} className="w-5 h-5 mr-2" />
                <span style={{ fontFamily: 'Comic Sans MS, cursive' }}>Industry-specific magic</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              whileHover={{ scale: 1.03, rotate: Math.random() > 0.5 ? 1 : -1 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden relative transform transition-all duration-300 border-4 ${plan.border} ${
                plan.popular ? 'scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-bold border-4 border-white shadow-lg">
                    Most Loved! ❤️
                  </div>
                </div>
              )}

              <div className={`bg-gradient-to-r ${plan.color} p-6 text-white relative overflow-hidden`}>
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mr-10 -mt-10"></div>
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-white opacity-10 rounded-full -ml-8 -mb-8"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                      <SafeIcon icon={plan.icon} className="w-8 h-8 text-orange-600" />
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-2 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {plan.name}
                  </h3>
                  <p className="text-center text-sm opacity-90 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {plan.description}
                  </p>
                  
                  <div className="text-center">
                    <span className="text-4xl font-bold" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {plan.price}
                    </span>
                    <span className="text-lg opacity-80">
                      {plan.period}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-3 mb-8">
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
                        } ${feature.highlight ? 'font-bold text-purple-700' : ''}`}
                        style={{ fontFamily: 'Comic Sans MS, cursive' }}
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
                  className={`block w-full text-center py-3 px-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border-3 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-300 hover:to-pink-300 text-white border-red-500'
                      : 'bg-gradient-to-r from-yellow-400 to-orange-400 hover:from-yellow-300 hover:to-orange-300 text-orange-800 border-yellow-500'
                  }`}
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  {plan.cta}
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Credits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-3xl shadow-2xl p-8 mb-16 border-4 border-purple-300 transform hover:-rotate-1 transition-all duration-300"
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-400 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-lg">
              <SafeIcon icon={FiZap} className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Extra Happiness Credits
            </h2>
            <p className="text-purple-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Need more AI magic? Add extra happiness to your strategic adventures!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: 'Joy Pack', credits: 25, price: '€9.99', popular: false },
              { name: 'Happiness Bundle', credits: 100, price: '€24.99', popular: true, savings: '38%' },
              { name: 'Bliss Package', credits: 500, price: '€79.99', popular: false, savings: '68%' }
            ].map((pack, index) => (
              <motion.div
                key={pack.name}
                whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 1 : -1 }}
                className={`border-3 rounded-2xl p-6 text-center transition-all duration-300 ${
                  pack.popular 
                    ? 'border-purple-500 bg-purple-50 transform scale-105' 
                    : 'border-purple-300 bg-purple-25'
                }`}
              >
                {pack.popular && (
                  <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                    Best Value! 🎯
                  </div>
                )}
                
                <h3 className="font-bold text-purple-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {pack.name}
                </h3>
                
                <div className="text-3xl font-bold text-purple-600 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {pack.credits}
                </div>
                <div className="text-sm text-purple-700 mb-3" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Magical AI Credits
                </div>
                
                <div className="text-2xl font-bold text-purple-900 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {pack.price}
                </div>
                
                {pack.savings && (
                  <div className="text-sm text-green-600 font-medium" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    Save {pack.savings}! 🎉
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="bg-white rounded-3xl shadow-2xl p-8 border-4 border-yellow-300"
        >
          <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            Happy Questions & Joyful Answers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                What magical powers do I get in the free trial? ✨
              </h3>
              <p className="text-orange-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                The 14-day free trial includes full access to all features of your chosen plan, with unlimited happiness and no restrictions!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                How does the AI Happiness Assistant work? 🤖
              </h3>
              <p className="text-orange-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                AI credits power joyful idea generation. 1 credit typically creates 4-5 happy statements. Credits never expire and bring endless smiles!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Can I change my happiness level later? 📈
              </h3>
              <p className="text-orange-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Absolutely! You can upgrade or adjust your plan anytime. More happiness is always welcome in our Italian family!
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Is the platform as joyful as it looks? 😊
              </h3>
              <p className="text-orange-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Even more! Our platform brings the same wonder and joy that Mr. Rossi found in his adventures, but for strategic planning!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PricingPage;