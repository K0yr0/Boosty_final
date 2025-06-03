
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Calendar, Users, FileText, Settings, BarChart } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import ScheduleGenerator from './ScheduleGenerator';

interface DeanDashboardProps {
  user: { name: string; role: string } | null;
  onLogout: () => void;
}

type ActivePage = 'home' | 'schedule' | 'reports' | 'faculty' | 'students' | 'settings';

const DeanDashboard: React.FC<DeanDashboardProps> = ({ user, onLogout }) => {
  const [activePage, setActivePage] = useState<ActivePage>('home');

  const navigationItems = [
    { id: 'home' as ActivePage, label: 'Dashboard', icon: Home },
    { id: 'schedule' as ActivePage, label: 'Schedule Generator', icon: Calendar },
    { id: 'reports' as ActivePage, label: 'Academic Reports', icon: BarChart },
    { id: 'faculty' as ActivePage, label: 'Faculty Management', icon: Users },
    { id: 'students' as ActivePage, label: 'Student Overview', icon: FileText },
    { id: 'settings' as ActivePage, label: 'Settings', icon: Settings },
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'schedule':
        return <ScheduleGenerator />;
      case 'reports':
        return <AcademicReports />;
      case 'faculty':
        return <FacultyManagement />;
      case 'students':
        return <StudentOverview />;
      case 'settings':
        return <DeanSettings />;
      default:
        return <DeanHomePage userName={user?.name || 'Dean'} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-[#e0e0e0] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Settings className="w-8 h-8 text-[#8B4513] mr-2" />
            <h1 className="text-2xl font-bold text-[#2c2c2c]">Dean's Office</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-[#2c2c2c] font-medium">Welcome, Dean {user?.name}!</span>
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

const DeanHomePage: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#2c2c2c] mb-2">
          Welcome, Dean {userName}!
        </h2>
        <p className="text-[#666] text-lg">
          University Administration Dashboard
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">University Overview</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Total Students:</span>
              <span className="font-bold">2,847</span>
            </div>
            <div className="flex justify-between">
              <span>Faculty Members:</span>
              <span className="font-bold">156</span>
            </div>
            <div className="flex justify-between">
              <span>Departments:</span>
              <span className="font-bold">4</span>
            </div>
            <div className="flex justify-between">
              <span>Active Courses:</span>
              <span className="font-bold">89</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Academic Performance</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Overall GPA:</span>
              <span className="font-bold">3.2</span>
            </div>
            <div className="flex justify-between">
              <span>Graduation Rate:</span>
              <span className="font-bold">87%</span>
            </div>
            <div className="flex justify-between">
              <span>Student Satisfaction:</span>
              <span className="font-bold">4.1/5</span>
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-xl font-semibold text-[#2c2c2c] mb-4">Recent Activities</h3>
          <div className="space-y-2 text-sm">
            <p>• Schedule generated for Fall 2024</p>
            <p>• New faculty orientation completed</p>
            <p>• Budget approval for CS lab</p>
            <p>• Student feedback collected</p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h4 className="text-lg font-semibold text-blue-800 mb-2">Computer Science</h4>
          <p className="text-blue-600">742 students</p>
          <p className="text-blue-600">28 faculty</p>
        </Card>
        
        <Card className="p-6 bg-green-50 border border-green-200">
          <h4 className="text-lg font-semibold text-green-800 mb-2">Architecture</h4>
          <p className="text-green-600">456 students</p>
          <p className="text-green-600">19 faculty</p>
        </Card>
        
        <Card className="p-6 bg-purple-50 border border-purple-200">
          <h4 className="text-lg font-semibold text-purple-800 mb-2">Management</h4>
          <p className="text-purple-600">893 students</p>
          <p className="text-purple-600">34 faculty</p>
        </Card>
        
        <Card className="p-6 bg-orange-50 border border-orange-200">
          <h4 className="text-lg font-semibold text-orange-800 mb-2">Mechanical Engineering</h4>
          <p className="text-orange-600">756 students</p>
          <p className="text-orange-600">41 faculty</p>
        </Card>
      </div>
    </div>
  );
};

// Placeholder components for other pages
const AcademicReports: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[#2c2c2c]">Academic Reports</h2>
    <Card className="p-6 bg-white">
      <p className="text-[#666]">Comprehensive academic performance reports and analytics...</p>
    </Card>
  </div>
);

const FacultyManagement: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[#2c2c2c]">Faculty Management</h2>
    <Card className="p-6 bg-white">
      <p className="text-[#666]">Faculty hiring, evaluation, and management tools...</p>
    </Card>
  </div>
);

const StudentOverview: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[#2c2c2c]">Student Overview</h2>
    <Card className="p-6 bg-white">
      <p className="text-[#666]">University-wide student performance and statistics...</p>
    </Card>
  </div>
);

const DeanSettings: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-[#2c2c2c]">Dean Settings</h2>
    <Card className="p-6 bg-white">
      <p className="text-[#666]">System configuration and administrative settings...</p>
    </Card>
  </div>
);

export default DeanDashboard;
