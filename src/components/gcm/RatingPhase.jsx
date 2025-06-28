import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import ClusteringPanel from './ClusteringPanel';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiTrendingUp, FiArrowRight, FiUsers, FiLayers, FiZap } = FiIcons;

const RatingPhase = ({ project }) => {
  const { hasAIAccess } = useAI();
  const [activeSubPhase, setActiveSubPhase] = useState('rating');
  const [statements] = useState([
    {
      id: 1,
      text: 'Implement cloud-based infrastructure for better scalability',
      importance: 4.2,
      feasibility: 3.8,
      clusterId: null
    },
    {
      id: 2,
      text: 'Develop mobile-first customer experience strategy',
      importance: 4.1,
      feasibility: 4.0,
      clusterId: null
    },
    {
      id: 3,
      text: 'Create unified data analytics platform across departments',
      importance: 4.5,
      feasibility: 3.2,
      clusterId: null
    },
    {
      id: 4,
      text: 'Establish cross-functional collaboration frameworks',
      importance: 4.3,
      feasibility: 3.5,
      clusterId: null
    },
    {
      id: 5,
      text: 'Enhance customer support automation systems',
      importance: 3.9,
      feasibility: 4.2,
      clusterId: null
    },
    {
      id: 6,
      text: 'Implement agile development methodologies',
      importance: 4.0,
      feasibility: 3.9,
      clusterId: null
    }
  ]);

  const [clusters, setClusters] = useState([]);
  const [selectedStatement, setSelectedStatement] = useState(null);
  const [userRatings, setUserRatings] = useState({});

  const handleRating = (statementId, dimension, rating) => {
    setUserRatings(prev => ({
      ...prev,
      [statementId]: {
        ...prev[statementId],
        [dimension]: rating
      }
    }));
  };

  const handleClustersGenerated = (generatedClusters) => {
    setClusters(generatedClusters);
  };

  const RatingStars = ({ rating, onRate, dimension, statementId }) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onRate(statementId, dimension, star)}
            className={`w-6 h-6 ${
              star <= (userRatings[statementId]?.[dimension] || 0)
                ? 'text-yellow-400'
                : 'text-gray-300'
            } hover:text-yellow-400 transition-colors`}
          >
            <SafeIcon icon={FiStar} className="w-full h-full fill-current" />
          </button>
        ))}
      </div>
    );
  };

  const moveToAnalysis = () => {
    console.log('Moving to analysis phase');
  };

  const subPhases = [
    {
      id: 'rating',
      name: 'Rating',
      description: 'Rate statements on importance and feasibility',
      icon: FiStar,
      completed: Object.keys(userRatings).length >= statements.length
    },
    {
      id: 'clustering',
      name: 'Clustering',
      description: 'Group similar statements into clusters',
      icon: FiLayers,
      completed: clusters.length > 0
    }
  ];

  return (
    <div className="space-y-8">
      {/* Phase Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-50 border border-purple-200 rounded-lg p-6"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
            <SafeIcon icon={FiStar} className="w-5 h-5 text-purple-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-purple-900 mb-2">
              Rating & Clustering Phase
            </h2>
            <p className="text-purple-800 mb-4">
              Rate each statement on importance and feasibility, then organize them into meaningful clusters for strategic analysis.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white rounded-md p-3 border border-purple-200">
                <p className="font-medium text-purple-900 text-sm">Importance</p>
                <p className="text-purple-700 text-xs">How critical is this for achieving your goals?</p>
              </div>
              <div className="bg-white rounded-md p-3 border border-purple-200">
                <p className="font-medium text-purple-900 text-sm">Feasibility</p>
                <p className="text-purple-700 text-xs">How realistic is it to implement this?</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sub-phase Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Phase Progress</h3>
          <div className="flex items-center space-x-8">
            {subPhases.map((phase, index) => (
              <div key={phase.id} className="flex items-center">
                <button
                  onClick={() => setActiveSubPhase(phase.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg border-2 transition-colors ${
                    activeSubPhase === phase.id
                      ? 'border-purple-500 bg-purple-50'
                      : phase.completed
                      ? 'border-green-300 bg-green-50'
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activeSubPhase === phase.id
                      ? 'bg-purple-600 text-white'
                      : phase.completed
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-300 text-gray-600'
                  }`}>
                    <SafeIcon icon={phase.icon} className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <p className={`font-medium ${
                      activeSubPhase === phase.id
                        ? 'text-purple-900'
                        : phase.completed
                        ? 'text-green-900'
                        : 'text-gray-700'
                    }`}>
                      {phase.name}
                    </p>
                    <p className="text-xs text-gray-600">{phase.description}</p>
                  </div>
                </button>
                {index < subPhases.length - 1 && (
                  <div className={`ml-4 w-12 h-0.5 ${
                    subPhases[index + 1].completed ? 'bg-green-300' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content based on active sub-phase */}
      <AnimatePresence mode="wait">
        {activeSubPhase === 'rating' && (
          <motion.div
            key="rating"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-6"
          >
            {/* Rating Progress */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Rating Progress</h3>
                <div className="flex items-center text-sm text-gray-500">
                  <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                  <span>{project.participantCount} participants</span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {statements.length}
                  </div>
                  <div className="text-sm text-gray-600">Statements to Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {Object.keys(userRatings).length}
                  </div>
                  <div className="text-sm text-gray-600">Your Ratings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round((Object.keys(userRatings).length / statements.length) * 100)}%
                  </div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
              </div>
            </div>

            {/* Rating Interface */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
                <h4 className="text-lg font-semibold text-gray-900">Rate Statements</h4>
                <p className="text-sm text-gray-600">{statements.length} statements to evaluate</p>
              </div>
              <div className="divide-y divide-gray-200">
                {statements.map((statement, statementIndex) => (
                  <div key={statement.id} className="p-6">
                    <div className="mb-4">
                      <p className="text-gray-900 mb-2">{statement.text}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Avg. Importance: {statement.importance.toFixed(1)}</span>
                        <span>Avg. Feasibility: {statement.feasibility.toFixed(1)}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Importance
                        </label>
                        <RatingStars
                          rating={userRatings[statement.id]?.importance || 0}
                          onRate={handleRating}
                          dimension="importance"
                          statementId={statement.id}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Feasibility
                        </label>
                        <RatingStars
                          rating={userRatings[statement.id]?.feasibility || 0}
                          onRate={handleRating}
                          dimension="feasibility"
                          statementId={statement.id}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeSubPhase === 'clustering' && (
          <motion.div
            key="clustering"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
          >
            <ClusteringPanel
              statements={statements}
              clusters={clusters}
              onClustersGenerated={handleClustersGenerated}
              project={project}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              Ready to analyze results?
            </h3>
            <p className="text-gray-600">
              Complete both rating and clustering to generate comprehensive insights and strategic recommendations.
            </p>
            <div className="mt-3 flex items-center space-x-4 text-sm">
              <div className={`flex items-center ${
                subPhases[0].completed ? 'text-green-600' : 'text-gray-500'
              }`}>
                <SafeIcon icon={subPhases[0].completed ? FiStar : FiStar} className="w-4 h-4 mr-1" />
                <span>Rating {subPhases[0].completed ? 'Complete' : 'Pending'}</span>
              </div>
              <div className={`flex items-center ${
                subPhases[1].completed ? 'text-green-600' : 'text-gray-500'
              }`}>
                <SafeIcon icon={subPhases[1].completed ? FiLayers : FiLayers} className="w-4 h-4 mr-1" />
                <span>Clustering {subPhases[1].completed ? 'Complete' : 'Pending'}</span>
              </div>
            </div>
          </div>
          <button
            onClick={moveToAnalysis}
            disabled={!subPhases.every(phase => phase.completed)}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Proceed to Analysis
            <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default RatingPhase;