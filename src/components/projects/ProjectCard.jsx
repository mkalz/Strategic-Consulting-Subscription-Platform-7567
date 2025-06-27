import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUsers, FiMessageSquare, FiCalendar, FiArrowRight } = FiIcons;

const ProjectCard = ({ project }) => {
  const getPhaseColor = (phase) => {
    switch (phase) {
      case 'brainstorming':
        return 'bg-blue-100 text-blue-800';
      case 'structuring':
        return 'bg-yellow-100 text-yellow-800';
      case 'rating':
        return 'bg-purple-100 text-purple-800';
      case 'analysis':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {project.description}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
          {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
        </span>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPhaseColor(project.phase)}`}>
          {project.phase.charAt(0).toUpperCase() + project.phase.slice(1)}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiUsers} className="w-4 h-4 mr-2" />
          <span>{project.participantCount} participants</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiMessageSquare} className="w-4 h-4 mr-2" />
          <span>{project.statementCount} statements</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <SafeIcon icon={FiCalendar} className="w-4 h-4 mr-2" />
          <span>Created {format(new Date(project.createdAt), 'MMM d, yyyy')}</span>
        </div>
      </div>

      <Link
        to={`/project/${project.id}`}
        className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
      >
        View Project
        <SafeIcon icon={FiArrowRight} className="w-4 h-4 ml-1" />
      </Link>
    </motion.div>
  );
};

export default ProjectCard;