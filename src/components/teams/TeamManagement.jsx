import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../contexts/TeamContext';
import CreateTeamModal from './CreateTeamModal';
import InviteMemberModal from './InviteMemberModal';
import TeamMembersList from './TeamMembersList';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiPlus, FiUsers, FiSettings, FiUserPlus } = FiIcons;

const TeamManagement = () => {
  const { teams, teamMembers, loading } = useTeam();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
          <p className="text-gray-600 mt-1">Manage your teams and collaborate on projects</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
        >
          <SafeIcon icon={FiPlus} className="w-4 h-4 mr-2" />
          Create Team
        </button>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => setSelectedTeam(team)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                <SafeIcon icon={FiUsers} className="w-6 h-6 text-primary-600" />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                team.role === 'owner' ? 'bg-purple-100 text-purple-800' :
                team.role === 'admin' ? 'bg-blue-100 text-blue-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {team.role}
              </span>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-2">{team.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{team.description}</p>
            
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{team.memberCount} members</span>
              <span>{new Date(team.createdAt).toLocaleDateString()}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Team Details Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setSelectedTeam(null)} />
            
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full"
            >
              <div className="bg-white px-6 pt-6 pb-4">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{selectedTeam.name}</h3>
                    <p className="text-gray-600">{selectedTeam.description}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setShowInviteModal(true)}
                      className="inline-flex items-center px-3 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md text-sm font-medium transition-colors"
                    >
                      <SafeIcon icon={FiUserPlus} className="w-4 h-4 mr-2" />
                      Invite Member
                    </button>
                    <button className="p-2 text-gray-400 hover:text-gray-500">
                      <SafeIcon icon={FiSettings} className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <TeamMembersList 
                  team={selectedTeam} 
                  members={teamMembers[selectedTeam.id] || []} 
                />
              </div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateTeamModal 
        isOpen={showCreateModal} 
        onClose={() => setShowCreateModal(false)} 
      />
      
      <InviteMemberModal 
        isOpen={showInviteModal} 
        onClose={() => setShowInviteModal(false)}
        team={selectedTeam}
      />
    </div>
  );
};

export default TeamManagement;