
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, TrendingUp, TrendingDown, User, Award, Clock, Target } from 'lucide-react';

const StudentProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');

  const students = [
    {
      id: 1,
      name: 'Kayra Johnson',
      email: 'kayra.johnson@university.edu',
      class: 'AI01',
      overallScore: 85,
      attendance: 92,
      assignments: { completed: 8, total: 10 },
      quizzes: { average: 88, total: 5 },
      participation: 90,
      lastActive: '2 hours ago',
      strengths: ['Algorithms', 'Problem Solving'],
      weaknesses: ['UI Design', 'Database'],
      trend: 'up',
      recentActivity: 'Completed Week 5 Quiz with 92%'
    },
    {
      id: 2,
      name: 'Ada Smith',
      email: 'ada.smith@university.edu',
      class: 'AI01',
      overallScore: 78,
      attendance: 88,
      assignments: { completed: 7, total: 10 },
      quizzes: { average: 82, total: 5 },
      participation: 85,
      lastActive: '5 hours ago',
      strengths: ['Frontend Development', 'Testing'],
      weaknesses: ['Algorithms', 'Math'],
      trend: 'down',
      recentActivity: 'Struggling with Recursion concepts'
    },
    {
      id: 3,
      name: 'Oliver Brown',
      email: 'oliver.brown@university.edu',
      class: 'AI02',
      overallScore: 91,
      attendance: 95,
      assignments: { completed: 9, total: 10 },
      quizzes: { average: 94, total: 5 },
      participation: 88,
      lastActive: '1 hour ago',
      strengths: ['Data Structures', 'Algorithm Design'],
      weaknesses: ['Time Management'],
      trend: 'up',
      recentActivity: 'Leading study group sessions'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma.wilson@university.edu',
      class: 'AI03',
      overallScore: 73,
      attendance: 82,
      assignments: { completed: 6, total: 10 },
      quizzes: { average: 76, total: 5 },
      participation: 70,
      lastActive: '1 day ago',
      strengths: ['Documentation', 'Team Work'],
      weaknesses: ['Programming Logic', 'Debugging'],
      trend: 'down',
      recentActivity: 'Missed last 2 assignments'
    },
    {
      id: 5,
      name: 'Liam Davis',
      email: 'liam.davis@university.edu',
      class: 'AI01',
      overallScore: 89,
      attendance: 90,
      assignments: { completed: 9, total: 10 },
      quizzes: { average: 91, total: 5 },
      participation: 92,
      lastActive: '30 minutes ago',
      strengths: ['Backend Development', 'API Design'],
      weaknesses: ['UI/UX Design'],
      trend: 'up',
      recentActivity: 'Helping peers with complex problems'
    }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? 
      <TrendingUp className="w-4 h-4 text-green-500" /> : 
      <TrendingDown className="w-4 h-4 text-red-500" />;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">Student Profiles & Progress</h2>

      {/* Search and Filter */}
      <Card className="p-4 bg-white">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#666]" />
            <Input
              type="text"
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e0e0e0] focus:border-[#8B4513]"
            />
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
          >
            <option value="all">All Classes</option>
            <option value="AI01">AI01</option>
            <option value="AI02">AI02</option>
            <option value="AI03">AI03</option>
          </select>
        </div>
      </Card>

      {/* Student Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center mr-4">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">{student.name}</h3>
                  <p className="text-[#666] text-sm">{student.email}</p>
                  <p className="text-[#666] text-sm">Class: {student.class}</p>
                </div>
              </div>
              <div className="flex items-center">
                {getTrendIcon(student.trend)}
                <span className={`text-2xl font-bold ml-2 ${getScoreColor(student.overallScore)}`}>
                  {student.overallScore}%
                </span>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#666] text-sm">Attendance</span>
                    <span className="text-[#2c2c2c] font-medium text-sm">{student.attendance}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(student.attendance, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#666] text-sm">Participation</span>
                    <span className="text-[#2c2c2c] font-medium text-sm">{student.participation}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(student.participation, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#666] text-sm">Assignments</span>
                    <span className="text-[#2c2c2c] font-medium text-sm">
                      {student.assignments.completed}/{student.assignments.total}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((student.assignments.completed / student.assignments.total) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#666] text-sm">Quiz Average</span>
                    <span className="text-[#2c2c2c] font-medium text-sm">{student.quizzes.average}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(student.quizzes.average, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="text-[#2c2c2c] font-medium mb-2 text-sm">Strengths:</h4>
                <div className="space-y-1">
                  {student.strengths.map((strength, index) => (
                    <span key={index} className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded mr-1">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-[#2c2c2c] font-medium mb-2 text-sm">Needs Work:</h4>
                <div className="space-y-1">
                  {student.weaknesses.map((weakness, index) => (
                    <span key={index} className="inline-block bg-red-100 text-red-700 text-xs px-2 py-1 rounded mr-1">
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="border-t border-[#e0e0e0] pt-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#666] text-sm">Recent Activity:</p>
                  <p className="text-[#2c2c2c] text-sm">{student.recentActivity}</p>
                </div>
                <div className="flex items-center text-[#666] text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {student.lastActive}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Summary Statistics */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Class Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">{filteredStudents.length}</div>
            <div className="text-[#666] text-sm">Total Students</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">
              {Math.round(filteredStudents.reduce((acc, student) => acc + student.overallScore, 0) / filteredStudents.length)}%
            </div>
            <div className="text-[#666] text-sm">Average Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">
              {Math.round(filteredStudents.reduce((acc, student) => acc + student.attendance, 0) / filteredStudents.length)}%
            </div>
            <div className="text-[#666] text-sm">Average Attendance</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-[#8B4513]">
              {filteredStudents.filter(student => student.trend === 'up').length}
            </div>
            <div className="text-[#666] text-sm">Improving Students</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudentProfiles;
