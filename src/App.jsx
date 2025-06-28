import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LanguageProvider } from './contexts/LanguageContext';
import { AuthProvider } from './contexts/AuthContext';
import { SubscriptionProvider } from './contexts/SubscriptionContext';
import { ProjectProvider } from './contexts/ProjectContext';
import { TeamProvider } from './contexts/TeamContext';
import { AIProvider } from './contexts/AIContext';
import { AdminProvider } from './contexts/AdminContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import ProjectPage from './pages/ProjectPage';
import PricingPage from './pages/PricingPage';
import TeamsPage from './pages/TeamsPage';
import ReportsPage from './pages/ReportsPage';
import AdminPage from './pages/AdminPage';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SubscriptionProvider>
          <ProjectProvider>
            <TeamProvider>
              <AIProvider>
                <AdminProvider>
                  <Router>
                    <div className="min-h-screen bg-gray-50">
                      <Navbar />
                      <motion.main
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="pt-16"
                      >
                        <Routes>
                          <Route path="/" element={<HomePage />} />
                          <Route path="/login" element={<LoginPage />} />
                          <Route path="/signup" element={<SignupPage />} />
                          <Route path="/pricing" element={<PricingPage />} />
                          <Route
                            path="/dashboard"
                            element={
                              <ProtectedRoute>
                                <DashboardPage />
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
                            path="/admin"
                            element={
                              <ProtectedRoute>
                                <AdminPage />
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
                        </Routes>
                      </motion.main>
                      <Footer />
                    </div>
                  </Router>
                </AdminProvider>
              </AIProvider>
            </TeamProvider>
          </ProjectProvider>
        </SubscriptionProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;