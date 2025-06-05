
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Users, BookOpen, Brain, Target, FileText, Menu, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import LecturePulse from './LecturePulse';
import StudentProfiles from './StudentProfiles';
import NotesAndMaterials from './NotesAndMaterials';
import QuestionsAndAnswers from './QuestionsAndAnswers';

interface ProfessorDashboardProps {
  user: { name: string; role: string } | null;
  onLogout: () => void;
}

type ActivePage = 'home' | 'pulse' | 'students' | 'notes' | 'qa';

const ProfessorDashboard: React.FC<ProfessorDashboardProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'home' as ActivePage, label: 'Home', icon: Home },
    { id: 'pulse' as ActivePage, label: 'Lecture Pulse', icon: Target },
    { id: 'students' as ActivePage, label: 'Student Profiles', icon: Users },
    { id: 'notes' as ActivePage, label: 'Notes & Materials', icon: FileText },
    { id: 'qa' as ActivePage, label: 'Q&A', icon: Brain },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'pulse':
        return <LecturePulse userRole="professor" />;
      case 'students':
        return <StudentProfiles />;
      case 'notes':
        return <NotesAndMaterials />;
      case 'qa':
        return <QuestionsAndAnswers />;
      default:
        return <ProfessorHomePage userName={user?.name || 'Professor'} />;
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
            <h1 className="text-lg md:text-2xl font-bold text-[#2c2c2c]">Boosty - Professor</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <span className="text-[#2c2c2c] font-medium text-sm md:text-base hidden sm:block">
              Welcome, Prof. {user?.name}!
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

const ProfessorHomePage: React.FC<{ userName: string }> = ({ userName }) => {
  const handleViewReports = () => {
    toast({
      title: 'Generating Reports',
      description: 'Comprehensive class performance report is being generated...',
    });
    
    // Simulate report generation
    setTimeout(() => {
      toast({
        title: 'Reports Ready!',
        description: 'Class performance reports have been downloaded to your computer.',
      });
    }, 2000);
  };

  const handleStartLiveSession = () => {
    toast({
      title: 'Live Session Started',
      description: 'Students can now join your live feedback session.',
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center mb-6 md:mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-[#2c2c2c] mb-2">
          Welcome, Professor {userName}!
        </h2>
        <p className="text-[#666] text-base md:text-lg">
          Manage your classes and track student progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <Card className="p-4 md:p-6 bg-white">
          <h3 className="text-lg md:text-xl font-semibold text-[#2c2c2c] mb-3 md:mb-4">Class Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm md:text-base">Total Students:</span>
              <span className="font-bold text-sm md:text-base">45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm md:text-base">Average Score:</span>
              <span className="font-bold text-sm md:text-base">78%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm md:text-base">Active Sessions:</span>
              <span className="font-bold text-sm md:text-base">2</span>
            </div>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white">
          <h3 className="text-lg md:text-xl font-semibold text-[#2c2c2c] mb-3 md:mb-4">Recent Activity</h3>
          <div className="space-y-2 text-xs md:text-sm">
            <p>• Quiz Week 5 completed by 42/45 students</p>
            <p>• High confusion on Recursion topic</p>
            <p>• 3 new questions submitted</p>
          </div>
        </Card>

        <Card className="p-4 md:p-6 bg-white">
          <h3 className="text-lg md:text-xl font-semibold text-[#2c2c2c] mb-3 md:mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              onClick={handleStartLiveSession}
              className="w-full bg-[#8B4513] hover:bg-[#654321] text-white text-sm md:text-base"
            >
              Start Live Session
            </Button>
            <Button 
              onClick={handleViewReports}
              variant="outline" 
              className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white text-sm md:text-base"
            >
              View Reports
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ProfessorDashboard;
