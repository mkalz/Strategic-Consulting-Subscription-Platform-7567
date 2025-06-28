import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiEdit, FiTrash2, FiSave, FiX } = FiIcons;

const StatementManager = ({ projectId, onStatementsChange }) => {
  const { user } = useAuth();
  const [statements, setStatements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [newStatement, setNewStatement] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    if (projectId) {
      loadStatements();
      setupRealtime();
    }
  }, [projectId]);

  const setupRealtime = () => {
    const channel = supabase
      .channel(`statements-${projectId}`)
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'statements',
        filter: `project_id=eq.${projectId}`
      }, (payload) => {
        if (payload.eventType === 'INSERT') {
          setStatements(prev => [payload.new, ...prev]);
        } else if (payload.eventType === 'UPDATE') {
          setStatements(prev => 
            prev.map(stmt => stmt.id === payload.new.id ? payload.new : stmt)
          );
        } else if (payload.eventType === 'DELETE') {
          setStatements(prev => 
            prev.filter(stmt => stmt.id !== payload.old.id)
          );
        }
        onStatementsChange?.();
      })
      .subscribe();

    return () => supabase.removeChannel(channel);
  };

  const loadStatements = async () => {
    try {
      const { data, error } = await supabase
        .from('statements')
        .select(`
          *,
          author:user_profiles(name, email)
        `)
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setStatements(data || []);
    } catch (error) {
      console.error('Error loading statements:', error);
    } finally {
      setLoading(false);
    }
  };

  const createStatement = async () => {
    if (!newStatement.trim()) return;

    try {
      const { data, error } = await supabase
        .from('statements')
        .insert([
          {
            project_id: projectId,
            text: newStatement.trim(),
            author_id: user.id,
            source: 'manual'
          }
        ])
        .select(`
          *,
          author:user_profiles(name, email)
        `)
        .single();

      if (error) throw error;

      setNewStatement('');
      setIsAdding(false);
    } catch (error) {
      console.error('Error creating statement:', error);
    }
  };

  const updateStatement = async (id, text) => {
    try {
      const { error } = await supabase
        .from('statements')
        .update({ text: text.trim() })
        .eq('id', id);

      if (error) throw error;

      setEditingId(null);
    } catch (error) {
      console.error('Error updating statement:', error);
    }
  };

  const deleteStatement = async (id) => {
    if (!confirm('Are you sure you want to delete this statement?')) return;

    try {
      const { error } = await supabase
        .from('statements')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error) {
      console.error('Error deleting statement:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Add Statement */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Add Statement
        </h3>
        
        {!isAdding ? (
          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
          >
            <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
            Add Statement
          </button>
        ) : (
          <div className="space-y-4">
            <textarea
              value={newStatement}
              onChange={(e) => setNewStatement(e.target.value)}
              placeholder="Enter your statement..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              rows={3}
              autoFocus
            />
            <div className="flex space-x-3">
              <button
                onClick={createStatement}
                disabled={!newStatement.trim()}
                className="px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-medium transition-colors disabled:opacity-50"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4 mr-2" />
                Save
              </button>
              <button
                onClick={() => {
                  setIsAdding(false);
                  setNewStatement('');
                }}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Statements List */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            Statements ({statements.length})
          </h3>
        </div>

        <div className="divide-y divide-gray-200">
          <AnimatePresence>
            {statements.map((statement, index) => (
              <motion.div
                key={statement.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {editingId === statement.id ? (
                      <EditableStatement
                        statement={statement}
                        onSave={(text) => updateStatement(statement.id, text)}
                        onCancel={() => setEditingId(null)}
                      />
                    ) : (
                      <>
                        <p className="text-gray-900 mb-2">{statement.text}</p>
                        <div className="flex items-center text-sm text-gray-500 space-x-4">
                          <span>By {statement.author?.name || 'Unknown'}</span>
                          <span>•</span>
                          <span>{new Date(statement.created_at).toLocaleDateString()}</span>
                          {statement.source === 'ai_generated' && (
                            <>
                              <span>•</span>
                              <span className="text-purple-600">AI Generated</span>
                            </>
                          )}
                        </div>
                      </>
                    )}
                  </div>

                  {editingId !== statement.id && statement.author_id === user.id && (
                    <div className="ml-4 flex items-center space-x-2">
                      <button
                        onClick={() => setEditingId(statement.id)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <SafeIcon icon={FiEdit} className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteStatement(statement.id)}
                        className="p-1 text-gray-400 hover:text-red-500"
                      >
                        <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {statements.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              <p>No statements yet</p>
              <p className="text-sm">Add the first statement to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EditableStatement = ({ statement, onSave, onCancel }) => {
  const [text, setText] = useState(statement.text);

  const handleSave = () => {
    if (text.trim()) {
      onSave(text);
    }
  };

  return (
    <div className="space-y-3">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        rows={3}
        autoFocus
      />
      <div className="flex space-x-2">
        <button
          onClick={handleSave}
          className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm font-medium transition-colors"
        >
          <SafeIcon icon={FiSave} className="w-3 h-3 mr-1" />
          Save
        </button>
        <button
          onClick={onCancel}
          className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50 transition-colors"
        >
          <SafeIcon icon={FiX} className="w-3 h-3 mr-1" />
          Cancel
        </button>
      </div>
    </div>
  );
};

export default StatementManager;