import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../contexts/ProjectContext';
import CustomReportBuilder from '../components/reports/CustomReportBuilder';
import DataExportModal from '../components/export/DataExportModal';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiFileText, FiDownload, FiBarChart3, FiPlus } = FiIcons;

const ReportsPage = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeTab, setActiveTab] = useState('builder');
  const [showExportModal, setShowExportModal] = useState(false);

  const completedProjects = projects.filter(p => p.status === 'completed' || p.phase === 'analysis');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
              <p className="text-gray-600 mt-1">Generate custom reports and export project data</p>
            </div>
          </div>

          {/* Project Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Select Project</h2>
            {completedProjects.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <SafeIcon icon={FiBarChart3} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No completed projects available for reporting</p>
                <p className="text-sm">Complete a project to generate reports</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {completedProjects.map((project) => (
                  <motion.button
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    whileHover={{ scale: 1.02 }}
                    className={`p-4 border rounded-lg text-left transition-colors ${
                      selectedProject?.id === project.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-medium text-gray-900 line-clamp-2">{project.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        project.phase === 'analysis' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {project.phase === 'analysis' ? 'Analyzed' : 'Completed'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{project.participantCount} participants</span>
                      <span>{project.statementCount} statements</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* Report Tools */}
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              {/* Tabs */}
              <div className="bg-white rounded-lg shadow-sm border">
                <div className="border-b border-gray-200">
                  <nav className="flex space-x-8 px-6">
                    <button
                      onClick={() => setActiveTab('builder')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === 'builder'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                      Custom Report Builder
                    </button>
                    <button
                      onClick={() => setActiveTab('export')}
                      className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === 'export'
                          ? 'border-primary-500 text-primary-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                      Data Export
                    </button>
                  </nav>
                </div>

                <div className="p-6">
                  {activeTab === 'builder' && (
                    <CustomReportBuilder project={selectedProject} />
                  )}
                  
                  {activeTab === 'export' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Project Data</h3>
                        <p className="text-gray-600 mb-6">
                          Export your project data in various formats for further analysis or sharing.
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                          { format: 'PDF', desc: 'Formatted report', color: 'red', icon: FiFileText },
                          { format: 'CSV', desc: 'Raw data', color: 'green', icon: FiDownload },
                          { format: 'PowerPoint', desc: 'Presentation', color: 'orange', icon: FiBarChart3 },
                          { format: 'JSON', desc: 'Structured data', color: 'blue', icon: FiDownload }
                        ].map((option) => (
                          <motion.button
                            key={option.format}
                            onClick={() => setShowExportModal(true)}
                            whileHover={{ scale: 1.02 }}
                            className="p-4 border border-gray-200 rounded-lg hover:border-gray-300 text-left"
                          >
                            <div className="flex items-center space-x-3 mb-2">
                              <SafeIcon icon={option.icon} className={`w-6 h-6 text-${option.color}-600`} />
                              <span className="font-medium text-gray-900">{option.format}</span>
                            </div>
                            <p className="text-sm text-gray-600">{option.desc}</p>
                          </motion.button>
                        ))}
                      </div>

                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-medium text-gray-900 mb-4">Quick Export</h4>
                        <div className="flex flex-wrap gap-3">
                          <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm font-medium transition-colors"
                          >
                            <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                            Export All Data
                          </button>
                          <button
                            onClick={() => setShowExportModal(true)}
                            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50"
                          >
                            <SafeIcon icon={FiFileText} className="w-4 h-4 mr-2" />
                            Generate PDF Report
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Export Modal */}
        <DataExportModal
          isOpen={showExportModal}
          onClose={() => setShowExportModal(false)}
          project={selectedProject}
        />
      </div>
    </div>
  );
};

export default ReportsPage;