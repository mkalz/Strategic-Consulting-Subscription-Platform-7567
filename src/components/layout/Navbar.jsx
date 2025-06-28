import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../contexts/AuthContext';
import { useAdmin } from '../../contexts/AdminContext';
import { useLanguage } from '../../contexts/LanguageContext';
import LanguageSwitcher from '../common/LanguageSwitcher';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMenu, FiX, FiUser, FiLogOut, FiSettings, FiUsers, FiFileText, FiShield, FiHome, FiStar } = FiIcons;

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

  const handleMobileMenuClose = () => {
    setIsMenuOpen(false);
  };

  const navLinks = [
    { path: '/', label: t('nav.home'), icon: FiHome },
    { path: '/pricing', label: t('nav.pricing'), icon: FiStar },
    ...(user ? [
      { path: '/dashboard', label: t('nav.dashboard'), icon: FiSettings },
      { path: '/teams', label: t('nav.teams'), icon: FiUsers },
      { path: '/reports', label: t('nav.reports'), icon: FiFileText }
    ] : [])
  ];

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">GCM</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-900">StrategyMap</span>
                <span className="text-xs text-gray-500 -mt-1">Strategic Consulting Platform</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
              >
                <SafeIcon icon={link.icon} className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            ))}

            <LanguageSwitcher />

            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">{user.name?.charAt(0)}</span>
                  </div>
                  <span>{user.name}</span>
                  {isAdmin && (
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-primary-600" />
                  )}
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-3" />
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      to="/teams"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiUsers} className="w-4 h-4 mr-3" />
                      {t('nav.teams')}
                    </Link>
                    <Link
                      to="/reports"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiFileText} className="w-4 h-4 mr-3" />
                      {t('nav.reports')}
                    </Link>

                    {isAdmin && (
                      <>
                        <div className="border-t border-gray-100 my-1"></div>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <SafeIcon icon={FiShield} className="w-4 h-4 mr-3" />
                          {t('nav.adminPanel')}
                        </Link>
                      </>
                    )}

                    <div className="border-t border-gray-100 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                  className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
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
          className="md:hidden bg-white border-t border-gray-200"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-3 py-2 rounded-md text-base font-medium ${
                  location.pathname === link.path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={handleMobileMenuClose}
              >
                <SafeIcon icon={link.icon} className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="flex items-center px-3 py-2 text-base font-medium text-gray-700">
                  <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white font-medium text-sm">{user.name?.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="block">{user.name}</span>
                    {isAdmin && (
                      <span className="text-xs text-primary-600">Admin</span>
                    )}
                  </div>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-3 py-2 text-base font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleMobileMenuClose}
                  >
                    <SafeIcon icon={FiShield} className="w-5 h-5 mr-3" />
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
                  <SafeIcon icon={FiLogOut} className="w-5 h-5 mr-3" />
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="border-t border-gray-200 pt-4 space-y-1">
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