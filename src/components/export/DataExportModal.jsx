import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiDownload, FiFileText, FiImage, FiDatabase } = FiIcons;

const DataExportModal = ({ isOpen, onClose, project }) => {
  const [exportFormat, setExportFormat] = useState('pdf');
  const [exportOptions, setExportOptions] = useState({
    includeStatements: true,
    includeClusters: true,
    includeRatings: true,
    includeAnalysis: true,
    includeCharts: true
  });
  const [loading, setLoading] = useState(false);

  const exportFormats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Complete formatted report',
      icon: FiFileText,
      color: 'text-red-600'
    },
    {
      id: 'csv',
      name: 'CSV Data',
      description: 'Raw data for analysis',
      icon: FiDatabase,
      color: 'text-green-600'
    },
    {
      id: 'powerpoint',
      name: 'PowerPoint',
      description: 'Presentation ready slides',
      icon: FiImage,
      color: 'text-orange-600'
    },
    {
      id: 'json',
      name: 'JSON Export',
      description: 'Structured data format',
      icon: FiDatabase,
      color: 'text-blue-600'
    }
  ];

  const handleExport = async () => {
    setLoading(true);
    
    try {
      // Simulate export process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data based on format
      const exportData = generateExportData(exportFormat, exportOptions, project);
      
      // Create and download file
      downloadFile(exportData, exportFormat, project.title);
      
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateExportData = (format, options, project) => {
    const data = {
      project: {
        title: project.title,
        description: project.description,
        focusQuestion: project.focusQuestion,
        phase: project.phase,
        exportDate: new Date().toISOString()
      },
      statements: options.includeStatements ? [
        { id: 1, text: 'Implement cloud-based infrastructure for better scalability', cluster: 'Technology Infrastructure' },
        { id: 2, text: 'Develop mobile-first customer experience strategy', cluster: 'Customer Experience' },
        { id: 3, text: 'Create unified data analytics platform across departments', cluster: 'Technology Infrastructure' }
      ] : [],
      clusters: options.includeClusters ? [
        { id: 1, name: 'Technology Infrastructure', statementCount: 2 },
        { id: 2, name: 'Customer Experience', statementCount: 1 }
      ] : [],
      ratings: options.includeRatings ? [
        { statementId: 1, importance: 4.2, feasibility: 3.8 },
        { statementId: 2, importance: 4.1, feasibility: 4.0 },
        { statementId: 3, importance: 4.5, feasibility: 3.2 }
      ] : [],
      analysis: options.includeAnalysis ? {
        summary: 'Technology Infrastructure emerges as highest priority area',
        recommendations: ['Focus on Customer Experience as quick wins', 'Plan Technology Infrastructure for medium-term']
      } : null
    };

    return data;
  };

  const downloadFile = (data, format, projectTitle) => {
    let content, mimeType, filename;
    
    switch (format) {
      case 'csv':
        content = convertToCSV(data);
        mimeType = 'text/csv';
        filename = `${projectTitle.replace(/\s+/g, '_')}_export.csv`;
        break;
      case 'json':
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `${projectTitle.replace(/\s+/g, '_')}_export.json`;
        break;
      case 'pdf':
        // For PDF, we'd typically use a library like jsPDF
        content = generatePDFContent(data);
        mimeType = 'text/plain'; // Simplified for demo
        filename = `${projectTitle.replace(/\s+/g, '_')}_report.txt`;
        break;
      default:
        content = JSON.stringify(data, null, 2);
        mimeType = 'application/json';
        filename = `${projectTitle.replace(/\s+/g, '_')}_export.json`;
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    const statements = data.statements || [];
    const ratings = data.ratings || [];
    
    const csvRows = [
      ['Statement ID', 'Statement Text', 'Cluster', 'Importance', 'Feasibility'].join(',')
    ];
    
    statements.forEach(statement => {
      const rating = ratings.find(r => r.statementId === statement.id);
      csvRows.push([
        statement.id,
        `"${statement.text}"`,
        `"${statement.cluster}"`,
        rating?.importance || '',
        rating?.feasibility || ''
      ].join(','));
    });
    
    return csvRows.join('\n');
  };

  const generatePDFContent = (data) => {
    return `
GCM PROJECT REPORT
==================

Project: ${data.project.title}
Description: ${data.project.description}
Focus Question: ${data.project.focusQuestion}
Export Date: ${new Date(data.project.exportDate).toLocaleDateString()}

STATEMENTS
----------
${data.statements.map(s => `${s.id}. ${s.text} (${s.cluster})`).join('\n')}

ANALYSIS
--------
${data.analysis?.summary || 'No analysis available'}

RECOMMENDATIONS
--------------
${data.analysis?.recommendations?.map(r => `• ${r}`).join('\n') || 'No recommendations available'}
    `.trim();
  };

  const handleOptionChange = (option) => {
    setExportOptions(prev => ({
      ...prev,
      [option]: !prev[option]
    }));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              onClick={onClose}
            />
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full sm:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <SafeIcon icon={FiDownload} className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Export Data</h3>
                    <p className="text-sm text-gray-600">{project?.title}</p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Export Format Selection */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Export Format</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {exportFormats.map((format) => (
                      <button
                        key={format.id}
                        onClick={() => setExportFormat(format.id)}
                        className={`p-3 border rounded-lg text-left transition-colors ${
                          exportFormat === format.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-2 mb-2">
                          <SafeIcon icon={format.icon} className={`w-5 h-5 ${format.color}`} />
                          <span className="font-medium text-gray-900">{format.name}</span>
                        </div>
                        <p className="text-xs text-gray-600">{format.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Export Options */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Include in Export</h4>
                  <div className="space-y-2">
                    {Object.entries(exportOptions).map(([key, value]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => handleOptionChange(key)}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Export Preview */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-2">Export Preview</h4>
                  <div className="text-sm text-gray-600">
                    <p>Format: <span className="font-medium">{exportFormats.find(f => f.id === exportFormat)?.name}</span></p>
                    <p>Items to include: <span className="font-medium">{Object.values(exportOptions).filter(Boolean).length}</span> sections</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  disabled={loading}
                  className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Exporting...
                    </>
                  ) : (
                    <>
                      <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                      Export Data
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DataExportModal;