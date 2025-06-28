import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiTrash2, FiEye, FiSave, FiBarChart3, FiPieChart, FiTrendingUp } = FiIcons;

const CustomReportBuilder = ({ project }) => {
  const [reportConfig, setReportConfig] = useState({
    title: '',
    description: '',
    sections: []
  });
  const [previewMode, setPreviewMode] = useState(false);

  const availableSections = [
    {
      id: 'executive_summary',
      name: 'Executive Summary',
      description: 'High-level overview and key findings',
      icon: FiBarChart3
    },
    {
      id: 'statements_overview',
      name: 'Statements Overview',
      description: 'Complete list of generated statements',
      icon: FiTrendingUp
    },
    {
      id: 'cluster_analysis',
      name: 'Cluster Analysis',
      description: 'Concept clusters and relationships',
      icon: FiPieChart
    },
    {
      id: 'priority_matrix',
      name: 'Priority Matrix',
      description: 'Importance vs feasibility analysis',
      icon: FiBarChart3
    },
    {
      id: 'recommendations',
      name: 'Recommendations',
      description: 'Strategic recommendations and next steps',
      icon: FiTrendingUp
    },
    {
      id: 'methodology',
      name: 'Methodology',
      description: 'Process and approach explanation',
      icon: FiBarChart3
    }
  ];

  const handleAddSection = (sectionId) => {
    const section = availableSections.find(s => s.id === sectionId);
    if (section && !reportConfig.sections.find(s => s.id === sectionId)) {
      setReportConfig(prev => ({
        ...prev,
        sections: [...prev.sections, {
          ...section,
          order: prev.sections.length,
          customTitle: section.name,
          includeCharts: true,
          includeData: true
        }]
      }));
    }
  };

  const handleRemoveSection = (sectionId) => {
    setReportConfig(prev => ({
      ...prev,
      sections: prev.sections.filter(s => s.id !== sectionId)
    }));
  };

  const handleSectionUpdate = (sectionId, updates) => {
    setReportConfig(prev => ({
      ...prev,
      sections: prev.sections.map(s => 
        s.id === sectionId ? { ...s, ...updates } : s
      )
    }));
  };

  const handleReorderSection = (sectionId, direction) => {
    setReportConfig(prev => {
      const sections = [...prev.sections];
      const currentIndex = sections.findIndex(s => s.id === sectionId);
      const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
      
      if (newIndex >= 0 && newIndex < sections.length) {
        [sections[currentIndex], sections[newIndex]] = [sections[newIndex], sections[currentIndex]];
      }
      
      return { ...prev, sections };
    });
  };

  const generateReport = () => {
    console.log('Generating custom report:', reportConfig);
    // In a real implementation, this would generate the actual report
    alert('Report generated successfully! (Demo)');
  };

  const saveTemplate = () => {
    console.log('Saving report template:', reportConfig);
    alert('Report template saved! (Demo)');
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Report Preview</h2>
          <div className="flex space-x-3">
            <button
              onClick={() => setPreviewMode(false)}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Edit Report
            </button>
            <button
              onClick={generateReport}
              className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
            >
              Generate Report
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {reportConfig.title || 'Custom Report'}
            </h1>
            {reportConfig.description && (
              <p className="text-gray-600">{reportConfig.description}</p>
            )}
            <div className="mt-4 text-sm text-gray-500">
              Project: {project.title} | Generated: {new Date().toLocaleDateString()}
            </div>
          </div>

          {reportConfig.sections.map((section, index) => (
            <div key={section.id} className="mb-8 pb-6 border-b border-gray-200 last:border-b-0">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                {section.customTitle}
              </h2>
              <div className="space-y-4">
                {renderSectionContent(section, project)}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Custom Report Builder</h2>
          <p className="text-gray-600 mt-1">Create customized reports for your project</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={saveTemplate}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
            Save Template
          </button>
          <button
            onClick={() => setPreviewMode(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg"
          >
            <SafeIcon icon={FiEye} className="w-4 h-4 mr-2" />
            Preview Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Report Configuration */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Information</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Report Title
                </label>
                <input
                  type="text"
                  value={reportConfig.title}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Enter report title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={reportConfig.description}
                  onChange={(e) => setReportConfig(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Describe the purpose of this report"
                />
              </div>
            </div>
          </div>

          {/* Report Sections */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Report Sections</h3>
            {reportConfig.sections.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <SafeIcon icon={FiBarChart3} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>No sections added yet</p>
                <p className="text-sm">Add sections from the panel on the right</p>
              </div>
            ) : (
              <div className="space-y-4">
                {reportConfig.sections.map((section, index) => (
                  <motion.div
                    key={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <SafeIcon icon={section.icon} className="w-5 h-5 text-primary-600" />
                        <input
                          type="text"
                          value={section.customTitle}
                          onChange={(e) => handleSectionUpdate(section.id, { customTitle: e.target.value })}
                          className="font-medium text-gray-900 bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-primary-500 focus:rounded px-2 py-1"
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleReorderSection(section.id, 'up')}
                          disabled={index === 0}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↑
                        </button>
                        <button
                          onClick={() => handleReorderSection(section.id, 'down')}
                          disabled={index === reportConfig.sections.length - 1}
                          className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                        >
                          ↓
                        </button>
                        <button
                          onClick={() => handleRemoveSection(section.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">{section.description}</p>
                    
                    <div className="flex items-center space-x-4 text-sm">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={section.includeCharts}
                          onChange={(e) => handleSectionUpdate(section.id, { includeCharts: e.target.checked })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">Include charts</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={section.includeData}
                          onChange={(e) => handleSectionUpdate(section.id, { includeData: e.target.checked })}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-gray-700">Include data tables</span>
                      </label>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Available Sections */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Sections</h3>
          <div className="space-y-3">
            {availableSections.map((section) => {
              const isAdded = reportConfig.sections.find(s => s.id === section.id);
              return (
                <div
                  key={section.id}
                  className={`border rounded-lg p-3 ${
                    isAdded ? 'border-green-200 bg-green-50' : 'border-gray-200 hover:border-primary-300'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <SafeIcon icon={section.icon} className="w-4 h-4 text-gray-600" />
                        <span className="font-medium text-gray-900 text-sm">{section.name}</span>
                      </div>
                      <p className="text-xs text-gray-600">{section.description}</p>
                    </div>
                    <button
                      onClick={() => handleAddSection(section.id)}
                      disabled={isAdded}
                      className={`ml-2 p-1 rounded ${
                        isAdded
                          ? 'text-green-600 cursor-not-allowed'
                          : 'text-gray-400 hover:text-primary-600'
                      }`}
                    >
                      <SafeIcon icon={isAdded ? FiBarChart3 : FiPlus} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

const renderSectionContent = (section, project) => {
  switch (section.id) {
    case 'executive_summary':
      return (
        <div className="prose max-w-none">
          <p>This Group Concept Mapping project focused on "{project.focusQuestion}" and involved {project.participantCount} participants who generated {project.statementCount} unique statements.</p>
          <p>Key findings indicate that Technology Infrastructure and Customer Experience emerged as primary focus areas, with varying levels of importance and feasibility ratings across different concepts.</p>
        </div>
      );
    
    case 'statements_overview':
      return (
        <div>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-medium text-gray-900 mb-2">Statement Summary</h4>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Total Statements:</span>
                <span className="ml-2 font-medium">{project.statementCount}</span>
              </div>
              <div>
                <span className="text-gray-600">Participants:</span>
                <span className="ml-2 font-medium">{project.participantCount}</span>
              </div>
              <div>
                <span className="text-gray-600">Clusters:</span>
                <span className="ml-2 font-medium">3</span>
              </div>
            </div>
          </div>
          {section.includeData && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statement</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cluster</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Importance</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Feasibility</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Implement cloud-based infrastructure</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Technology Infrastructure</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.2</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3.8</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Develop mobile-first customer experience</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Customer Experience</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">4.0</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      );

    case 'recommendations':
      return (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-medium text-green-900 mb-2">Immediate Actions (0-6 months)</h4>
            <ul className="list-disc list-inside text-green-800 space-y-1">
              <li>Start Customer Experience initiatives as quick wins</li>
              <li>Begin planning for Technology Infrastructure projects</li>
            </ul>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-900 mb-2">Medium-term Goals (6-18 months)</h4>
            <ul className="list-disc list-inside text-blue-800 space-y-1">
              <li>Implement core Technology Infrastructure components</li>
              <li>Roll out Organizational Process improvements</li>
            </ul>
          </div>
        </div>
      );

    default:
      return (
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-600">Content for {section.name} section would be displayed here.</p>
        </div>
      );
  }
};

export default CustomReportBuilder;