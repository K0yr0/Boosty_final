import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Users, BookOpen, Brain, Target, Award } from 'lucide-react';
import LecturePulse from './LecturePulse';
import AINotesPage from './AINotesPage';
import StudySquads from './StudySquads';
import WeeklyQuiz from './WeeklyQuiz';
import ProjectMatching from './ProjectMatching';

interface DashboardProps {
  user: { name: string; role: string } | null;
  onLogout: () => void;
}

type ActivePage = 'home' | 'pulse' | 'notes' | 'squads' | 'quiz' | 'matching';

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  const navigationItems = [
    { id: 'home' as ActivePage, label: 'Home', icon: Home },
    { id: 'pulse' as ActivePage, label: 'Lecture Pulse', icon: Target },
    { id: 'notes' as ActivePage, label: 'AI Notes', icon: Brain },
    { id: 'squads' as ActivePage, label: 'Study Squads', icon: Users },
    { id: 'quiz' as ActivePage, label: 'Weekly Quiz', icon: Award },
    { id: 'matching' as ActivePage, label: 'Project Match', icon: BookOpen },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'pulse':
        return <LecturePulse userRole="student" />;
      case 'notes':
        return <AINotesPage />;
      case 'squads':
        return <StudySquads />;
      case 'quiz':
        return <WeeklyQuiz />;
      case 'matching':
        return <ProjectMatching />;
      default:
        return <HomePage userName={user?.name || 'Student'} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#e0e0e0] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-[#8B4513] mr-2" />
            <h1 className="text-2xl font-bold text-[#2c2c2c]">Boosty</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#2c2c2c] font-medium">Welcome, {user?.name}!</span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
            >
              <LogOut className="w-4 h-4 mr-1" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar Navigation */}
        <nav className="w-64 bg-white border-r border-[#e0e0e0] p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActivePage(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-[#8B4513] text-white'
                      : 'text-[#2c2c2c] hover:bg-[#fff3e6]'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6 bg-[#fff3e6]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

const HomePage: React.FC<{ userName: string }> = ({ userName }) => {
  const features = [
    {
      title: 'Lecture Pulse',
      description: 'Real-time class feedback with live confusion tracking',
      icon: Target,
      color: 'bg-red-100 text-red-600',
    },
    {
      title: 'AI Notes',
      description: 'Automated lecture notes with AI-generated highlights',
      icon: Brain,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      title: 'Silent Study Squads',
      description: 'Focus groups with progress tracking and Pomodoro battles',
      icon: Users,
      color: 'bg-green-100 text-green-600',
    },
    {
      title: 'Weekly Quiz',
      description: 'Auto-generated quizzes targeting your weak points',
      icon: Award,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      title: 'Project Matching',
      description: 'Smart team formation based on skills and performance',
      icon: BookOpen,
      color: 'bg-orange-100 text-orange-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2c2c2c] mb-2">
          Welcome back, {userName}!
        </h2>
        <p className="text-[#666] text-lg">
          Your ultimate university learning companion
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="p-6 bg-white hover:shadow-lg transition-shadow cursor-pointer">
              <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-[#2c2c2c] mb-2">
                {feature.title}
              </h3>
              <p className="text-[#666]">
                {feature.description}
              </p>
            </Card>
          );
        })}
      </div>

      <div className="bg-white rounded-lg p-6 mt-8">
        <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Quick Stats</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">85%</div>
            <div className="text-[#666]">Average Quiz Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">12</div>
            <div className="text-[#666]">Study Hours This Week</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">5</div>
            <div className="text-[#666]">Active Study Squads</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">3</div>
            <div className="text-[#666]">Project Matches</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
