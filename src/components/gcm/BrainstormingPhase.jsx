import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAI } from '../../contexts/AIContext';
import AIBrainstormingPanel from '../ai/AIBrainstormingPanel';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiLightbulb, FiUsers, FiArrowRight, FiZap } = FiIcons;

const BrainstormingPhase = ({ project }) => {
  const { hasAIAccess } = useAI();
  const [statements, setStatements] = useState([
    {
      id: 1,
      text: 'Implement cloud-based infrastructure for better scalability',
      author: 'John D.',
      timestamp: '2024-01-15T10:30:00Z',
      source: 'manual'
    },
    {
      id: 2,
      text: 'Develop mobile-first customer experience strategy',
      author: 'Sarah M.',
      timestamp: '2024-01-15T11:15:00Z',
      source: 'manual'
    },
    {
      id: 3,
      text: 'Create unified data analytics platform across departments',
      author: 'Mike R.',
      timestamp: '2024-01-15T14:20:00Z',
      source: 'manual'
    }
  ]);

  const [newStatement, setNewStatement] = useState('');
  const [isAddingStatement, setIsAddingStatement] = useState(false);

  const handleAddStatement = (e) => {
    e.preventDefault();
    if (newStatement.trim()) {
      const statement = {
        id: Date.now(),
        text: newStatement.trim(),
        author: 'You',
        timestamp: new Date().toISOString(),
        source: 'manual'
      };
      setStatements([...statements, statement]);
      setNewStatement('');
      setIsAddingStatement(false);
    }
  };

  const handleAIStatementsGenerated = (aiStatements) => {
    const formattedStatements = aiStatements.map(aiStatement => ({
      id: aiStatement.id,
      text: aiStatement.text,
      author: 'AI Assistant',
      timestamp: aiStatement.timestamp,
      source: 'ai_generated',
      confidence: aiStatement.confidence
    }));
    
    setStatements(prev => [...prev, ...formattedStatements]);
  };

  const moveToStructuring = () => {
    // In a real app, this would update the project phase
    console.log('Moving to structuring phase');
  };

  const manualStatements = statements.filter(s => s.source === 'manual');
  const aiStatements = statements.filter(s => s.source === 'ai_generated');

  return (
    <div className="space-y-8">
      {/* Phase Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-6"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
            <SafeIcon icon={FiLightbulb} className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-blue-900 mb-2">
              Brainstorming Phase
            </h2>
            <p className="text-blue-800 mb-4">
              Generate ideas and statements related to the focus question. Encourage participants to think freely and contribute diverse perspectives.
            </p>
            <div className="bg-white rounded-md p-4 border border-blue-200">
              <p className="font-medium text-blue-900 mb-1">Focus Question:</p>
              <p className="text-blue-800">{project.focusQuestion}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AI Brainstorming Panel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AIBrainstormingPanel 
          project={project} 
          onStatementsGenerated={handleAIStatementsGenerated}
        />
      </motion.div>

      {/* Manual Statement Entry */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Contribute Your Ideas
        </h3>
        
        {!isAddingStatement ? (
          <button
            onClick={() => setIsAddingStatement(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            Add Statement
          </button>
        ) : (
          <form onSubmit={handleAddStatement} className="space-y-4">
            <textarea
              value={newStatement}
              onChange={(e) => setNewStatement(e.target.value)}
              placeholder="Enter your idea or statement..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors"
              >
                Add Statement
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsAddingStatement(false);
                  setNewStatement('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </motion.div>

      {/* Statements List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">
              Generated Statements ({statements.length})
            </h3>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                <span>{project.participantCount} contributors</span>
              </div>
              {hasAIAccess && aiStatements.length > 0 && (
                <div className="flex items-center">
                  <SafeIcon icon={FiZap} className="w-4 h-4 mr-1 text-purple-600" />
                  <span className="text-purple-600">{aiStatements.length} AI-generated</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {statements.map((statement, index) => (
            <motion.div
              key={statement.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-gray-900 mb-2">{statement.text}</p>
                  <div className="flex items-center text-sm text-gray-500 space-x-4">
                    <span>By {statement.author}</span>
                    <span>•</span>
                    <span>{new Date(statement.timestamp).toLocaleDateString()}</span>
                    {statement.source === 'ai_generated' && (
                      <>
                        <span>•</span>
                        <span className="flex items-center text-purple-600">
                          <SafeIcon icon={FiZap} className="w-3 h-3 mr-1" />
                          AI Generated
                        </span>
                        {statement.confidence && (
                          <>
                            <span>•</span>
                            <span className="text-purple-600">
                              {Math.round(statement.confidence * 100)}% confidence
                            </span>
                          </>
                        )}
                      </>
                    )}
                  </div>
                </div>
                <div className="ml-4 text-sm text-gray-400">
                  #{index + 1}
                </div>
              </div>
            </motion.div>
          ))}
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
              Ready to move to the next phase?
            </h3>
            <p className="text-gray-600">
              Once you have sufficient statements, proceed to organize them into meaningful groups.
            </p>
          </div>
          <button
            onClick={moveToStructuring}
            className="inline-flex items-center px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            Proceed to Structuring
            <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-2" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default BrainstormingPhase;