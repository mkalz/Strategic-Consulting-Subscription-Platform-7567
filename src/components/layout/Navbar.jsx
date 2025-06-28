import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiUsers, FiFileText, FiShield } = FiIcons;

const Navbar = () => {
  const { user, logout } = useAuth();
  const { isAdmin } = useAdmin();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsProfileOpen(false);
  };

  // Close mobile menu when clicking a link
  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('nav.home') },
    { path: '/pricing', label: t('nav.pricing') },
    ...(user ? [
      { path: '/dashboard', label: t('nav.dashboard') },
      { path: '/teams', label: t('nav.teams') },
      { path: '/reports', label: t('nav.reports') }
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">GCM</span>
              </div>
              <span className="font-bold text-xl text-gray-800">StrategyMap</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher */}
            <LanguageSwitcher />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 focus:outline-none"
                >
                  <SafeIcon icon={FiUser} className="w-5 h-5" />
                  <span className="text-sm font-medium">{user.name}</span>
                  {isAdmin && (
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-red-500" />
                  )}
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      to="/teams"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
                      {t('nav.teams')}
                    </Link>
                    <Link
                      to="/reports"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                      {t('nav.reports')}
                    </Link>
                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-200 my-1"></div>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <SafeIcon icon={FiShield} className="w-4 h-4 mr-2" />
                          {t('nav.adminPanel')}
                        </Link>
                      </>
                    )}
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <SafeIcon icon={FiLogOut} className="w-4 h-4 mr-2" />
                      {t('nav.signOut')}
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {t('nav.getStarted')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageSwitcher showLabel={false} />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden bg-white border-t"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={handleMobileMenuClose}
              >
                {link.label}
              </Link>
            ))}

            {user ? (
              <div className="border-t pt-4">
                <div className="flex items-center px-3 py-2">
                  <SafeIcon icon={FiUser} className="w-5 h-5 mr-2 text-gray-400" />
                  <span className="text-base font-medium text-gray-700">{user.name}</span>
                  {isAdmin && (
                    <SafeIcon icon={FiShield} className="w-4 h-4 ml-2 text-red-500" />
                  )}
                </div>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-3 py-2 text-base font-medium text-red-700 hover:text-red-600 hover:bg-red-50"
                    onClick={handleMobileMenuClose}
                  >
                    <SafeIcon icon={FiShield} className="w-5 h-5 mr-2" />
                    {t('nav.adminPanel')}
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    handleMobileMenuClose();
                  }}
                  className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                >
                  <SafeIcon icon={FiLogOut} className="w-5 h-5 mr-2" />
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="border-t pt-4 space-y-1">
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
                  onClick={handleMobileMenuClose}
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                  onClick={handleMobileMenuClose}
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