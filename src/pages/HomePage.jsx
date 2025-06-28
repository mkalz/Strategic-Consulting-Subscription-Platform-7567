import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowRight, FiUsers, FiTarget, FiBarChart3, FiLayers, FiZap, FiShield, FiSmile, FiHeart, FiSun } = FiIcons;

const HomePage = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: FiUsers,
      title: 'Collaborative Adventures',
      description: 'Embark on strategic journeys with your team, just like Mr. Rossi exploring new horizons.',
      color: 'bg-blue-100 border-blue-300 text-blue-800'
    },
    {
      icon: FiLayers,
      title: 'Whimsical Organization',
      description: 'Structure ideas with the playful charm of Italian animation and thoughtful design.',
      color: 'bg-green-100 border-green-300 text-green-800'
    },
    {
      icon: FiTarget,
      title: 'Happiness Mapping',
      description: 'Rate concepts on joy and feasibility - because work should bring happiness too.',
      color: 'bg-purple-100 border-purple-300 text-purple-800'
    },
    {
      icon: FiBarChart3,
      title: 'Insightful Analytics',
      description: 'Discover patterns and insights with the wonder of Mr. Rossi finding new perspectives.',
      color: 'bg-orange-100 border-orange-300 text-orange-800'
    },
    {
      icon: FiZap,
      title: 'Real-time Magic',
      description: 'Experience the magic of instant collaboration, like scenes coming to life.',
      color: 'bg-yellow-100 border-yellow-300 text-yellow-800'
    },
    {
      icon: FiShield,
      title: 'Secure & Trustworthy',
      description: 'Your data is protected with the reliability of classic Italian craftsmanship.',
      color: 'bg-red-100 border-red-300 text-red-800'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Dream & Brainstorm',
      description: 'Like Mr. Rossi beginning his quest, start by dreaming big and gathering wonderful ideas.',
      icon: FiSmile,
      color: 'from-yellow-400 to-orange-400'
    },
    {
      number: '02',
      title: 'Organize & Structure',
      description: 'Arrange your thoughts with care, creating beautiful patterns from scattered dreams.',
      icon: FiHeart,
      color: 'from-pink-400 to-red-400'
    },
    {
      number: '03',
      title: 'Evaluate & Prioritize',
      description: 'Weigh each idea thoughtfully, finding those that bring the most joy and possibility.',
      icon: FiTarget,
      color: 'from-blue-400 to-purple-400'
    },
    {
      number: '04',
      title: 'Discover & Act',
      description: 'Uncover insights that lead to happiness, just like Mr. Rossi finding his path.',
      icon: FiSun,
      color: 'from-green-400 to-blue-400'
    }
  ];

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)' }}>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
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
                duration: 10 + Math.random() * 20,
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
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8 flex justify-center">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="relative"
              >
                <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-8 border-white shadow-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold text-white" style={{ fontFamily: 'Comic Sans MS, cursive' }}>G</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-400 rounded-full border-4 border-white"></div>
                <div className="absolute -bottom-1 -left-1 w-6 h-6 bg-blue-400 rounded-full border-2 border-white"></div>
              </motion.div>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-orange-800 mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Find Your Strategic
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                Happiness
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-orange-700 mb-8 max-w-4xl mx-auto leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Join Mr. Giacomo on a delightful journey of strategic discovery! Transform complex business challenges 
              into joyful collaborative adventures with our whimsical concept mapping platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 shadow-2xl border-4 border-white flex items-center justify-center transform hover:rotate-1"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Begin Your Adventure
                  <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/pricing"
                  className="border-4 border-orange-500 text-orange-700 hover:bg-orange-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 bg-white shadow-xl transform hover:-rotate-1"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Explore Pricing
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Magical Features for Happy Teams
            </h2>
            <p className="text-xl text-orange-600 max-w-3xl mx-auto" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Every feature designed with the charm and wonder that made Mr. Rossi's adventures so special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                whileHover={{ scale: 1.05, rotate: Math.random() > 0.5 ? 2 : -2 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`${feature.color} rounded-3xl p-6 hover:shadow-2xl transition-all duration-300 border-4 transform`}
              >
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-lg border-4 border-current">
                  <SafeIcon icon={feature.icon} className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-center" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {feature.title}
                </h3>
                <p className="text-center leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gradient-to-r from-pink-200 via-red-200 to-yellow-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-orange-800 mb-4" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              The Journey to Strategic Happiness
            </h2>
            <p className="text-xl text-orange-700 max-w-3xl mx-auto" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Follow in Mr. Rossi's footsteps with our delightful 4-step process
            </p>
          </motion.div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col md:flex-row items-center gap-8 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 bg-white rounded-3xl p-8 shadow-2xl border-4 border-orange-300 transform hover:rotate-1 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${step.color} rounded-full flex items-center justify-center text-white font-bold text-2xl mr-4 border-4 border-white shadow-lg`}>
                      {step.number}
                    </div>
                    <h3 className="text-2xl font-bold text-orange-800" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-orange-700 text-lg leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                    {step.description}
                  </p>
                </div>
                
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1], 
                    rotate: [0, 10, -10, 0] 
                  }}
                  transition={{ 
                    duration: 4, 
                    repeat: Infinity,
                    delay: index * 0.5 
                  }}
                  className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-2xl border-8 border-yellow-400"
                >
                  <SafeIcon icon={step.icon} className="w-12 h-12 text-orange-600" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 relative overflow-hidden">
        {/* Animated elements */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-8 bg-yellow-300 rounded-full opacity-30"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                scale: 0 
              }}
              animate={{
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                scale: [0, 1, 0],
                rotate: [0, 360]
              }}
              transition={{
                duration: 8 + Math.random() * 10,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Ready to Find Your Strategic Happiness?
            </h2>
            <p className="text-xl text-yellow-100 mb-8 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Join thousands of happy teams who've discovered the joy of strategic planning with giacomo.app. 
              Your adventure awaits!
            </p>
            
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/signup"
                className="bg-white text-red-600 hover:bg-yellow-100 px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 inline-flex items-center shadow-2xl border-4 border-yellow-300 transform hover:-rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                Start Your Happy Journey
                <SafeIcon icon={FiArrowRight} className="ml-2 w-5 h-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;