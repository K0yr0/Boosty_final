
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Users, BookOpen, Brain, Target, FileText } from 'lucide-react';
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

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#e0e0e0] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <BookOpen className="w-8 h-8 text-[#8B4513] mr-2" />
            <h1 className="text-2xl font-bold text-[#2c2c2c]">Boosty - Professor</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#2c2c2c] font-medium">Welcome, Prof. {user?.name}!</span>
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
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2c2c2c] mb-2">
          Welcome, Professor {userName}!
        </h2>
        <p className="text-[#666] text-lg">
          Manage your classes and track student progress
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Class Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Students:</span>
              <span className="font-bold">45</span>
            </div>
            <div className="flex justify-between">
              <span>Average Score:</span>
              <span className="font-bold">78%</span>
            </div>
            <div className="flex justify-between">
              <span>Active Sessions:</span>
              <span className="font-bold">2</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Recent Activity</h3>
          <div className="space-y-2 text-sm">
            <p>• Quiz Week 5 completed by 42/45 students</p>
            <p>• High confusion on Recursion topic</p>
            <p>• 3 new questions submitted</p>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button 
              onClick={handleStartLiveSession}
              className="w-full bg-[#8B4513] hover:bg-[#654321] text-white"
            >
              Start Live Session
            </Button>
            <Button 
              onClick={handleViewReports}
              variant="outline" 
              className="w-full border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
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
