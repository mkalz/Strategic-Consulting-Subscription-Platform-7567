import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiStar, FiTrendingUp, FiArrowRight, FiUsers } = FiIcons;

const RatingPhase = ({ project }) => {
  const [clusters] = useState([
    {
      id: 1,
      name: 'Technology Infrastructure',
      statements: [
        { id: 1, text: 'Implement cloud-based infrastructure for better scalability', importance: 4.2, feasibility: 3.8 },
        { id: 3, text: 'Create unified data analytics platform across departments', importance: 4.5, feasibility: 3.2 }
      ]
    },
    {
      id: 2,
      name: 'Customer Experience',
      statements: [
        { id: 2, text: 'Develop mobile-first customer experience strategy', importance: 4.1, feasibility: 4.0 },
        { id: 5, text: 'Enhance customer support automation systems', importance: 3.9, feasibility: 4.2 }
      ]
    },
    {
      id: 3,
      name: 'Organizational Process',
      statements: [
        { id: 4, text: 'Establish cross-functional collaboration frameworks', importance: 4.3, feasibility: 3.5 },
        { id: 6, text: 'Implement agile development methodologies', importance: 4.0, feasibility: 3.9 }
      ]
    }
  ]);

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
              Rating Phase
            </h2>
            <p className="text-purple-800 mb-4">
              Rate each statement on two dimensions: importance and feasibility. 
              This will help prioritize concepts for strategic decision-making.
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

      {/* Rating Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
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
              {clusters.reduce((sum, cluster) => sum + cluster.statements.length, 0)}
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
              {Math.round((Object.keys(userRatings).length / clusters.reduce((sum, cluster) => sum + cluster.statements.length, 0)) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </div>
      </motion.div>

      {/* Rating Interface */}
      <div className="space-y-6">
        {clusters.map((cluster, clusterIndex) => (
          <motion.div
            key={cluster.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + clusterIndex * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200"
          >
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 rounded-t-lg">
              <h4 className="text-lg font-semibold text-gray-900">{cluster.name}</h4>
              <p className="text-sm text-gray-600">{cluster.statements.length} statements</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {cluster.statements.map((statement, statementIndex) => (
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
          </motion.div>
        ))}
      </div>

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
              Once sufficient ratings are collected, proceed to generate insights and strategic recommendations.
            </p>
          </div>
          <button
            onClick={moveToAnalysis}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
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