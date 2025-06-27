import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiLayers, FiMove, FiArrowRight, FiTag } = FiIcons;

const StructuringPhase = ({ project }) => {
  const [statements] = useState([
    { id: 1, text: 'Implement cloud-based infrastructure for better scalability', clusterId: 1 },
    { id: 2, text: 'Develop mobile-first customer experience strategy', clusterId: 2 },
    { id: 3, text: 'Create unified data analytics platform across departments', clusterId: 1 },
    { id: 4, text: 'Establish cross-functional collaboration frameworks', clusterId: 3 },
    { id: 5, text: 'Enhance customer support automation systems', clusterId: 2 },
    { id: 6, text: 'Implement agile development methodologies', clusterId: 3 }
  ]);

  const [clusters, setClusters] = useState([
    { id: 1, name: 'Technology Infrastructure', color: 'bg-blue-100 border-blue-300' },
    { id: 2, name: 'Customer Experience', color: 'bg-green-100 border-green-300' },
    { id: 3, name: 'Organizational Process', color: 'bg-purple-100 border-purple-300' }
  ]);

  const [selectedStatements, setSelectedStatements] = useState([]);
  const [newClusterName, setNewClusterName] = useState('');
  const [isCreatingCluster, setIsCreatingCluster] = useState(false);

  const getStatementsForCluster = (clusterId) => {
    return statements.filter(s => s.clusterId === clusterId);
  };

  const getUnclusteredStatements = () => {
    return statements.filter(s => !s.clusterId);
  };

  const handleCreateCluster = (e) => {
    e.preventDefault();
    if (newClusterName.trim()) {
      const colors = [
        'bg-red-100 border-red-300',
        'bg-yellow-100 border-yellow-300',
        'bg-indigo-100 border-indigo-300',
        'bg-pink-100 border-pink-300'
      ];
      const newCluster = {
        id: Date.now(),
        name: newClusterName.trim(),
        color: colors[Math.floor(Math.random() * colors.length)]
      };
      setClusters([...clusters, newCluster]);
      setNewClusterName('');
      setIsCreatingCluster(false);
    }
  };

  const moveToRating = () => {
    console.log('Moving to rating phase');
  };

  return (
    <div className="space-y-8">
      {/* Phase Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center mr-4">
            <SafeIcon icon={FiLayers} className="w-5 h-5 text-yellow-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-yellow-900 mb-2">
              Structuring Phase
            </h2>
            <p className="text-yellow-800 mb-4">
              Organize statements into meaningful clusters based on similarity and thematic relationships. 
              Create groups that represent coherent concepts or themes.
            </p>
            <div className="flex items-center text-sm text-yellow-700">
              <SafeIcon icon={FiMove} className="w-4 h-4 mr-2" />
              Drag and drop statements between clusters to organize them
            </div>
          </div>
        </div>
      </motion.div>

      {/* Cluster Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Concept Clusters
          </h3>
          {!isCreatingCluster ? (
            <button
              onClick={() => setIsCreatingCluster(true)}
              className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
            >
              <SafeIcon icon={FiTag} className="w-4 h-4 mr-2" />
              Create Cluster
            </button>
          ) : (
            <form onSubmit={handleCreateCluster} className="flex items-center space-x-2">
              <input
                type="text"
                value={newClusterName}
                onChange={(e) => setNewClusterName(e.target.value)}
                placeholder="Cluster name..."
                className="px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium"
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

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {clusters.map((cluster) => (
            <motion.div
              key={cluster.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`border-2 border-dashed rounded-lg p-4 min-h-[200px] ${cluster.color}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold text-gray-900">{cluster.name}</h4>
                <span className="text-sm text-gray-600">
                  {getStatementsForCluster(cluster.id).length} items
                </span>
              </div>
              
              <div className="space-y-2">
                {getStatementsForCluster(cluster.id).map((statement) => (
                  <motion.div
                    key={statement.id}
                    layout
                    className="bg-white p-3 rounded-md shadow-sm border border-gray-200 cursor-move hover:shadow-md transition-shadow"
                  >
                    <p className="text-sm text-gray-900">{statement.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Unclustered Statements */}
      {getUnclusteredStatements().length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200"
        >
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Unorganized Statements ({getUnclusteredStatements().length})
            </h3>
            <p className="text-gray-600 text-sm mt-1">
              Drag these statements into appropriate clusters above
            </p>
          </div>
          <div className="p-6 space-y-3">
            {getUnclusteredStatements().map((statement) => (
              <motion.div
                key={statement.id}
                layout
                className="bg-gray-50 p-3 rounded-md border border-gray-200 cursor-move hover:bg-gray-100 transition-colors"
              >
                <p className="text-sm text-gray-900">{statement.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Clustering Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Clustering Progress
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary-600">
              {statements.length}
            </div>
            <div className="text-sm text-gray-600">Total Statements</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {clusters.length}
            </div>
            <div className="text-sm text-gray-600">Concept Clusters</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((statements.filter(s => s.clusterId).length / statements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Organized</div>
          </div>
        </div>
      </motion.div>

      {/* Phase Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Ready for the rating phase?
            </h3>
            <p className="text-gray-600">
              Once statements are organized into meaningful clusters, proceed to have participants rate them.
            </p>
          </div>
          <button
            onClick={moveToRating}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Proceed to Rating
            <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default StructuringPhase;