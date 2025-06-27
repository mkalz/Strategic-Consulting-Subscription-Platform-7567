import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiBarChart3, FiDownload, FiShare2, FiTarget } = FiIcons;

const AnalysisPhase = ({ project }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const clusters = [
    {
      id: 1,
      name: 'Technology Infrastructure',
      avgImportance: 4.35,
      avgFeasibility: 3.5,
      statements: [
        { id: 1, text: 'Implement cloud-based infrastructure for better scalability', importance: 4.2, feasibility: 3.8 },
        { id: 3, text: 'Create unified data analytics platform across departments', importance: 4.5, feasibility: 3.2 }
      ]
    },
    {
      id: 2,
      name: 'Customer Experience',
      avgImportance: 4.0,
      avgFeasibility: 4.1,
      statements: [
        { id: 2, text: 'Develop mobile-first customer experience strategy', importance: 4.1, feasibility: 4.0 },
        { id: 5, text: 'Enhance customer support automation systems', importance: 3.9, feasibility: 4.2 }
      ]
    },
    {
      id: 3,
      name: 'Organizational Process',
      avgImportance: 4.15,
      avgFeasibility: 3.7,
      statements: [
        { id: 4, text: 'Establish cross-functional collaboration frameworks', importance: 4.3, feasibility: 3.5 },
        { id: 6, text: 'Implement agile development methodologies', importance: 4.0, feasibility: 3.9 }
      ]
    }
  ];

  const priorityMatrix = {
    highImportanceHighFeasibility: clusters.filter(c => c.avgImportance >= 4.0 && c.avgFeasibility >= 4.0),
    highImportanceLowFeasibility: clusters.filter(c => c.avgImportance >= 4.0 && c.avgFeasibility < 4.0),
    lowImportanceHighFeasibility: clusters.filter(c => c.avgImportance < 4.0 && c.avgFeasibility >= 4.0),
    lowImportanceLowFeasibility: clusters.filter(c => c.avgImportance < 4.0 && c.avgFeasibility < 4.0)
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiBarChart3 },
    { id: 'priorities', label: 'Priority Matrix', icon: FiTarget },
    { id: 'insights', label: 'Strategic Insights', icon: FiShare2 }
  ];

  const exportReport = () => {
    console.log('Exporting comprehensive report...');
  };

  return (
    <div className="space-y-8">
      {/* Phase Introduction */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-6"
      >
        <div className="flex items-start">
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4">
            <SafeIcon icon={FiBarChart3} className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-green-900 mb-2">
              Analysis Phase
            </h2>
            <p className="text-green-800 mb-4">
              Analyze the structured data to generate strategic insights and actionable recommendations 
              based on participant ratings and concept relationships.
            </p>
            <div className="flex items-center justify-between">
              <div className="text-sm text-green-700">
                Analysis complete • Ready for strategic decision-making
              </div>
              <button
                onClick={exportReport}
                className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Analysis Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200"
      >
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <SafeIcon icon={tab.icon} className="w-4 h-4 mr-2" />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Concept Cluster Analysis
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {clusters.map((cluster, index) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 mb-3">{cluster.name}</h4>
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Importance:</span>
                        <span className="font-medium text-blue-600">{cluster.avgImportance.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Feasibility:</span>
                        <span className="font-medium text-green-600">{cluster.avgFeasibility.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Statements:</span>
                        <span className="font-medium">{cluster.statements.length}</span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {cluster.statements.map((statement) => (
                        <div key={statement.id} className="bg-white p-2 rounded text-xs">
                          <p className="text-gray-800 mb-1">{statement.text}</p>
                          <div className="flex justify-between text-gray-500">
                            <span>I: {statement.importance.toFixed(1)}</span>
                            <span>F: {statement.feasibility.toFixed(1)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'priorities' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Strategic Priority Matrix
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                    <h4 className="font-semibold text-green-900">Quick Wins</h4>
                    <span className="ml-2 text-sm text-green-600">(High Importance, High Feasibility)</span>
                  </div>
                  {priorityMatrix.highImportanceHighFeasibility.length > 0 ? (
                    <div className="space-y-2">
                      {priorityMatrix.highImportanceHighFeasibility.map((cluster) => (
                        <div key={cluster.id} className="bg-white p-3 rounded border border-green-200">
                          <p className="font-medium text-gray-900">{cluster.name}</p>
                          <p className="text-sm text-gray-600">
                            I: {cluster.avgImportance.toFixed(1)} | F: {cluster.avgFeasibility.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-green-700">No clusters in this quadrant</p>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                    <h4 className="font-semibold text-blue-900">Strategic Projects</h4>
                    <span className="ml-2 text-sm text-blue-600">(High Importance, Low Feasibility)</span>
                  </div>
                  {priorityMatrix.highImportanceLowFeasibility.length > 0 ? (
                    <div className="space-y-2">
                      {priorityMatrix.highImportanceLowFeasibility.map((cluster) => (
                        <div key={cluster.id} className="bg-white p-3 rounded border border-blue-200">
                          <p className="font-medium text-gray-900">{cluster.name}</p>
                          <p className="text-sm text-gray-600">
                            I: {cluster.avgImportance.toFixed(1)} | F: {cluster.avgFeasibility.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-blue-700">No clusters in this quadrant</p>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                    <h4 className="font-semibold text-yellow-900">Fill-in Projects</h4>
                    <span className="ml-2 text-sm text-yellow-600">(Low Importance, High Feasibility)</span>
                  </div>
                  {priorityMatrix.lowImportanceHighFeasibility.length > 0 ? (
                    <div className="space-y-2">
                      {priorityMatrix.lowImportanceHighFeasibility.map((cluster) => (
                        <div key={cluster.id} className="bg-white p-3 rounded border border-yellow-200">
                          <p className="font-medium text-gray-900">{cluster.name}</p>
                          <p className="text-sm text-gray-600">
                            I: {cluster.avgImportance.toFixed(1)} | F: {cluster.avgFeasibility.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-yellow-700">No clusters in this quadrant</p>
                  )}
                </div>

                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                    <h4 className="font-semibold text-red-900">Questionable</h4>
                    <span className="ml-2 text-sm text-red-600">(Low Importance, Low Feasibility)</span>
                  </div>
                  {priorityMatrix.lowImportanceLowFeasibility.length > 0 ? (
                    <div className="space-y-2">
                      {priorityMatrix.lowImportanceLowFeasibility.map((cluster) => (
                        <div key={cluster.id} className="bg-white p-3 rounded border border-red-200">
                          <p className="font-medium text-gray-900">{cluster.name}</p>
                          <p className="text-sm text-gray-600">
                            I: {cluster.avgImportance.toFixed(1)} | F: {cluster.avgFeasibility.toFixed(1)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-red-700">No clusters in this quadrant</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Strategic Insights & Recommendations
              </h3>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h4 className="font-semibold text-blue-900 mb-3">Key Findings</h4>
                  <ul className="space-y-2 text-blue-800">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Technology Infrastructure emerges as the highest importance area but faces feasibility challenges</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Customer Experience initiatives show the best balance of importance and feasibility</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Organizational Process improvements are moderately important with medium feasibility</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="font-semibold text-green-900 mb-3">Recommended Actions</h4>
                  <div className="space-y-4">
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Immediate (0-6 months)</h5>
                      <ul className="space-y-1 text-green-700 ml-4">
                        <li>• Start Customer Experience initiatives as quick wins</li>
                        <li>• Begin planning for Technology Infrastructure projects</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Medium-term (6-18 months)</h5>
                      <ul className="space-y-1 text-green-700 ml-4">
                        <li>• Implement core Technology Infrastructure components</li>
                        <li>• Roll out Organizational Process improvements</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-green-800 mb-2">Long-term (18+ months)</h5>
                      <ul className="space-y-1 text-green-700 ml-4">
                        <li>• Complete advanced Technology Infrastructure initiatives</li>
                        <li>• Measure and optimize all implemented changes</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
                  <h4 className="font-semibold text-amber-900 mb-3">Risk Considerations</h4>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Technology Infrastructure projects may require additional resources and expertise</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Change management will be critical for Organizational Process improvements</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Customer Experience changes should be tested with pilot groups first</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default AnalysisPhase;