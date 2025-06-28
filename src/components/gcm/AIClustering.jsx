import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiZap, FiSettings, FiRefreshCw, FiCheck, FiInfo } = FiIcons;

const AIClustering = ({ statements, onClustersGenerated, project }) => {
  const { aiCredits, loading, generateAIClusters } = useAI();
  const [clusteringSettings, setClusteringSettings] = useState({
    numberOfClusters: 'auto',
    clusteringMethod: 'semantic',
    includeRatings: true,
    minClusterSize: 2,
    maxClusters: 8
  });
  const [isExpanded, setIsExpanded] = useState(false);
  const [generatedClusters, setGeneratedClusters] = useState([]);
  const [showPreview, setShowPreview] = useState(false);

  const handleGenerateClusters = async () => {
    try {
      if (aiCredits === 0) {
        // Show purchase modal or error
        return;
      }

      const clusters = await mockAIClusterGeneration(statements, clusteringSettings);
      setGeneratedClusters(clusters);
      setShowPreview(true);
    } catch (error) {
      console.error('Failed to generate clusters:', error);
    }
  };

  const handleApplyClusters = () => {
    onClustersGenerated(generatedClusters);
    setShowPreview(false);
  };

  const creditsRequired = Math.ceil(statements.length / 10); // 1 credit per 10 statements

  return (
    <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-lg">
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <SafeIcon icon={FiZap} className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-purple-900">
                AI-Powered Clustering
              </h3>
              <p className="text-purple-700 text-sm">
                Automatically group statements based on semantic similarity
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
            >
              <SafeIcon icon={FiSettings} className="w-5 h-5" />
            </button>
            <button
              onClick={handleGenerateClusters}
              disabled={loading || aiCredits === 0}
              className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Analyzing...
                </>
              ) : (
                <>
                  <SafeIcon icon={FiZap} className="w-4 h-4 mr-2" />
                  Generate Clusters ({creditsRequired} credits)
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
              className="mt-6 pt-6 border-t border-purple-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Number of Clusters
                  </label>
                  <select
                    value={clusteringSettings.numberOfClusters}
                    onChange={(e) => setClusteringSettings(prev => ({ ...prev, numberOfClusters: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="auto">Auto-detect</option>
                    <option value="3">3 clusters</option>
                    <option value="4">4 clusters</option>
                    <option value="5">5 clusters</option>
                    <option value="6">6 clusters</option>
                    <option value="7">7 clusters</option>
                    <option value="8">8 clusters</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Clustering Method
                  </label>
                  <select
                    value={clusteringSettings.clusteringMethod}
                    onChange={(e) => setClusteringSettings(prev => ({ ...prev, clusteringMethod: e.target.value }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="semantic">Semantic Similarity</option>
                    <option value="ratings">Rating-based</option>
                    <option value="hybrid">Hybrid Approach</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-900 mb-2">
                    Min Cluster Size
                  </label>
                  <select
                    value={clusteringSettings.minClusterSize}
                    onChange={(e) => setClusteringSettings(prev => ({ ...prev, minClusterSize: parseInt(e.target.value) }))}
                    className="w-full px-3 py-2 border border-purple-300 rounded-md focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value={1}>1 statement</option>
                    <option value={2}>2 statements</option>
                    <option value={3}>3 statements</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={clusteringSettings.includeRatings}
                      onChange={(e) => setClusteringSettings(prev => ({ ...prev, includeRatings: e.target.checked }))}
                      className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-purple-800">Include ratings in clustering</span>
                  </label>
                </div>
              </div>

              <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <SafeIcon icon={FiInfo} className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">How AI Clustering Works</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Analyzes statement text for semantic meaning and context</li>
                      <li>• Groups similar concepts and themes automatically</li>
                      <li>• Considers importance and feasibility ratings when enabled</li>
                      <li>• Generates meaningful cluster names based on content</li>
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generated Clusters Preview */}
      {showPreview && generatedClusters.length > 0 && (
        <div className="border-t border-purple-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-semibold text-purple-900">
              AI-Generated Clusters ({generatedClusters.length})
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={handleGenerateClusters}
                disabled={loading}
                className="inline-flex items-center px-3 py-1 text-purple-600 hover:bg-purple-100 rounded text-sm font-medium transition-colors"
              >
                <SafeIcon icon={FiRefreshCw} className="w-3 h-3 mr-1" />
                Regenerate
              </button>
              <button
                onClick={handleApplyClusters}
                className="inline-flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
              >
                <SafeIcon icon={FiCheck} className="w-3 h-3 mr-1" />
                Apply Clusters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
            {generatedClusters.map((cluster, index) => (
              <motion.div
                key={cluster.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-lg p-4 ${cluster.color}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <h5 className="font-medium">{cluster.name}</h5>
                  <div className="flex items-center space-x-2 text-xs opacity-75">
                    <span>{cluster.statements.length} items</span>
                    <span>•</span>
                    <span>{Math.round(cluster.confidence * 100)}% confidence</span>
                  </div>
                </div>
                <div className="space-y-2">
                  {cluster.statements.map((statement) => (
                    <div key={statement.id} className="bg-white bg-opacity-60 p-2 rounded text-xs">
                      <p className="text-gray-900 line-clamp-2">{statement.text}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <SafeIcon icon={FiCheck} className="w-5 h-5 text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900 mb-1">AI Analysis Complete</h4>
                <p className="text-sm text-green-800">
                  AI has identified {generatedClusters.length} distinct thematic clusters with an average confidence of{' '}
                  {Math.round(generatedClusters.reduce((sum, c) => sum + c.confidence, 0) / generatedClusters.length * 100)}%.
                  Review the clusters above and apply them to proceed with your analysis.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* No Credits Warning */}
      {aiCredits === 0 && (
        <div className="border-t border-purple-200 p-6">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <SafeIcon icon={FiInfo} className="w-5 h-5 text-orange-600" />
              <div>
                <p className="font-medium text-orange-900">No AI Credits Remaining</p>
                <p className="text-sm text-orange-800">Purchase additional credits to use AI clustering features.</p>
              </div>
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors">
                Buy Credits
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Mock AI clustering function
const mockAIClusterGeneration = async (statements, settings) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2500));

  const clusterTemplates = [
    { name: 'Technology Infrastructure', keywords: ['technology', 'infrastructure', 'platform', 'system', 'data', 'cloud'] },
    { name: 'Customer Experience', keywords: ['customer', 'experience', 'service', 'support', 'user', 'client'] },
    { name: 'Organizational Process', keywords: ['process', 'workflow', 'collaboration', 'team', 'agile', 'methodology'] },
    { name: 'Strategic Planning', keywords: ['strategy', 'planning', 'goal', 'objective', 'vision', 'mission'] },
    { name: 'Innovation & Development', keywords: ['innovation', 'development', 'new', 'creative', 'design', 'research'] },
    { name: 'Operations & Efficiency', keywords: ['efficiency', 'operation', 'optimize', 'streamline', 'improve', 'enhance'] }
  ];

  const colors = [
    'bg-blue-100 border-blue-300 text-blue-900',
    'bg-green-100 border-green-300 text-green-900',
    'bg-purple-100 border-purple-300 text-purple-900',
    'bg-red-100 border-red-300 text-red-900',
    'bg-yellow-100 border-yellow-300 text-yellow-900',
    'bg-indigo-100 border-indigo-300 text-indigo-900'
  ];

  // Simple clustering based on keywords
  const clusters = [];
  const usedStatements = new Set();

  clusterTemplates.forEach((template, index) => {
    const matchingStatements = statements.filter(statement => {
      if (usedStatements.has(statement.id)) return false;
      
      const text = statement.text.toLowerCase();
      return template.keywords.some(keyword => text.includes(keyword));
    });

    if (matchingStatements.length >= settings.minClusterSize) {
      matchingStatements.forEach(s => usedStatements.add(s.id));
      
      clusters.push({
        id: Date.now() + index,
        name: template.name,
        color: colors[index % colors.length],
        statements: matchingStatements,
        confidence: 0.75 + Math.random() * 0.25,
        method: settings.clusteringMethod
      });
    }
  });

  // Handle remaining statements
  const remainingStatements = statements.filter(s => !usedStatements.has(s.id));
  if (remainingStatements.length >= settings.minClusterSize) {
    clusters.push({
      id: Date.now() + 999,
      name: 'Miscellaneous',
      color: 'bg-gray-100 border-gray-300 text-gray-900',
      statements: remainingStatements,
      confidence: 0.6 + Math.random() * 0.2,
      method: settings.clusteringMethod
    });
  }

  return clusters;
};

export default AIClustering;