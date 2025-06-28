import React from 'react';
import { motion } from 'framer-motion';
import { useTeam } from '../../contexts/TeamContext';
import SafeIcon from '../../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiUser, FiMoreVertical, FiTrash2, FiEdit3 } = FiIcons;

const TeamMembersList = ({ team, members }) => {
  const { removeMember, updateMemberRole } = useTeam();

  const handleRemoveMember = async (memberId) => {
    if (window.confirm('Are you sure you want to remove this member?')) {
      await removeMember(team.id, memberId);
    }
  };

  const handleRoleChange = async (memberId, newRole) => {
    await updateMemberRole(team.id, memberId, newRole);
  };

  const getRoleColor = (role, status) => {
    if (status === 'pending') return 'bg-yellow-100 text-yellow-800';
    
    switch (role) {
      case 'owner': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-md font-semibold text-gray-900">Team Members ({members.length})</h4>
      
      <div className="space-y-3">
        {members.map((member, index) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <SafeIcon icon={FiUser} className="w-5 h-5 text-primary-600" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(member.role, member.status)}`}>
                    {member.status === 'pending' ? 'Pending' : member.role}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{member.email}</p>
                <p className="text-xs text-gray-500">
                  Joined {new Date(member.joinedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            {(team.role === 'owner' || team.role === 'admin') && member.role !== 'owner' && (
              <div className="flex items-center space-x-2">
                {member.status === 'active' && (
                  <select
                    value={member.role}
                    onChange={(e) => handleRoleChange(member.id, e.target.value)}
                    className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-primary-500"
                  >
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                  </select>
                )}
                <button
                  onClick={() => handleRemoveMember(member.id)}
                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        ))}
        
        {members.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <SafeIcon icon={FiUser} className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No team members yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeamMembersList;