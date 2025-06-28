import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiHome,
  FiLayers,
  FiLock,
  FiCreditCard,
  FiBarChart3,
  FiUsers,
  FiSettings,
  FiZap,
  FiShield,
  FiMail
} from 'react-icons/fi';

const Sidebar = () => {
  const location = useLocation();

  const navigation = [
    { name: 'Overview', href: '/', icon: FiHome },
    { name: 'Components', href: '/components', icon: FiLayers },
    { name: 'Authentication', href: '/auth', icon: FiLock },
    { name: 'Billing & Plans', href: '/billing', icon: FiCreditCard },
    { name: 'Analytics', href: '/analytics', icon: FiBarChart3 },
    { name: 'User Management', href: '/users', icon: FiUsers },
    { name: 'Settings', href: '/settings', icon: FiSettings },
  ];

  const features = [
    { name: 'API Integration', icon: FiZap, badge: 'Pro' },
    { name: 'Security', icon: FiShield, badge: 'Enterprise' },
    { name: 'Email Templates', icon: FiMail, badge: 'New' },
  ];

  return (
    <div className="fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 pt-20">
      <div className="flex flex-col h-full">
        {/* Main Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          <div className="space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <item.icon
                    className={`mr-3 h-5 w-5 ${
                      isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
                    }`}
                  />
                  {item.name}
                </Link>
              );
            })}
          </div>

          {/* Features Section */}
          <div className="pt-8">
            <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Features
            </h3>
            <div className="mt-3 space-y-1">
              {features.map((item) => (
                <div
                  key={item.name}
                  className="group flex items-center justify-between px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:text-gray-900 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                    {item.name}
                  </div>
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      item.badge === 'Pro'
                        ? 'bg-purple-100 text-purple-800'
                        : item.badge === 'Enterprise'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-gray-200">
          <div className="bg-gradient-primary rounded-lg p-4 text-white">
            <h4 className="text-sm font-semibold mb-2">Upgrade to Pro</h4>
            <p className="text-xs text-blue-100 mb-3">
              Get access to all premium components and features.
            </p>
            <button className="w-full bg-white text-blue-600 text-sm font-medium py-2 px-3 rounded-md hover:bg-blue-50 transition-colors">
              Upgrade Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;