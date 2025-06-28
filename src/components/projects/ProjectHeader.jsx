import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DataExportModal from '../export/DataExportModal';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiArrowLeft, FiUsers, FiMessageSquare, FiSettings, FiDownload } = FiIcons;

const ProjectHeader = ({ project }) => {
  const [showExportModal, setShowExportModal] = useState(false);

  const phases = [
    { key: 'brainstorming', label: 'Brainstorming', description: 'Generate ideas' },
    { key: 'structuring', label: 'Structuring', description: 'Group concepts' },
    { key: 'rating', label: 'Rating', description: 'Prioritize ideas' },
    { key: 'analysis', label: 'Analysis', description: 'Generate insights' }
  ];

  const currentPhaseIndex = phases.findIndex(p => p.key === project.phase);

  return (
    <>
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="py-4">
            <Link
              to="/dashboard"
              className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700"
            >
              <SafeIcon icon={FiArrowLeft} className="w-4 h-4 mr-1" />
              Back to Dashboard
            </Link>
          </div>

          {/* Project Info */}
          <div className="py-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                  {project.title}
                </h1>
                {project.description && (
                  <p className="mt-1 text-gray-600">
                    {project.description}
                  </p>
                )}
                <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
                  <div className="flex items-center">
                    <SafeIcon icon={FiUsers} className="w-4 h-4 mr-1" />
                    <span>{project.participantCount} participants</span>
                  </div>
                  <div className="flex items-center">
                    <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-1" />
                    <span>{project.statementCount} statements</span>
                  </div>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 lg:ml-4 flex space-x-3">
                <button
                  onClick={() => setShowExportModal(true)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <SafeIcon icon={FiDownload} className="w-4 h-4 mr-2" />
                  Export Data
                </button>
                <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                  <SafeIcon icon={FiSettings} className="w-4 h-4 mr-2" />
                  Project Settings
                </button>
              </div>
            </div>
          </div>

          {/* Phase Progress */}
          <div className="pb-6">
            <div className="flex items-center space-x-8 overflow-x-auto">
              {phases.map((phase, index) => (
                <div key={phase.key} className="flex items-center flex-shrink-0">
                  <div className="flex items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        index <= currentPhaseIndex
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </div>
                    <div className="ml-3">
                      <p
                        className={`text-sm font-medium ${
                          index <= currentPhaseIndex ? 'text-primary-600' : 'text-gray-500'
                        }`}
                      >
                        {phase.label}
                      </p>
                      <p className="text-xs text-gray-500">{phase.description}</p>
                    </div>
                  </div>
                  {index < phases.length - 1 && (
                    <div
                      className={`ml-8 w-16 h-0.5 ${
                        index < currentPhaseIndex ? 'bg-primary-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <DataExportModal
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        project={project}
      />
    </>
  );
};

export default ProjectHeader;