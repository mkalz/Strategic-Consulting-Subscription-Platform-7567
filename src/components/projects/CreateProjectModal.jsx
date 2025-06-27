import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../../contexts/ProjectContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiX, FiFolder } = FiIcons;

const CreateProjectModal = ({ isOpen, onClose }) => {
  const { createProject } = useProjects();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    focusQuestion: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createProject(formData);
      setFormData({ title: '', description: '', focusQuestion: '' });
      onClose();
    } catch (error) {
      console.error('Error creating project:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setFormData({ title: '', description: '', focusQuestion: '' });
    onClose();
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
              onClick={handleClose}
            />

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center mr-3">
                    <SafeIcon icon={FiFolder} className="w-5 h-5 text-primary-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    Create New Project
                  </h3>
                </div>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <SafeIcon icon={FiX} className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Enter project title"
                  />
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    id="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Describe your project goals and context"
                  />
                </div>

                <div>
                  <label htmlFor="focusQuestion" className="block text-sm font-medium text-gray-700 mb-2">
                    Focus Question *
                  </label>
                  <textarea
                    name="focusQuestion"
                    id="focusQuestion"
                    rows={2}
                    required
                    value={formData.focusQuestion}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                    placeholder="What specific question will guide your concept mapping session?"
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    This question will guide participants during brainstorming
                  </p>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating...' : 'Create Project'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CreateProjectModal;