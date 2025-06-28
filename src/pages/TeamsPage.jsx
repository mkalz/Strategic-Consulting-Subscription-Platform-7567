import React from 'react';
import { motion } from 'framer-motion';
import TeamManagement from '../components/teams/TeamManagement';

const TeamsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <TeamManagement />
        </motion.div>
      </div>
    </div>
  );
};

export default TeamsPage;