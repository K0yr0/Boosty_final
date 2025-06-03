
import React, { useState } from 'react';
import LoginPage from '../components/LoginPage';
import Dashboard from '../components/Dashboard';
import ProfessorDashboard from '../components/ProfessorDashboard';
import DeanDashboard from '../components/DeanDashboard';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; role: 'student' | 'professor' | 'dean' } | null>(null);

  const handleLogin = (userData: { name: string; role: 'student' | 'professor' | 'dean' }) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-[#fff3e6]">
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : user?.role === 'professor' ? (
        <ProfessorDashboard user={user} onLogout={handleLogout} />
      ) : user?.role === 'dean' ? (
        <DeanDashboard user={user} onLogout={handleLogout} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
