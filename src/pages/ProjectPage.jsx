import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProjects } from '../contexts/ProjectContext';
import BrainstormingPhase from '../components/gcm/BrainstormingPhase';
import StructuringPhase from '../components/gcm/StructuringPhase';
import RatingPhase from '../components/gcm/RatingPhase';
import AnalysisPhase from '../components/gcm/AnalysisPhase';
import ProjectHeader from '../components/projects/ProjectHeader';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProject, setCurrentProject, currentProject } = useProjects();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const project = getProject(id);
    if (project) {
      setCurrentProject(project);
      setLoading(false);
    } else {
      navigate('/dashboard');
    }
  }, [id, getProject, setCurrentProject, navigate]);

  if (loading || !currentProject) {
    return <LoadingSpinner size="xl" className="min-h-screen" />;
  }

  const renderPhaseComponent = () => {
    switch (currentProject.phase) {
      case 'brainstorming':
        return <BrainstormingPhase project={currentProject} />;
      case 'structuring':
        return <StructuringPhase project={currentProject} />;
      case 'rating':
        return <RatingPhase project={currentProject} />;
      case 'analysis':
        return <AnalysisPhase project={currentProject} />;
      default:
        return <BrainstormingPhase project={currentProject} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProjectHeader project={currentProject} />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
      >
        {renderPhaseComponent()}
      </motion.div>
    </div>
  );
};

export default ProjectPage;