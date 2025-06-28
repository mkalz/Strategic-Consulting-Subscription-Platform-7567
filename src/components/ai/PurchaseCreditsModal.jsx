import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiZap, FiCheck, FiCreditCard } = FiIcons;

const PurchaseCreditsModal = ({ isOpen, onClose }) => {
  const { purchaseAICredits, aiCredits } = useAI();
  const [selectedPackage, setSelectedPackage] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [purchaseComplete, setPurchaseComplete] = useState(false);

  const packages = [
    {
      id: 'small',
      name: 'Starter Pack',
      credits: 25,
      price: 9.99,
      description: 'Perfect for small projects',
      popular: false
    },
    {
      id: 'medium',
      name: 'Professional Pack',
      credits: 100,
      price: 29.99,
      description: 'Great for regular use',
      popular: true,
      savings: '25%'
    },
    {
      id: 'large',
      name: 'Enterprise Pack',
      credits: 500,
      price: 99.99,
      description: 'Best value for large teams',
      popular: false,
      savings: '50%'
    }
  ];

  const handlePurchase = async () => {
    setLoading(true);
    
    try {
      await purchaseAICredits(selectedPackage);
      setPurchaseComplete(true);
      
      setTimeout(() => {
        setPurchaseComplete(false);
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Purchase failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading && !purchaseComplete) {
      onClose();
    }
  };

  if (purchaseComplete) {
    return (
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              />
              
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <SafeIcon icon={FiCheck} className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Purchase Successful!
                  </h3>
                  <p className="text-gray-600">
                    Your AI credits have been added to your account.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={handleClose}
            />
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                    <SafeIcon icon={FiZap} className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Purchase AI Credits
                    </h3>
                    <p className="text-sm text-gray-600">
                      Current balance: {aiCredits === -1 ? 'Unlimited' : `${aiCredits} credits`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="mb-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">How AI Credits Work</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• 1 credit = ~4 AI-generated statements</li>
                    <li>• Credits are used for statement generation and enhancement</li>
                    <li>• Unused credits never expire</li>
                    <li>• Get better results with more detailed context</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {packages.map((pkg) => (
                    <motion.div
                      key={pkg.id}
                      whileHover={{ scale: 1.02 }}
                      className={`relative border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                        selectedPackage === pkg.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                          Most Popular
                        </div>
                      )}
                      
                      {pkg.savings && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                          Save {pkg.savings}
                        </div>
                      )}

                      <div className="text-center">
                        <h4 className="font-semibold text-gray-900 mb-2">{pkg.name}</h4>
                        <div className="mb-3">
                          <span className="text-3xl font-bold text-purple-600">{pkg.credits}</span>
                          <span className="text-gray-600 ml-1">credits</span>
                        </div>
                        <div className="mb-3">
                          <span className="text-2xl font-bold text-gray-900">${pkg.price}</span>
                        </div>
                        <p className="text-sm text-gray-600">{pkg.description}</p>
                        
                        <div className="mt-3 text-sm text-gray-500">
                          ${(pkg.price / pkg.credits).toFixed(3)} per credit
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-2">Order Summary</h4>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">
                    {packages.find(p => p.id === selectedPackage)?.name} ({packages.find(p => p.id === selectedPackage)?.credits} credits)
                  </span>
                  <span className="font-semibold">
                    ${packages.find(p => p.id === selectedPackage)?.price}
                  </span>
                </div>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  onClick={handleClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePurchase}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiCreditCard} className="w-4 h-4 mr-2" />
                      Purchase Credits
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PurchaseCreditsModal;