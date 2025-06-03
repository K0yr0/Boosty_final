
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LogOut, Home, Calendar, Users, FileText, Settings, BarChart, Plus, Download, Edit, Trash2, Search, Filter } from 'lucide-react';
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

// Enhanced Academic Reports Component
const AcademicReports: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall2024');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const downloadReport = (type: string) => {
    toast({
      title: `${type} Report Downloaded`,
      description: `Academic report has been generated and downloaded.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Academic Reports</h2>
        <div className="flex space-x-3">
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg"
          >
            <option value="fall2024">Fall 2024</option>
            <option value="spring2024">Spring 2024</option>
            <option value="summer2024">Summer 2024</option>
          </select>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg"
          >
            <option value="all">All Departments</option>
            <option value="cs">Computer Science</option>
            <option value="arch">Architecture</option>
            <option value="mgmt">Management</option>
            <option value="mech">Mechanical Engineering</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>A (90-100)</span>
              <span className="font-bold text-green-600">23%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>B (80-89)</span>
              <span className="font-bold text-blue-600">34%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '34%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>C (70-79)</span>
              <span className="font-bold text-yellow-600">28%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '28%' }}></div>
            </div>
            <div className="flex justify-between items-center">
              <span>D-F (0-69)</span>
              <span className="font-bold text-red-600">15%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-red-500 h-2 rounded-full" style={{ width: '15%' }}></div>
            </div>
          </div>
          <Button
            onClick={() => downloadReport('Grade Distribution')}
            className="w-full mt-4 bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Attendance Analytics</h3>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#8B4513]">87.5%</div>
              <div className="text-[#666]">Average Attendance</div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Excellent (>95%)</span>
                <span className="font-bold">42%</span>
              </div>
              <div className="flex justify-between">
                <span>Good (85-95%)</span>
                <span className="font-bold">35%</span>
              </div>
              <div className="flex justify-between">
                <span>Average (75-84%)</span>
                <span className="font-bold">18%</span>
              </div>
              <div className="flex justify-between">
                <span>Poor (<75%)</span>
                <span className="font-bold">5%</span>
              </div>
            </div>
          </div>
          <Button
            onClick={() => downloadReport('Attendance')}
            className="w-full mt-4 bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </Card>

        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Course Performance</h3>
          <div className="space-y-3">
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Object Oriented Programming</span>
                <span className="text-sm font-bold text-green-600">3.8</span>
              </div>
              <div className="text-xs text-[#666]">Computer Science</div>
            </div>
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Architectural Design</span>
                <span className="text-sm font-bold text-blue-600">3.6</span>
              </div>
              <div className="text-xs text-[#666]">Architecture</div>
            </div>
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Business Strategy</span>
                <span className="text-sm font-bold text-purple-600">3.4</span>
              </div>
              <div className="text-xs text-[#666]">Management</div>
            </div>
            <div className="border-b pb-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Thermodynamics</span>
                <span className="text-sm font-bold text-orange-600">3.2</span>
              </div>
              <div className="text-xs text-[#666]">Mechanical Engineering</div>
            </div>
          </div>
          <Button
            onClick={() => downloadReport('Course Performance')}
            className="w-full mt-4 bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Report
          </Button>
        </Card>
      </div>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Comprehensive Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">156</div>
            <div className="text-sm text-[#666]">Total Faculty</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">2,847</div>
            <div className="text-sm text-[#666]">Total Students</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">89</div>
            <div className="text-sm text-[#666]">Active Courses</div>
          </div>
          <div className="text-center p-4 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">94%</div>
            <div className="text-sm text-[#666]">Pass Rate</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

// Enhanced Faculty Management Component
const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const facultyMembers = [
    { id: 1, name: 'Prof. Irmak', department: 'Computer Science', position: 'Professor', courses: 3, students: 156, experience: '8 years', status: 'Active' },
    { id: 2, name: 'Prof. Johnson', department: 'Computer Science', position: 'Associate Professor', courses: 2, students: 98, experience: '5 years', status: 'Active' },
    { id: 3, name: 'Prof. Smith', department: 'Architecture', position: 'Professor', courses: 2, students: 87, experience: '12 years', status: 'Active' },
    { id: 4, name: 'Prof. Wilson', department: 'Architecture', position: 'Assistant Professor', courses: 2, students: 76, experience: '3 years', status: 'Active' },
    { id: 5, name: 'Prof. Brown', department: 'Management', position: 'Professor', courses: 3, students: 134, experience: '10 years', status: 'Active' },
    { id: 6, name: 'Prof. Davis', department: 'Management', position: 'Associate Professor', courses: 2, students: 89, experience: '6 years', status: 'On Leave' },
    { id: 7, name: 'Prof. Garcia', department: 'Mechanical Engineering', position: 'Professor', courses: 2, students: 112, experience: '9 years', status: 'Active' },
    { id: 8, name: 'Prof. Martinez', department: 'Mechanical Engineering', position: 'Assistant Professor', courses: 2, students: 94, experience: '4 years', status: 'Active' },
  ];

  const filteredFaculty = facultyMembers.filter(faculty => {
    const matchesSearch = faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faculty.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || faculty.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Faculty Management</h2>
        <Button className="bg-[#8B4513] hover:bg-[#654321] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Add Faculty
        </Button>
      </div>

      <Card className="p-6 bg-white">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[#666]" />
              <input
                type="text"
                placeholder="Search faculty by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
              />
            </div>
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Architecture">Architecture</option>
            <option value="Management">Management</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Faculty Member</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Department</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Position</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Courses</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Students</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Experience</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Status</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredFaculty.map((faculty) => (
                <tr key={faculty.id} className="border-b border-[#f0f0f0] hover:bg-[#fff3e6]">
                  <td className="p-4">
                    <div className="font-medium text-[#2c2c2c]">{faculty.name}</div>
                  </td>
                  <td className="p-4 text-[#666]">{faculty.department}</td>
                  <td className="p-4 text-[#666]">{faculty.position}</td>
                  <td className="p-4 text-[#666]">{faculty.courses}</td>
                  <td className="p-4 text-[#666]">{faculty.students}</td>
                  <td className="p-4 text-[#666]">{faculty.experience}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      faculty.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {faculty.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button size="sm" variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Total Faculty</h3>
          <div className="text-3xl font-bold text-[#8B4513]">156</div>
          <div className="text-[#666] text-sm">Active faculty members</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Professors</h3>
          <div className="text-3xl font-bold text-blue-600">68</div>
          <div className="text-[#666] text-sm">Full professors</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Associate Prof.</h3>
          <div className="text-3xl font-bold text-green-600">52</div>
          <div className="text-[#666] text-sm">Associate professors</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Assistant Prof.</h3>
          <div className="text-3xl font-bold text-purple-600">36</div>
          <div className="text-[#666] text-sm">Assistant professors</div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced Student Overview Component
const StudentOverview: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const students = [
    { id: 1, name: 'Kayra Johnson', department: 'Computer Science', year: '3rd Year', gpa: 3.8, credits: 120, status: 'Active' },
    { id: 2, name: 'Emma Wilson', department: 'Computer Science', year: '2nd Year', gpa: 3.6, credits: 80, status: 'Active' },
    { id: 3, name: 'Michael Brown', department: 'Architecture', year: '4th Year', gpa: 3.4, credits: 140, status: 'Active' },
    { id: 4, name: 'Sarah Davis', department: 'Architecture', year: '1st Year', gpa: 3.9, credits: 30, status: 'Active' },
    { id: 5, name: 'David Miller', department: 'Management', year: '3rd Year', gpa: 3.2, credits: 110, status: 'Probation' },
    { id: 6, name: 'Lisa Garcia', department: 'Management', year: '2nd Year', gpa: 3.7, credits: 75, status: 'Active' },
    { id: 7, name: 'James Martinez', department: 'Mechanical Engineering', year: '4th Year', gpa: 3.5, credits: 135, status: 'Active' },
    { id: 8, name: 'Ada Thompson', department: 'Mechanical Engineering', year: '1st Year', gpa: 3.8, credits: 32, status: 'Active' },
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || student.department === selectedDepartment;
    const matchesYear = selectedYear === 'all' || student.year === selectedYear;
    return matchesSearch && matchesDepartment && matchesYear;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Student Overview</h2>
        <Button className="bg-[#8B4513] hover:bg-[#654321] text-white">
          <Download className="w-4 h-4 mr-2" />
          Export Data
        </Button>
      </div>

      <Card className="p-6 bg-white">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-[#666]" />
              <input
                type="text"
                placeholder="Search students by name or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
              />
            </div>
          </div>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
          >
            <option value="all">All Departments</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Architecture">Architecture</option>
            <option value="Management">Management</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
          >
            <option value="all">All Years</option>
            <option value="1st Year">1st Year</option>
            <option value="2nd Year">2nd Year</option>
            <option value="3rd Year">3rd Year</option>
            <option value="4th Year">4th Year</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-[#e0e0e0]">
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Student Name</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Department</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Year</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">GPA</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Credits</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Status</th>
                <th className="text-left p-4 font-semibold text-[#2c2c2c]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-[#f0f0f0] hover:bg-[#fff3e6]">
                  <td className="p-4">
                    <div className="font-medium text-[#2c2c2c]">{student.name}</div>
                  </td>
                  <td className="p-4 text-[#666]">{student.department}</td>
                  <td className="p-4 text-[#666]">{student.year}</td>
                  <td className="p-4">
                    <span className={`font-semibold ${
                      student.gpa >= 3.7 ? 'text-green-600' :
                      student.gpa >= 3.0 ? 'text-blue-600' :
                      'text-red-600'
                    }`}>
                      {student.gpa.toFixed(1)}
                    </span>
                  </td>
                  <td className="p-4 text-[#666]">{student.credits}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      student.status === 'Active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {student.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
                      View Profile
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Total Students</h3>
          <div className="text-3xl font-bold text-[#8B4513]">2,847</div>
          <div className="text-[#666] text-sm">Enrolled students</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Average GPA</h3>
          <div className="text-3xl font-bold text-green-600">3.2</div>
          <div className="text-[#666] text-sm">University-wide</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">Graduation Rate</h3>
          <div className="text-3xl font-bold text-blue-600">87%</div>
          <div className="text-[#666] text-sm">4-year graduation</div>
        </Card>
        
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">On Probation</h3>
          <div className="text-3xl font-bold text-red-600">23</div>
          <div className="text-[#666] text-sm">Academic probation</div>
        </Card>
      </div>
    </div>
  );
};

// Enhanced Dean Settings Component
const DeanSettings: React.FC = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyReports, setWeeklyReports] = useState(true);
  const [emergencyAlerts, setEmergencyAlerts] = useState(true);

  const saveSettings = () => {
    toast({
      title: 'Settings Saved',
      description: 'Your preferences have been updated successfully.',
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">Dean Settings</h2>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-[#2c2c2c]">Email Notifications</label>
              <p className="text-sm text-[#666]">Receive important updates via email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailNotifications}
                onChange={(e) => setEmailNotifications(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B4513]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4513]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-[#2c2c2c]">Weekly Reports</label>
              <p className="text-sm text-[#666]">Automatic weekly performance reports</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={weeklyReports}
                onChange={(e) => setWeeklyReports(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B4513]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4513]"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <label className="font-medium text-[#2c2c2c]">Emergency Alerts</label>
              <p className="text-sm text-[#666]">Critical university notifications</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emergencyAlerts}
                onChange={(e) => setEmergencyAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#8B4513]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8B4513]"></div>
            </label>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">University Configuration</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-[#2c2c2c] font-medium mb-2">Academic Year</label>
            <select className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none">
              <option>2024-2025</option>
              <option>2025-2026</option>
            </select>
          </div>
          <div>
            <label className="block text-[#2c2c2c] font-medium mb-2">Default Semester</label>
            <select className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none">
              <option>Fall</option>
              <option>Spring</option>
              <option>Summer</option>
            </select>
          </div>
          <div>
            <label className="block text-[#2c2c2c] font-medium mb-2">GPA Scale</label>
            <select className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none">
              <option>4.0 Scale</option>
              <option>100 Point Scale</option>
            </select>
          </div>
          <div>
            <label className="block text-[#2c2c2c] font-medium mb-2">Credit Hours per Semester</label>
            <input
              type="number"
              defaultValue="15"
              className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">System Maintenance</h3>
        <div className="space-y-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Backup University Data
          </Button>
          <Button variant="outline" className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white">
            Generate System Report
          </Button>
          <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
            Clear Cache & Logs
          </Button>
        </div>
      </Card>

      <div className="flex justify-end">
        <Button
          onClick={saveSettings}
          className="bg-[#8B4513] hover:bg-[#654321] text-white"
        >
          Save All Settings
        </Button>
      </div>
    </div>
  );
};

export default DeanDashboard;
