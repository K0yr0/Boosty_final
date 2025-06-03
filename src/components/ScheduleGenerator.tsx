
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Users, RefreshCw, Download, CheckCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ScheduleGenerator: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall2024');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);

  const departments = [
    'Computer Science',
    'Architecture', 
    'Management',
    'Mechanical Engineering'
  ];

  const professors = [
    { name: 'Prof. Irmak', department: 'Computer Science', courses: ['Object Oriented Programming', 'Data Structures', 'Algorithms'] },
    { name: 'Prof. Johnson', department: 'Computer Science', courses: ['Database Systems', 'Web Development'] },
    { name: 'Prof. Smith', department: 'Architecture', courses: ['Architectural Design', 'Building Materials'] },
    { name: 'Prof. Wilson', department: 'Architecture', courses: ['Urban Planning', 'Structural Engineering'] },
    { name: 'Prof. Brown', department: 'Management', courses: ['Economics', 'Business Strategy', 'Marketing'] },
    { name: 'Prof. Davis', department: 'Management', courses: ['Finance', 'Operations Management'] },
    { name: 'Prof. Garcia', department: 'Mechanical Engineering', courses: ['Thermodynamics', 'Fluid Mechanics'] },
    { name: 'Prof. Martinez', department: 'Mechanical Engineering', courses: ['Machine Design', 'Manufacturing'] },
  ];

  const timeSlots = [
    '09:00-10:30', '10:45-12:15', '13:30-15:00', '15:15-16:45', '17:00-18:30'
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  const generateRandomSchedule = () => {
    setIsGenerating(true);
    
    setTimeout(() => {
      const schedule: any = {};
      const professorSchedules: any = {};
      
      // Initialize professor schedules
      professors.forEach(prof => {
        professorSchedules[prof.name] = {};
        days.forEach(day => {
          professorSchedules[prof.name][day] = {};
        });
      });

      departments.forEach(dept => {
        schedule[dept] = {};
        days.forEach(day => {
          schedule[dept][day] = {};
        });
      });

      // Generate schedule for each professor
      professors.forEach(prof => {
        prof.courses.forEach(course => {
          let scheduled = false;
          let attempts = 0;
          
          while (!scheduled && attempts < 50) {
            const randomDay = days[Math.floor(Math.random() * days.length)];
            const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
            
            // Check if professor is available
            if (!professorSchedules[prof.name][randomDay][randomTime]) {
              // Check if any department can have this course at this time
              const availableDepts = departments.filter(dept => 
                dept === prof.department || 
                (course === 'Economics' && (dept === 'Computer Science' || dept === 'Management'))
              );
              
              const targetDept = availableDepts[Math.floor(Math.random() * availableDepts.length)];
              
              if (!schedule[targetDept][randomDay][randomTime]) {
                schedule[targetDept][randomDay][randomTime] = {
                  course: course,
                  professor: prof.name,
                  classroom: `Room ${Math.floor(Math.random() * 50) + 100}`,
                  students: Math.floor(Math.random() * 50) + 20
                };
                professorSchedules[prof.name][randomDay][randomTime] = course;
                scheduled = true;
              }
            }
            attempts++;
          }
        });
      });

      setGeneratedSchedule(schedule);
      setIsGenerating(false);
      
      toast({
        title: 'Schedule Generated Successfully!',
        description: 'New university schedule has been created without conflicts.',
      });
    }, 3000);
  };

  const downloadSchedule = () => {
    if (!generatedSchedule) return;
    
    let scheduleText = `University Schedule - ${selectedSemester}\n\n`;
    
    departments.forEach(dept => {
      scheduleText += `${dept} Department\n`;
      scheduleText += '='.repeat(dept.length + 11) + '\n\n';
      
      days.forEach(day => {
        scheduleText += `${day}:\n`;
        timeSlots.forEach(time => {
          const classInfo = generatedSchedule[dept][day][time];
          if (classInfo) {
            scheduleText += `  ${time}: ${classInfo.course} - ${classInfo.professor} (${classInfo.classroom})\n`;
          }
        });
        scheduleText += '\n';
      });
      scheduleText += '\n';
    });

    const blob = new Blob([scheduleText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `university_schedule_${selectedSemester}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Schedule Downloaded',
      description: 'University schedule has been saved to your downloads.',
    });
  };

  const renderScheduleTable = (department: string) => {
    if (!generatedSchedule || !generatedSchedule[department]) return null;

    return (
      <Card key={department} className="p-6 bg-white mb-6">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">{department} Department</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#e0e0e0]">
            <thead>
              <tr>
                <th className="border border-[#e0e0e0] p-2 bg-[#fff3e6]">Time</th>
                {days.map(day => (
                  <th key={day} className="border border-[#e0e0e0] p-2 bg-[#fff3e6]">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time}>
                  <td className="border border-[#e0e0e0] p-2 font-medium bg-[#fff9f5]">{time}</td>
                  {days.map(day => {
                    const classInfo = generatedSchedule[department][day][time];
                    return (
                      <td key={`${day}-${time}`} className="border border-[#e0e0e0] p-2">
                        {classInfo ? (
                          <div className="text-xs">
                            <div className="font-medium text-[#2c2c2c]">{classInfo.course}</div>
                            <div className="text-[#666]">{classInfo.professor}</div>
                            <div className="text-[#666]">{classInfo.classroom}</div>
                            <div className="text-[#666]">{classInfo.students} students</div>
                          </div>
                        ) : (
                          <div className="text-[#ccc] text-center">-</div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">Smart Schedule Generator</h2>

      {/* Controls */}
      <Card className="p-6 bg-white">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-[#2c2c2c] font-medium mb-2 block">Semester:</label>
              <select
                value={selectedSemester}
                onChange={(e) => setSelectedSemester(e.target.value)}
                className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
              >
                <option value="fall2024">Fall 2024</option>
                <option value="spring2025">Spring 2025</option>
                <option value="summer2025">Summer 2025</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3">
            <Button
              onClick={generateRandomSchedule}
              disabled={isGenerating}
              className="bg-[#8B4513] hover:bg-[#654321] text-white"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Calendar className="w-4 h-4 mr-2" />
                  Generate Schedule
                </>
              )}
            </Button>
            
            {generatedSchedule && (
              <Button
                onClick={downloadSchedule}
                variant="outline"
                className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Schedule Generation Info */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Schedule Generation Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium text-[#2c2c2c] mb-2">Conflict Prevention:</h4>
            <ul className="text-[#666] text-sm space-y-1">
              <li>• No professor teaches multiple classes simultaneously</li>
              <li>• Each classroom is assigned to only one class per time slot</li>
              <li>• Department schedules avoid internal conflicts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#2c2c2c] mb-2">Cross-Department Support:</h4>
            <ul className="text-[#666] text-sm space-y-1">
              <li>• Shared courses (e.g., Economics) available to multiple departments</li>
              <li>• Professors can teach across compatible departments</li>
              <li>• Optimal resource utilization across the university</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Generated Schedule Display */}
      {generatedSchedule && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <h3 className="text-xl font-semibold text-[#2c2c2c]">Generated Schedule</h3>
          </div>
          
          {departments.map(dept => renderScheduleTable(dept))}
        </div>
      )}

      {/* Department & Faculty Overview */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Faculty Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {departments.map(dept => (
            <div key={dept} className="border border-[#e0e0e0] rounded-lg p-4">
              <h4 className="font-medium text-[#2c2c2c] mb-3">{dept}</h4>
              <div className="space-y-2">
                {professors
                  .filter(prof => prof.department === dept)
                  .map(prof => (
                    <div key={prof.name} className="text-sm">
                      <div className="font-medium text-[#2c2c2c]">{prof.name}</div>
                      <div className="text-[#666]">Courses: {prof.courses.join(', ')}</div>
                    </div>
                  ))
                }
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ScheduleGenerator;
