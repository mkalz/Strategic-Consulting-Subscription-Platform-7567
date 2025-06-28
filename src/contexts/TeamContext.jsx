import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const TeamContext = createContext();

export const useTeam = () => {
  const context = useContext(TeamContext);
  if (!context) {
    throw new Error('useTeam must be used within a TeamProvider');
  }
  return context;
};

export const TeamProvider = ({ children }) => {
  const { user } = useAuth();
  const [teams, setTeams] = useState([]);
  const [teamMembers, setTeamMembers] = useState({});
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadTeams();
      loadInvitations();
    }
  }, [user]);

  const loadTeams = async () => {
    setLoading(true);
    // Simulate API call with mock data
    const mockTeams = [
      {
        id: 'team_1',
        name: 'Strategic Consulting Team',
        description: 'Main consulting team for strategic projects',
        role: 'owner',
        memberCount: 8,
        createdAt: '2024-01-10T00:00:00Z',
        settings: {
          allowMemberInvites: true,
          defaultProjectAccess: 'editor'
        }
      },
      {
        id: 'team_2',
        name: 'Enterprise Solutions',
        description: 'Team focused on enterprise client solutions',
        role: 'admin',
        memberCount: 5,
        createdAt: '2024-01-15T00:00:00Z',
        settings: {
          allowMemberInvites: false,
          defaultProjectAccess: 'viewer'
        }
      }
    ];

    const mockMembers = {
      team_1: [
        {
          id: 'member_1',
          name: 'John Smith',
          email: 'john@company.com',
          role: 'admin',
          joinedAt: '2024-01-10T00:00:00Z',
          status: 'active'
        },
        {
          id: 'member_2',
          name: 'Sarah Johnson',
          email: 'sarah@company.com',
          role: 'member',
          joinedAt: '2024-01-12T00:00:00Z',
          status: 'active'
        },
        {
          id: 'member_3',
          name: 'Mike Wilson',
          email: 'mike@company.com',
          role: 'member',
          joinedAt: '2024-01-14T00:00:00Z',
          status: 'pending'
        }
      ],
      team_2: [
        {
          id: 'member_4',
          name: 'Emily Davis',
          email: 'emily@company.com',
          role: 'admin',
          joinedAt: '2024-01-15T00:00:00Z',
          status: 'active'
        },
        {
          id: 'member_5',
          name: 'David Brown',
          email: 'david@company.com',
          role: 'member',
          joinedAt: '2024-01-16T00:00:00Z',
          status: 'active'
        }
      ]
    };

    setTeams(mockTeams);
    setTeamMembers(mockMembers);
    setLoading(false);
  };

  const loadInvitations = async () => {
    const mockInvitations = [
      {
        id: 'inv_1',
        teamId: 'team_1',
        teamName: 'Strategic Consulting Team',
        email: 'newmember@company.com',
        role: 'member',
        status: 'pending',
        invitedBy: 'John Smith',
        createdAt: '2024-01-20T00:00:00Z',
        expiresAt: '2024-01-27T00:00:00Z'
      }
    ];
    setInvitations(mockInvitations);
  };

  const createTeam = async (teamData) => {
    const newTeam = {
      id: `team_${Date.now()}`,
      ...teamData,
      role: 'owner',
      memberCount: 1,
      createdAt: new Date().toISOString(),
      settings: {
        allowMemberInvites: true,
        defaultProjectAccess: 'editor'
      }
    };
    
    setTeams([...teams, newTeam]);
    setTeamMembers({
      ...teamMembers,
      [newTeam.id]: [{
        id: user.id,
        name: user.name,
        email: user.email,
        role: 'owner',
        joinedAt: new Date().toISOString(),
        status: 'active'
      }]
    });
    
    return newTeam;
  };

  const inviteMember = async (teamId, email, role = 'member') => {
    const invitation = {
      id: `inv_${Date.now()}`,
      teamId,
      teamName: teams.find(t => t.id === teamId)?.name,
      email,
      role,
      status: 'pending',
      invitedBy: user.name,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    };
    
    setInvitations([...invitations, invitation]);
    return invitation;
  };

  const removeMember = async (teamId, memberId) => {
    const updatedMembers = teamMembers[teamId]?.filter(m => m.id !== memberId) || [];
    setTeamMembers({
      ...teamMembers,
      [teamId]: updatedMembers
    });
    
    // Update team member count
    setTeams(teams.map(team => 
      team.id === teamId 
        ? { ...team, memberCount: updatedMembers.length }
        : team
    ));
  };

  const updateMemberRole = async (teamId, memberId, newRole) => {
    const updatedMembers = teamMembers[teamId]?.map(member =>
      member.id === memberId ? { ...member, role: newRole } : member
    ) || [];
    
    setTeamMembers({
      ...teamMembers,
      [teamId]: updatedMembers
    });
  };

  const updateTeamSettings = async (teamId, settings) => {
    setTeams(teams.map(team =>
      team.id === teamId
        ? { ...team, settings: { ...team.settings, ...settings } }
        : team
    ));
  };

  const value = {
    teams,
    teamMembers,
    invitations,
    loading,
    createTeam,
    inviteMember,
    removeMember,
    updateMemberRole,
    updateTeamSettings,
    loadTeams
  };

  return (
    <TeamContext.Provider value={value}>
      {children}
    </TeamContext.Provider>
  );
};