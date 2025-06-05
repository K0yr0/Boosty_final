
import React from 'react';
import { useAuth, AuthProvider } from '../hooks/useAuth';
import AuthenticatedLoginPage from '../components/AuthenticatedLoginPage';
import Dashboard from '../components/Dashboard';
import ProfessorDashboard from '../components/ProfessorDashboard';
import DeanDashboard from '../components/DeanDashboard';

const AuthenticatedIndexContent = () => {
  const { user, logout, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#fff3e6] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B4513] mx-auto mb-4"></div>
          <p className="text-[#2c2c2c]">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthenticatedLoginPage />;
  }

  const dashboardProps = {
    user,
    onLogout: logout
  };

  if (user.role === 'professor') {
    return <ProfessorDashboard {...dashboardProps} />;
  }

  if (user.role === 'dean') {
    return <DeanDashboard {...dashboardProps} />;
  }

  return <Dashboard {...dashboardProps} />;
};

const AuthenticatedIndex = () => {
  return (
    <div className="min-h-screen bg-[#fff3e6]">
      <AuthProvider>
        <AuthenticatedIndexContent />
      </AuthProvider>
    </div>
  );
};

export default AuthenticatedIndex;
