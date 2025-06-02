
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, Search, TrendingUp, TrendingDown, Award } from 'lucide-react';

const StudentProfiles: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const students = [
    {
      id: 1,
      name: 'Kayra',
      email: 'kayra@university.edu',
      averageScore: 85,
      weeklyProgress: [78, 82, 85, 87, 85],
      strengths: ['Recursion', 'Functions'],
      weaknesses: ['Arrays', 'Loops'],
      lastActive: '2 hours ago',
      totalQuizzes: 5,
      studyHours: 12,
    },
    {
      id: 2,
      name: 'Ada',
      email: 'ada@university.edu',
      averageScore: 92,
      weeklyProgress: [88, 90, 92, 94, 92],
      strengths: ['Variables', 'Functions', 'Recursion'],
      weaknesses: ['Complex algorithms'],
      lastActive: '1 hour ago',
      totalQuizzes: 5,
      studyHours: 18,
    },
    {
      id: 3,
      name: 'Eylül',
      email: 'eylul@university.edu',
      averageScore: 78,
      weeklyProgress: [72, 75, 78, 80, 78],
      strengths: ['Basic syntax', 'Variables'],
      weaknesses: ['Recursion', 'Advanced concepts'],
      lastActive: '4 hours ago',
      totalQuizzes: 4,
      studyHours: 10,
    },
    {
      id: 4,
      name: 'James',
      email: 'james@university.edu',
      averageScore: 88,
      weeklyProgress: [85, 87, 88, 90, 88],
      strengths: ['Arrays', 'Loops', 'Functions'],
      weaknesses: ['Recursion'],
      lastActive: '30 minutes ago',
      totalQuizzes: 5,
      studyHours: 15,
    },
    {
      id: 5,
      name: 'Sarah',
      email: 'sarah@university.edu',
      averageScore: 73,
      weeklyProgress: [68, 70, 73, 75, 73],
      strengths: ['Variables', 'Basic syntax'],
      weaknesses: ['Functions', 'Recursion', 'Arrays'],
      lastActive: '6 hours ago',
      totalQuizzes: 4,
      studyHours: 8,
    },
  ];

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Student Profiles & Progress</h2>
        <div className="text-[#666]">{students.length} students enrolled</div>
      </div>

      {/* Search */}
      <Card className="p-4 bg-white">
        <div className="relative">
          <Search className="absolute left-3 top-3 w-5 h-5 text-[#666]" />
          <Input
            type="text"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-[#e0e0e0] focus:border-[#8B4513]"
          />
        </div>
      </Card>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredStudents.map((student) => (
          <Card key={student.id} className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-[#8B4513] rounded-full flex items-center justify-center mr-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2c2c2c]">{student.name}</h3>
                  <p className="text-[#666] text-sm">{student.email}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#8B4513]">{student.averageScore}%</div>
                <div className="text-[#666] text-xs">Average Score</div>
              </div>
            </div>

            {/* Progress Chart */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-[#2c2c2c] mb-2">Weekly Progress</h4>
              <div className="flex items-end space-x-1 h-16">
                {student.weeklyProgress.map((score, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-[#8B4513] rounded-t"
                      style={{ height: `${(score / 100) * 100}%`, minHeight: '4px' }}
                    />
                    <div className="text-xs text-[#666] mt-1">W{index + 1}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-[#2c2c2c]">{student.totalQuizzes}</div>
                <div className="text-xs text-[#666]">Quizzes</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-[#2c2c2c]">{student.studyHours}h</div>
                <div className="text-xs text-[#666]">Study Time</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-[#666]">Last Active</div>
                <div className="text-sm font-medium text-[#2c2c2c]">{student.lastActive}</div>
              </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center mb-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-sm font-medium text-[#2c2c2c]">Strengths</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {student.strengths.map((strength, index) => (
                    <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {strength}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center mb-1">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm font-medium text-[#2c2c2c]">Needs Improvement</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {student.weaknesses.map((weakness, index) => (
                    <span key={index} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                      {weakness}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StudentProfiles;
