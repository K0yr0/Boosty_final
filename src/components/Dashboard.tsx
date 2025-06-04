import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Users, BookOpen, Brain, Target, Award, Menu, X } from 'lucide-react';
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
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  const handleNavigation = (pageId: ActivePage) => {
    setActivePage(pageId);
    setSidebarOpen(false); // Close mobile sidebar after navigation
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fff3e6]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#e0e0e0] px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile menu button */}
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              variant="ghost"
              size="sm"
              className="md:hidden mr-2"
            >
              <Menu className="w-5 h-5" />
            </Button>
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-[#8B4513] mr-2" />
            <h1 className="text-lg md:text-2xl font-bold text-[#2c2c2c]">Boosty</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-[#2c2c2c] font-medium text-sm md:text-base hidden sm:block">
              Welcome, {user?.name}!
            </span>
            <Button
              onClick={onLogout}
              variant="outline"
              size="sm"
              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white text-xs md:text-sm"
            >
              <LogOut className="w-3 h-3 md:w-4 md:h-4 mr-1" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 relative">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar Navigation */}
        <nav className={`
          fixed md:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-[#e0e0e0] p-4 
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block
          top-[65px] md:top-0
        `}>
          {/* Mobile close button */}
          <div className="flex justify-end md:hidden mb-4">
            <Button
              onClick={() => setSidebarOpen(false)}
              variant="ghost"
              size="sm"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors text-left ${
                    activePage === item.id
                      ? 'bg-[#8B4513] text-white'
                      : 'text-[#2c2c2c] hover:bg-[#fff3e6]'
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-3 md:p-6 overflow-x-hidden">
          {renderContent()}
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <nav className="md:hidden bg-white border-t border-[#e0e0e0] px-2 py-2 sticky bottom-0 z-40">
        <div className="flex justify-around">
          {navigationItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id)}
                className={`flex flex-col items-center px-2 py-1 rounded-lg transition-colors ${
                  activePage === item.id
                    ? 'text-[#8B4513]'
                    : 'text-[#666]'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs">{item.label.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </nav>
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
