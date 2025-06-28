import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '../lib/supabase';

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
    if (user?.id) {
      loadProjects();
    } else {
      setProjects([]);
      setCurrentProject(null);
    }
  }, [user?.id]);

  const formatProject = (project) => ({
    ...project,
    participantCount: project.participant_count || 1,
    statementCount: project.statement_count || 0,
    focusQuestion: project.focus_question,
    createdAt: project.created_at,
    updatedAt: project.updated_at
  });

  const loadProjects = async () => {
    if (!user?.id) return;

    try {
      setLoading(true);
      console.log('Loading projects for user:', user.id);

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('owner_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error loading projects:', error);
        throw error;
      }

      console.log('Loaded projects:', data);
      const formattedProjects = data?.map(formatProject) || [];
      setProjects(formattedProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  const createProject = async (projectData) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      console.log('Creating project with data:', projectData);

      const projectPayload = {
        title: projectData.title.trim(),
        description: projectData.description?.trim() || null,
        focus_question: projectData.focusQuestion.trim(),
        owner_id: user.id,
        status: 'active',
        phase: 'brainstorming',
        participant_count: 1,
        statement_count: 0
      };

      console.log('Sending to Supabase:', projectPayload);

      const { data, error } = await supabase
        .from('projects')
        .insert([projectPayload])
        .select()
        .single();

      if (error) {
        console.error('Supabase error:', error);
        throw new Error(error.message || 'Failed to create project');
      }

      console.log('Project created successfully:', data);
      const formattedProject = formatProject(data);

      // Update local state immediately
      setProjects(prev => [formattedProject, ...prev]);

      return formattedProject;
    } catch (error) {
      console.error('Error creating project:', error);
      throw new Error(error.message || 'Failed to create project');
    }
  };

  const updateProject = async (projectId, updates) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const dbUpdates = {};
      // Map frontend field names to database field names
      if (updates.title !== undefined) dbUpdates.title = updates.title;
      if (updates.description !== undefined) dbUpdates.description = updates.description;
      if (updates.focusQuestion !== undefined) dbUpdates.focus_question = updates.focusQuestion;
      if (updates.status !== undefined) dbUpdates.status = updates.status;
      if (updates.phase !== undefined) dbUpdates.phase = updates.phase;
      if (updates.participantCount !== undefined) dbUpdates.participant_count = updates.participantCount;
      if (updates.statementCount !== undefined) dbUpdates.statement_count = updates.statementCount;

      const { data, error } = await supabase
        .from('projects')
        .update(dbUpdates)
        .eq('id', projectId)
        .eq('owner_id', user.id)
        .select()
        .single();

      if (error) throw error;

      const formattedProject = formatProject(data);
      setProjects(prev => prev.map(project => 
        project.id === projectId ? formattedProject : project
      ));

      if (currentProject?.id === projectId) {
        setCurrentProject(formattedProject);
      }

      return formattedProject;
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  };

  const deleteProject = async (projectId) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }

      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId)
        .eq('owner_id', user.id);

      if (error) throw error;

      setProjects(prev => prev.filter(project => project.id !== projectId));

      if (currentProject?.id === projectId) {
        setCurrentProject(null);
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  };

  const getProject = async (projectId) => {
    try {
      // First check if we have it in memory
      const existingProject = projects.find(p => p.id === projectId);
      if (existingProject) {
        return existingProject;
      }

      // Otherwise fetch from database
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (error) throw error;

      const formattedProject = formatProject(data);
      return formattedProject;
    } catch (error) {
      console.error('Error getting project:', error);
      return null;
    }
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