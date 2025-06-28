import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiMapPin, FiHeart, FiStar, FiSmile } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-orange-800 via-red-800 to-pink-800 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-yellow-400 rounded-full border-4 border-orange-300 flex items-center justify-center shadow-lg">
                  <span className="text-orange-800 font-bold text-xl" style={{ fontFamily: 'Comic Sans MS, cursive' }}>G</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-2xl drop-shadow-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
                  giacomo.app
                </span>
                <span className="text-sm text-yellow-200 italic">Where strategy meets happiness</span>
              </div>
            </div>
            
            <p className="text-yellow-100 mb-6 max-w-md leading-relaxed" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Inspired by the timeless charm of Mr. Rossi's quest for happiness, giacomo.app transforms strategic 
              planning into a delightful collaborative journey. Because work should bring joy, not just results.
            </p>
            
            <div className="flex items-center space-x-6">
              <div className="flex items-center text-yellow-200">
                <SafeIcon icon={FiMail} className="w-5 h-5 mr-2" />
                <span className="text-sm">hello@giacomo.app</span>
              </div>
              <div className="flex items-center text-yellow-200">
                <SafeIcon icon={FiHeart} className="w-5 h-5 mr-2 text-red-300" />
                <span className="text-sm">Made with love in Italy</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Adventures
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/pricing" className="text-yellow-100 hover:text-white transition-colors flex items-center">
                  <SafeIcon icon={FiStar} className="w-4 h-4 mr-2" />
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <Link to="/features" className="text-yellow-100 hover:text-white transition-colors flex items-center">
                  <SafeIcon icon={FiSmile} className="w-4 h-4 mr-2" />
                  Happy Features
                </Link>
              </li>
              <li>
                <Link to="/integrations" className="text-yellow-100 hover:text-white transition-colors">
                  Integrations
                </Link>
              </li>
              <li>
                <Link to="/security" className="text-yellow-100 hover:text-white transition-colors">
                  Security & Trust
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-yellow-300" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
              Guidance
            </h3>
            <ul className="space-y-3">
              <li>
                <Link to="/docs" className="text-yellow-100 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-yellow-100 hover:text-white transition-colors">
                  Happy Guides
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-yellow-100 hover:text-white transition-colors">
                  Friendly Support
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-yellow-100 hover:text-white transition-colors">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-yellow-400 border-opacity-30 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-yellow-200 text-sm mb-4 md:mb-0" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            © 2024 giacomo.app. Made with ❤️ and a sprinkle of Italian magic. All rights reserved.
          </p>
          
          <div className="flex space-x-6">
            <Link 
              to="/privacy" 
              className="text-yellow-200 hover:text-white text-sm transition-colors"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms" 
              className="text-yellow-200 hover:text-white text-sm transition-colors"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Terms of Service
            </Link>
            <Link 
              to="/cookies" 
              className="text-yellow-200 hover:text-white text-sm transition-colors"
              style={{ fontFamily: 'Comic Sans MS, cursive' }}
            >
              Cookie Policy
            </Link>
          </div>
        </div>

        {/* Inspirational quote */}
        <div className="mt-8 text-center">
          <blockquote className="text-yellow-100 italic text-lg" style={{ fontFamily: 'Comic Sans MS, cursive' }}>
            "Happiness is not a destination, it's a way of strategic thinking"
          </blockquote>
          <cite className="text-yellow-300 text-sm block mt-2">- Inspired by Mr. Rossi's wisdom</cite>
        </div>
      </div>
    </footer>
  );
};

export default Footer;