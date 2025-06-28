import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import PurchaseCreditsModal from './PurchaseCreditsModal';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiPlus, FiRefreshCw, FiSettings, FiInfo, FiCheck, FiX } = FiIcons;

const AIBrainstormingPanel = ({ project, onStatementsGenerated }) => {
  const { aiCredits, loading, generateAIStatements, hasAIAccess } = useAI();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [generationSettings, setGenerationSettings] = useState({
    count: 10,
    creativity: 'balanced',
    context: '',
    includeMetrics: true,
    includeTimelines: false
  });
  const [generatedStatements, setGeneratedStatements] = useState([]);
  const [selectedStatements, setSelectedStatements] = useState(new Set());

  if (!hasAIAccess) {
    return (
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
            <SafeIcon icon={FiZap} className="w-6 h-6 text-purple-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-purple-900 mb-2">
              AI-Powered Brainstorming
            </h3>
            <p className="text-purple-800 mb-4">
              Enhance your brainstorming sessions with AI-generated statements tailored to your focus question.
            </p>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowPurchaseModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Enable AI Module
              </button>
              <button
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleGenerateStatements = async () => {
    try {
      if (aiCredits === 0) {
        setShowPurchaseModal(true);
        return;
      }

      const statements = await generateAIStatements(
        project.focusQuestion,
        generationSettings.context,
        generationSettings.count
      );
      
      setGeneratedStatements(statements);
      setSelectedStatements(new Set());
    } catch (error) {
      console.error('Failed to generate statements:', error);
    }
  };

  const handleSelectStatement = (statementId) => {
    const newSelected = new Set(selectedStatements);
    if (newSelected.has(statementId)) {
      newSelected.delete(statementId);
    } else {
      newSelected.add(statementId);
    }
    setSelectedStatements(newSelected);
  };

  const handleAddSelectedStatements = () => {
    const selected = generatedStatements.filter(s => selectedStatements.has(s.id));
    if (selected.length > 0) {
      onStatementsGenerated(selected);
      setGeneratedStatements([]);
      setSelectedStatements(new Set());
    }
  };

  const creditsRequired = Math.ceil(generationSettings.count / 4);

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        {/* Header */}
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiZap} className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900">
                  AI Brainstorming Assistant
                </h3>
                <p className="text-blue-700 text-sm">
                  {aiCredits === -1 ? 'Unlimited credits' : `${aiCredits} credits remaining`}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <SafeIcon icon={FiSettings} className="w-5 h-5" />
              </button>
              <button
                onClick={handleGenerateStatements}
                disabled={loading || (aiCredits === 0)}
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiZap} className="w-4 h-4 mr-2" />
                    Generate Ideas ({creditsRequired} credits)
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Settings Panel */}
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 pt-6 border-t border-blue-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Number of Statements
                    </label>
                    <select
                      value={generationSettings.count}
                      onChange={(e) => setGenerationSettings(prev => ({ ...prev, count: parseInt(e.target.value) }))}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value={5}>5 statements</option>
                      <option value={10}>10 statements</option>
                      <option value={15}>15 statements</option>
                      <option value={20}>20 statements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Creativity Level
                    </label>
                    <select
                      value={generationSettings.creativity}
                      onChange={(e) => setGenerationSettings(prev => ({ ...prev, creativity: e.target.value }))}
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="conservative">Conservative</option>
                      <option value="balanced">Balanced</option>
                      <option value="creative">Creative</option>
                      <option value="innovative">Highly Innovative</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-blue-900 mb-2">
                      Additional Context
                    </label>
                    <input
                      type="text"
                      value={generationSettings.context}
                      onChange={(e) => setGenerationSettings(prev => ({ ...prev, context: e.target.value }))}
                      placeholder="Industry, company size, specific challenges..."
                      className="w-full px-3 py-2 border border-blue-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={generationSettings.includeMetrics}
                      onChange={(e) => setGenerationSettings(prev => ({ ...prev, includeMetrics: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-blue-800">Include success metrics</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={generationSettings.includeTimelines}
                      onChange={(e) => setGenerationSettings(prev => ({ ...prev, includeTimelines: e.target.checked }))}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-blue-800">Suggest timelines</span>
                  </label>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generated Statements */}
        {generatedStatements.length > 0 && (
          <div className="border-t border-blue-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-blue-900">
                Generated Statements ({generatedStatements.length})
              </h4>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-blue-700">
                  {selectedStatements.size} selected
                </span>
                {selectedStatements.size > 0 && (
                  <button
                    onClick={handleAddSelectedStatements}
                    className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
                  >
                    <SafeIcon icon={FiPlus} className="w-3 h-3 mr-1" />
                    Add Selected
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {generatedStatements.map((statement) => (
                <motion.div
                  key={statement.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedStatements.has(statement.id)
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-white hover:border-blue-300'
                  }`}
                  onClick={() => handleSelectStatement(statement.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-gray-900 mb-2">{statement.text}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                        <span>Confidence: {Math.round(statement.confidence * 100)}%</span>
                        <span>AI Generated</span>
                      </div>
                    </div>
                    <div className="ml-4">
                      {selectedStatements.has(statement.id) ? (
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <SafeIcon icon={FiCheck} className="w-4 h-4 text-white" />
                        </div>
                      ) : (
                        <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <button
                onClick={() => setSelectedStatements(new Set(generatedStatements.map(s => s.id)))}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Select All
              </button>
              <button
                onClick={() => setSelectedStatements(new Set())}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                Clear Selection
              </button>
              <button
                onClick={handleGenerateStatements}
                disabled={loading}
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                <SafeIcon icon={FiRefreshCw} className="w-4 h-4 inline mr-1" />
                Generate New Set
              </button>
            </div>
          </div>
        )}

        {/* No Credits Warning */}
        {aiCredits === 0 && (
          <div className="border-t border-blue-200 p-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <SafeIcon icon={FiInfo} className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="font-medium text-orange-900">No AI Credits Remaining</p>
                  <p className="text-sm text-orange-800">Purchase additional credits to continue using AI features.</p>
                </div>
                <button
                  onClick={() => setShowPurchaseModal(true)}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                >
                  Buy Credits
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <PurchaseCreditsModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
      />
    </>
  );
};

export default AIBrainstormingPanel;