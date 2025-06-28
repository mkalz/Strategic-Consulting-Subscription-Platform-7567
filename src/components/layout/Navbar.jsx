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
    <nav className="bg-gradient-to-r from-orange-400 via-red-400 to-pink-400 shadow-lg fixed w-full z-50 top-0 border-b-4 border-yellow-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              {/* Mr. Rossi inspired logo */}
              <div className="relative">
                <div className="w-10 h-10 bg-yellow-400 rounded-full border-3 border-orange-600 flex items-center justify-center shadow-lg transform rotate-12">
                  <span className="text-orange-800 font-bold text-lg transform -rotate-12">G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full border border-red-600"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-white drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  giacomo.app
                </span>
                <span className="text-xs text-yellow-200 -mt-1 italic">Strategic Mapping Adventures</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === link.path
                    ? 'bg-yellow-300 text-orange-800 shadow-lg border-2 border-orange-500'
                    : 'text-white hover:bg-white hover:bg-opacity-20 hover:text-yellow-200'
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
                  className="flex items-center space-x-2 bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 border-2 border-white border-opacity-30"
                >
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-orange-600">
                    <span className="text-orange-800 font-bold text-xs">{user.name?.charAt(0)}</span>
                  </div>
                  <span className="text-sm">{user.name}</span>
                  {isAdmin && (
                    <SafeIcon icon={FiShield} className="w-4 h-4 text-yellow-300" />
                  )}
                </button>

                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl py-2 z-50 border-4 border-yellow-300"
                    style={{ background: 'linear-gradient(135deg, #fff9c4 0%, #fff 50%, #fef3c7 100%)' }}
                  >
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 text-sm text-orange-800 hover:bg-yellow-100 transition-colors rounded-xl mx-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiSettings} className="w-4 h-4 mr-3" />
                      {t('nav.dashboard')}
                    </Link>
                    <Link
                      to="/teams"
                      className="flex items-center px-4 py-3 text-sm text-orange-800 hover:bg-yellow-100 transition-colors rounded-xl mx-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiUsers} className="w-4 h-4 mr-3" />
                      {t('nav.teams')}
                    </Link>
                    <Link
                      to="/reports"
                      className="flex items-center px-4 py-3 text-sm text-orange-800 hover:bg-yellow-100 transition-colors rounded-xl mx-2"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <SafeIcon icon={FiFileText} className="w-4 h-4 mr-3" />
                      {t('nav.reports')}
                    </Link>

                    {isAdmin && (
                      <>
                        <div className="border-t border-yellow-300 my-2 mx-4"></div>
                        <Link
                          to="/admin"
                          className="flex items-center px-4 py-3 text-sm text-red-700 hover:bg-red-50 transition-colors rounded-xl mx-2"
                          onClick={() => setIsProfileOpen(false)}
                        >
                          <SafeIcon icon={FiShield} className="w-4 h-4 mr-3" />
                          {t('nav.adminPanel')}
                        </Link>
                      </>
                    )}

                    <div className="border-t border-yellow-300 my-2 mx-4"></div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 text-sm text-orange-800 hover:bg-yellow-100 transition-colors rounded-xl mx-2"
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
                  className="text-white hover:text-yellow-200 px-4 py-2 rounded-full text-sm font-medium transition-colors"
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="bg-yellow-400 hover:bg-yellow-300 text-orange-800 px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 transform hover:scale-105 shadow-lg border-2 border-orange-500"
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
              className="text-white hover:text-yellow-200 focus:outline-none bg-white bg-opacity-20 p-2 rounded-full"
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
          className="md:hidden bg-gradient-to-b from-red-400 to-pink-500 border-t-4 border-yellow-300"
        >
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-yellow-300 text-orange-800 shadow-lg'
                    : 'text-white hover:bg-white hover:bg-opacity-20'
                }`}
                onClick={handleMobileMenuClose}
              >
                <SafeIcon icon={link.icon} className="w-5 h-5" />
                <span>{link.label}</span>
              </Link>
            ))}

            {user ? (
              <div className="border-t border-yellow-300 pt-4 mt-4">
                <div className="flex items-center px-4 py-3 bg-white bg-opacity-20 rounded-xl mb-2">
                  <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-orange-600 mr-3">
                    <span className="text-orange-800 font-bold text-sm">{user.name?.charAt(0)}</span>
                  </div>
                  <div>
                    <span className="text-base font-medium text-white">{user.name}</span>
                    {isAdmin && (
                      <div className="flex items-center">
                        <SafeIcon icon={FiShield} className="w-4 h-4 mr-1 text-yellow-300" />
                        <span className="text-xs text-yellow-200">Admin</span>
                      </div>
                    )}
                  </div>
                </div>

                {isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center px-4 py-3 text-base font-medium text-red-200 hover:text-white hover:bg-red-600 hover:bg-opacity-20 rounded-xl"
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
                  className="flex items-center w-full px-4 py-3 text-base font-medium text-white hover:bg-white hover:bg-opacity-20 rounded-xl"
                >
                  <SafeIcon icon={FiLogOut} className="w-5 h-5 mr-3" />
                  {t('nav.signOut')}
                </button>
              </div>
            ) : (
              <div className="border-t border-yellow-300 pt-4 space-y-1">
                <Link
                  to="/login"
                  className="block px-4 py-3 rounded-xl text-base font-medium text-white hover:bg-white hover:bg-opacity-20"
                  onClick={handleMobileMenuClose}
                >
                  {t('nav.signIn')}
                </Link>
                <Link
                  to="/signup"
                  className="block px-4 py-3 rounded-xl text-base font-medium bg-yellow-400 text-orange-800 hover:bg-yellow-300 shadow-lg"
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