import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import AIClustering from './AIClustering';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLayers, FiPlus, FiMove, FiTag, FiZap, FiSettings, FiRefreshCw, FiX } = FiIcons;

const ClusteringPanel = ({ statements, clusters, onClustersGenerated, project }) => {
  const { hasAIAccess } = useAI();
  const [clusteringMethod, setClusteringMethod] = useState('manual');
  const [localClusters, setLocalClusters] = useState(clusters);
  const [newClusterName, setNewClusterName] = useState('');
  const [isCreatingCluster, setIsCreatingCluster] = useState(false);
  const [draggedStatement, setDraggedStatement] = useState(null);

  const handleCreateCluster = (e) => {
    e.preventDefault();
    if (newClusterName.trim()) {
      const colors = [
        'bg-blue-100 border-blue-300 text-blue-900',
        'bg-green-100 border-green-300 text-green-900',
        'bg-purple-100 border-purple-300 text-purple-900',
        'bg-red-100 border-red-300 text-red-900',
        'bg-yellow-100 border-yellow-300 text-yellow-900',
        'bg-indigo-100 border-indigo-300 text-indigo-900',
        'bg-pink-100 border-pink-300 text-pink-900',
        'bg-orange-100 border-orange-300 text-orange-900'
      ];

      const newCluster = {
        id: Date.now(),
        name: newClusterName.trim(),
        color: colors[localClusters.length % colors.length],
        statements: []
      };

      const updatedClusters = [...localClusters, newCluster];
      setLocalClusters(updatedClusters);
      onClustersGenerated(updatedClusters);
      setNewClusterName('');
      setIsCreatingCluster(false);
    }
  };

  const handleAIClustersGenerated = (aiClusters) => {
    setLocalClusters(aiClusters);
    onClustersGenerated(aiClusters);
    setClusteringMethod('ai');
  };

  const handleDragStart = (e, statement) => {
    setDraggedStatement(statement);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, clusterId) => {
    e.preventDefault();
    if (!draggedStatement) return;

    const updatedClusters = localClusters.map(cluster => {
      // Remove statement from all clusters first
      const filteredStatements = cluster.statements.filter(s => s.id !== draggedStatement.id);
      
      // Add to target cluster
      if (cluster.id === clusterId) {
        return { ...cluster, statements: [...filteredStatements, draggedStatement] };
      }
      
      return { ...cluster, statements: filteredStatements };
    });

    setLocalClusters(updatedClusters);
    onClustersGenerated(updatedClusters);
    setDraggedStatement(null);
  };

  const getUnclusteredStatements = () => {
    const clusteredStatementIds = localClusters.flatMap(cluster => 
      cluster.statements.map(s => s.id)
    );
    return statements.filter(statement => 
      !clusteredStatementIds.includes(statement.id)
    );
  };

  const removeCluster = (clusterId) => {
    const updatedClusters = localClusters.filter(cluster => cluster.id !== clusterId);
    setLocalClusters(updatedClusters);
    onClustersGenerated(updatedClusters);
  };

  const unclusteredStatements = getUnclusteredStatements();

  return (
    <div className="space-y-6">
      {/* Clustering Method Selection */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Clustering Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={() => setClusteringMethod('manual')}
            className={`p-4 border-2 rounded-lg transition-colors ${
              clusteringMethod === 'manual'
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <SafeIcon icon={FiMove} className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-900">Manual Clustering</span>
            </div>
            <p className="text-sm text-gray-600 text-left">
              Drag and drop statements into custom clusters based on your analysis
            </p>
          </button>

          <button
            onClick={() => setClusteringMethod('ai')}
            disabled={!hasAIAccess}
            className={`p-4 border-2 rounded-lg transition-colors ${
              clusteringMethod === 'ai'
                ? 'border-purple-500 bg-purple-50'
                : hasAIAccess
                ? 'border-gray-200 hover:border-gray-300'
                : 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex items-center space-x-3 mb-2">
              <SafeIcon icon={FiZap} className={`w-5 h-5 ${
                hasAIAccess ? 'text-purple-600' : 'text-gray-400'
              }`} />
              <span className="font-medium text-gray-900">AI-Powered Clustering</span>
              {!hasAIAccess && (
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">Pro</span>
              )}
            </div>
            <p className="text-sm text-gray-600 text-left">
              Let AI automatically group statements based on semantic similarity
            </p>
          </button>
        </div>
      </div>

      {/* AI Clustering Panel */}
      {clusteringMethod === 'ai' && hasAIAccess && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <AIClustering
            statements={statements}
            onClustersGenerated={handleAIClustersGenerated}
            project={project}
          />
        </motion.div>
      )}

      {/* Manual Clustering Interface */}
      {clusteringMethod === 'manual' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Cluster Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">
                Statement Clusters ({localClusters.length})
              </h3>
              {!isCreatingCluster ? (
                <button
                  onClick={() => setIsCreatingCluster(true)}
                  className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
                  Add Cluster
                </button>
              ) : (
                <form onSubmit={handleCreateCluster} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newClusterName}
                    onChange={(e) => setNewClusterName(e.target.value)}
                    placeholder="Cluster name..."
                    className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
                  >
                    Create
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCluster(false);
                      setNewClusterName('');
                    }}
                    className="px-3 py-1 border border-gray-300 text-gray-700 rounded-md text-sm hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </div>

            {localClusters.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <SafeIcon icon={FiLayers} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No clusters created yet</p>
                <p className="text-sm">Create clusters to organize your statements</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {localClusters.map((cluster) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`border-2 border-dashed rounded-lg p-4 min-h-[200px] ${cluster.color}`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, cluster.id)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold">{cluster.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm opacity-75">
                          {cluster.statements.length} items
                        </span>
                        <button
                          onClick={() => removeCluster(cluster.id)}
                          className="p-1 hover:bg-red-100 rounded text-red-600 transition-colors"
                        >
                          <SafeIcon icon={FiX} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {cluster.statements.map((statement) => (
                        <motion.div
                          key={statement.id}
                          layout
                          className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                          draggable
                          onDragStart={(e) => handleDragStart(e, statement)}
                        >
                          <p className="text-sm text-gray-900">{statement.text}</p>
                          <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                            <span>I: {statement.importance?.toFixed(1) || 'N/A'}</span>
                            <span>F: {statement.feasibility?.toFixed(1) || 'N/A'}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* Unclustered Statements */}
      {unclusteredStatements.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Unclustered Statements ({unclusteredStatements.length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Drag these statements into appropriate clusters above
            </p>
          </div>
          <div className="p-6 space-y-3">
            {unclusteredStatements.map((statement) => (
              <motion.div
                key={statement.id}
                layout
                className="bg-gray-50 p-3 rounded-md border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
                draggable
                onDragStart={(e) => handleDragStart(e, statement)}
              >
                <p className="text-sm text-gray-900">{statement.text}</p>
                <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                  <span>Importance: {statement.importance?.toFixed(1) || 'N/A'}</span>
                  <span>Feasibility: {statement.feasibility?.toFixed(1) || 'N/A'}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clustering Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Clustering Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {statements.length}
            </div>
            <div className="text-sm text-gray-600">Total Statements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {localClusters.length}
            </div>
            <div className="text-sm text-gray-600">Clusters Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {statements.length - unclusteredStatements.length}
            </div>
            <div className="text-sm text-gray-600">Statements Clustered</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">
              {statements.length > 0 
                ? Math.round(((statements.length - unclusteredStatements.length) / statements.length) * 100)
                : 0}%
            </div>
            <div className="text-sm text-gray-600">Completion Rate</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ClusteringPanel;