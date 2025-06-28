import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';

// Context Providers
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { AIProvider } from './contexts/AIContext';
import { AdminProvider } from './contexts/AdminContext';
import { TeamProvider } from './contexts/TeamContext';

// Layout
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Pages
import HomePage from './pages/HomePage';
import PricingPage from './pages/PricingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import TeamsPage from './pages/TeamsPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import AdminPage from './pages/AdminPage';

// Components
import ProtectedRoute from './components/auth/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <SubscriptionProvider>
            <AIProvider>
              <AdminProvider>
                <TeamProvider>
                  <ProjectProvider>
                    <div className="min-h-screen bg-gray-50 flex flex-col">
                      <Navbar />
                      <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="flex-1"
                      >
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/pricing" element={<PricingPage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute>
                                <DashboardPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/project/:id"
                            element={
                              <ProtectedRoute>
                                <ProjectPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/teams"
                            element={
                              <ProtectedRoute>
                                <TeamsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/reports"
                            element={
                              <ProtectedRoute>
                                <ReportsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/settings"
                            element={
                              <ProtectedRoute>
                                <SettingsPage />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/admin"
                            element={
                              <ProtectedRoute>
                                <AdminPage />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>
                      </motion.main>
                      <Footer />
                    </div>
                  </ProjectProvider>
                </TeamProvider>
              </AdminProvider>
            </AIProvider>
          </SubscriptionProvider>
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;