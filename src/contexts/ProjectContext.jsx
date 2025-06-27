import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const ProjectContext = createContext();

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects must be used within a ProjectProvider');
  }
  return context;
};

export const ProjectProvider = ({ children }) => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadProjects();
    }
  }, [user]);

  const loadProjects = async () => {
    setLoading(true);
    // Simulate API call
    const mockProjects = [
      {
        id: '1',
        title: 'Digital Transformation Strategy',
        description: 'Mapping strategic priorities for digital transformation initiative',
        status: 'active',
        phase: 'rating',
        createdAt: '2024-01-15T00:00:00Z',
        participantCount: 12,
        statementCount: 45,
        focusQuestion: 'What are the key priorities for our digital transformation?'
      },
      {
        id: '2',
        title: 'Customer Experience Improvement',
        description: 'Identifying opportunities to enhance customer experience',
        status: 'completed',
        phase: 'analysis',
        createdAt: '2024-01-10T00:00:00Z',
        participantCount: 8,
        statementCount: 32,
        focusQuestion: 'How can we improve our customer experience?'
      }
    ];
    setProjects(mockProjects);
    setLoading(false);
  };

  const createProject = async (projectData) => {
    const newProject = {
      id: Math.random().toString(36).substr(2, 9),
      ...projectData,
      status: 'active',
      phase: 'brainstorming',
      createdAt: new Date().toISOString(),
      participantCount: 0,
      statementCount: 0
    };
    setProjects([...projects, newProject]);
    return newProject;
  };

  const updateProject = async (projectId, updates) => {
    const updatedProjects = projects.map(project =>
      project.id === projectId ? { ...project, ...updates } : project
    );
    setProjects(updatedProjects);
    
    if (currentProject && currentProject.id === projectId) {
      setCurrentProject({ ...currentProject, ...updates });
    }
  };

  const deleteProject = async (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
    if (currentProject && currentProject.id === projectId) {
      setCurrentProject(null);
    }
  };

  const getProject = (projectId) => {
    return projects.find(project => project.id === projectId);
  };

  const value = {
    projects,
    currentProject,
    setCurrentProject,
    loading,
    createProject,
    updateProject,
    deleteProject,
    getProject,
    loadProjects
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};