import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../../contexts/LanguageContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiGlobe, FiChevronDown } = FiIcons;

const LanguageSwitcher = ({ className = '', showLabel = true }) => {
  const { currentLanguage, changeLanguage, availableLanguages, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = availableLanguages.find(lang => lang.code === currentLanguage);

  const handleLanguageChange = (langCode) => {
    changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
        aria-label={t('common.language')}
      >
        <SafeIcon icon={FiGlobe} className="w-4 h-4" />
        <span className="text-lg">{currentLang?.flag}</span>
        {showLabel && (
          <>
            <span className="hidden sm:inline">{currentLang?.name}</span>
            <span className="sm:hidden">{currentLang?.code.toUpperCase()}</span>
          </>
        )}
        <SafeIcon icon={FiChevronDown} className="w-3 h-3" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-1 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20"
            >
              <div className="py-1">
                {availableLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                    className={`flex items-center space-x-3 w-full px-4 py-2 text-sm text-left hover:bg-gray-50 transition-colors ${
                      currentLanguage === language.code
                        ? 'bg-primary-50 text-primary-600 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <span>{language.name}</span>
                    {currentLanguage === language.code && (
                      <SafeIcon icon={FiIcons.FiCheck} className="w-4 h-4 ml-auto text-primary-600" />
                    )}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;