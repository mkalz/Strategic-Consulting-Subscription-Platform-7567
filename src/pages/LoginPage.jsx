import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiLock, FiEye, FiEyeOff, FiSmile, FiHeart } = FiIcons;

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid email or password. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 50%, #fecaca 100%)' }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-yellow-300 rounded-full opacity-20"
            initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
              scale: [1, 1.5, 1],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 15 + Math.random() * 10,
              repeat: Infinity,
              ease: 'linear'
            }}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="relative"
          >
            <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full border-6 border-white shadow-2xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>G</span>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full border-3 border-white"></div>
          </motion.div>
        </div>

        <h2 className="text-center text-4xl font-bold text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Welcome Back, Friend!
        </h2>
        <p className="text-center text-lg text-orange-600 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
          Continue your strategic adventure
        </p>
        <p className="text-center text-sm text-orange-500">
          Or{' '}
          <Link to="/signup" className="font-medium text-red-600 hover:text-red-500 underline">
            start a new journey here
          </Link>
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div 
          className="bg-white py-8 px-4 shadow-2xl rounded-3xl sm:px-10 border-4 border-yellow-300"
          style={{ background: 'linear-gradient(135deg, #fff9c4 0%, #fff 50%, #fef3c7 100%)' }}
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-red-100 border-2 border-red-300 text-red-700 px-4 py-3 rounded-2xl"
              >
                <div className="flex items-center">
                  <SafeIcon icon={FiHeart} className="w-5 h-5 mr-2" />
                  <span className="text-sm" style={{ fontFamily: 'Comic Sans MS, cursive' }}>{error}</span>
                </div>
              </motion.div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Your Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiMail} className="h-5 w-5 text-orange-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border-2 border-orange-300 rounded-2xl leading-5 bg-white placeholder-orange-400 focus:outline-none focus:placeholder-orange-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  placeholder="your.email@example.com"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-orange-800 mb-2" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                Your Secret Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <SafeIcon icon={FiLock} className="h-5 w-5 text-orange-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-10 py-3 border-2 border-orange-300 rounded-2xl leading-5 bg-white placeholder-orange-400 focus:outline-none focus:placeholder-orange-300 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 transition-all duration-300"
                  placeholder="Enter your password"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-orange-400 hover:text-orange-600 focus:outline-none transition-colors"
                  >
                    <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-orange-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-orange-700" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  Remember my happiness
                </label>
              </div>

              <div className="text-sm">
                <Link 
                  to="/forgot-password" 
                  className="font-medium text-red-600 hover:text-red-500 underline"
                  style={{ fontFamily: 'Comic Sans MS, cursive' }}
                >
                  Forgot your way?
                </Link>
              </div>
            </div>

            <div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative w-full flex justify-center py-3 px-4 border-4 border-orange-500 text-lg font-bold rounded-2xl text-white bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-xl transform hover:rotate-1"
                style={{ fontFamily: 'Comic Sans MS, cursive' }}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Entering the magic...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSmile} className="w-5 h-5 mr-2" />
                    Continue Adventure
                  </>
                )}
              </motion.button>
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-orange-600" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              "Every login is a new beginning to find strategic happiness!"
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;