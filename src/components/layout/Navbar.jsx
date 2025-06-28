import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiShield } = FiIcons;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const navigation = [
    { name: t('nav.home'), href: '/', current: location.pathname === '/' },
    { name: t('nav.pricing'), href: '/pricing', current: location.pathname === '/pricing' }
  ];

  const userNavigation = user ? [
    { name: t('nav.dashboard'), href: '/dashboard' },
    { name: t('nav.teams'), href: '/teams' },
    { name: t('nav.reports'), href: '/reports' }
  ] : [];

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GCM</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-bold text-xl text-gray-900">StrategyMap</span>
                <p className="text-xs text-gray-500 -mt-1">Strategic Consulting Platform</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  item.current
                    ? 'text-primary-600 border-b-2 border-primary-600'
                    : 'text-gray-700 hover:text-primary-600'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* User Navigation */}
            {user && userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {user.name}
                  </span>
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
                  >
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-3" />
                      {t('nav.settings')}
                    </Link>
                    
                    {isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <SafeIcon icon={FiShield} className="w-4 h-4 mr-3" />
                        {t('nav.adminPanel')}
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        handleLogout();
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4 mr-3" />
                      {t('nav.signOut')}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium transition-colors"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-50"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-4 py-2 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {user && userNavigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}

            {!user && (
              <div className="pt-4 pb-2 border-t border-gray-200">
                <Link
                  to="/login"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 text-base font-medium bg-primary-600 text-white rounded-md mt-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;