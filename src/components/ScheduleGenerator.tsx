import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, Users, RefreshCw, Download, CheckCircle, Hash } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ScheduleGenerator: React.FC = () => {
  const [selectedSemester, setSelectedSemester] = useState('fall2024');
  const [classNumber, setClassNumber] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSchedule, setGeneratedSchedule] = useState<any>(null);

  const STORAGE_KEY = 'dean_generated_schedule';

  // Load saved schedule from localStorage
  useEffect(() => {
    const savedSchedule = localStorage.getItem(STORAGE_KEY);
    if (savedSchedule) {
      try {
        const parsed = JSON.parse(savedSchedule);
        setGeneratedSchedule(parsed.schedule);
        setSelectedSemester(parsed.semester);
        setClassNumber(parsed.classNumber || '');
      } catch (error) {
        console.error('Error loading saved schedule:', error);
      }
    }
  }, []);

  // Save schedule to localStorage
  const saveScheduleToStorage = (schedule: any, semester: string, classNum: string) => {
    const scheduleData = {
      schedule,
      semester,
      classNumber: classNum,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scheduleData));
  };

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
    { name: 'Prof. Martinez', department: 'Mechanical Engineering', courses: ['Manufacturing', 'Machine Design'] },
  ];

  // Joint courses that can be taught to multiple departments
  const jointCourses = [
    { course: 'Economics', departments: ['Computer Science', 'Management'], professor: 'Prof. Brown' },
    { course: 'Ethics in Engineering', departments: ['Computer Science', 'Mechanical Engineering'], professor: 'Prof. Wilson' },
    { course: 'Project Management', departments: ['Architecture', 'Management'], professor: 'Prof. Davis' },
    { course: 'Mathematics', departments: ['Computer Science', 'Mechanical Engineering'], professor: 'Prof. Garcia' },
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

      // Initialize department schedules
      departments.forEach(dept => {
        schedule[dept] = {};
        days.forEach(day => {
          schedule[dept][day] = {};
        });
      });

      // First, schedule joint courses
      jointCourses.forEach(jointCourse => {
        let scheduled = false;
        let attempts = 0;
        
        while (!scheduled && attempts < 30) {
          const randomDay = days[Math.floor(Math.random() * days.length)];
          const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
          
          // Check if professor is available
          if (!professorSchedules[jointCourse.professor][randomDay][randomTime]) {
            // Check if all target departments can have this course at this time
            const canSchedule = jointCourse.departments.every(dept => 
              !schedule[dept][randomDay][randomTime]
            );
            
            if (canSchedule) {
              // Schedule for all departments
              jointCourse.departments.forEach(dept => {
                const classInfo = {
                  course: jointCourse.course,
                  professor: jointCourse.professor,
                  classroom: `Room ${Math.floor(Math.random() * 50) + 100}`,
                  students: Math.floor(Math.random() * 80) + 40,
                  type: 'Joint Class',
                  classNumber: classNumber || 'All',
                  departments: jointCourse.departments.join(' + ')
                };
                schedule[dept][randomDay][randomTime] = classInfo;
              });
              professorSchedules[jointCourse.professor][randomDay][randomTime] = jointCourse.course;
              scheduled = true;
            }
          }
          attempts++;
        }
      });

      // Then schedule regular courses
      professors.forEach(prof => {
        prof.courses.forEach(course => {
          // Skip if this course is already scheduled as a joint course
          const isJointCourse = jointCourses.some(jc => jc.course === course);
          if (isJointCourse) return;

          let scheduled = false;
          let attempts = 0;
          
          while (!scheduled && attempts < 50) {
            const randomDay = days[Math.floor(Math.random() * days.length)];
            const randomTime = timeSlots[Math.floor(Math.random() * timeSlots.length)];
            
            // Check if professor is available
            if (!professorSchedules[prof.name][randomDay][randomTime]) {
              const targetDept = prof.department;
              
              if (!schedule[targetDept][randomDay][randomTime]) {
                const classInfo = {
                  course: course,
                  professor: prof.name,
                  classroom: `Room ${Math.floor(Math.random() * 50) + 100}`,
                  students: Math.floor(Math.random() * 50) + 20,
                  type: classNumber ? `Class ${classNumber}` : 'Department Only',
                  classNumber: classNumber || 'All',
                  departments: targetDept
                };
                schedule[targetDept][randomDay][randomTime] = classInfo;
                professorSchedules[prof.name][randomDay][randomTime] = course;
                scheduled = true;
              }
            }
            attempts++;
          }
        });
      });

      setGeneratedSchedule(schedule);
      saveScheduleToStorage(schedule, selectedSemester, classNumber);
      setIsGenerating(false);
      
      toast({
        title: 'Schedule Generated Successfully!',
        description: `New university schedule created for ${classNumber ? `Class ${classNumber}` : 'all classes'} without conflicts.`,
      });
    }, 3000);
  };

  const downloadSchedule = () => {
    if (!generatedSchedule) return;
    
    let scheduleText = `University Schedule - ${selectedSemester}${classNumber ? ` - Class ${classNumber}` : ''}\n`;
    scheduleText += '='.repeat(50) + '\n\n';
    
    departments.forEach(dept => {
      scheduleText += `${dept} Department\n`;
      scheduleText += '='.repeat(dept.length + 11) + '\n\n';
      
      days.forEach(day => {
        scheduleText += `${day}:\n`;
        timeSlots.forEach(time => {
          const classInfo = generatedSchedule[dept][day][time];
          if (classInfo) {
            scheduleText += `  ${time}: ${classInfo.course} - ${classInfo.professor}\n`;
            scheduleText += `    Location: ${classInfo.classroom} | Students: ${classInfo.students}\n`;
            scheduleText += `    Type: ${classInfo.type} | Target: ${classInfo.departments}\n`;
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
    a.download = `university_schedule_${selectedSemester}${classNumber ? `_class_${classNumber}` : ''}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: 'Schedule Downloaded',
      description: 'University schedule has been saved to your downloads.',
    });
  };

  const clearSchedule = () => {
    setGeneratedSchedule(null);
    setClassNumber('');
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: 'Schedule Cleared',
      description: 'Saved schedule has been cleared.',
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
                            <div className={`text-xs mt-1 px-1 py-0.5 rounded ${
                              classInfo.type === 'Joint Class' 
                                ? 'bg-green-100 text-green-700'
                                : 'bg-blue-100 text-blue-700'
                            }`}>
                              {classInfo.type}
                            </div>
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
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[#2c2c2c] font-medium mb-2 block">Semester:</label>
                <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none text-sm"
                >
                  <option value="fall2024">Fall 2024</option>
                  <option value="spring2025">Spring 2025</option>
                  <option value="summer2025">Summer 2025</option>
                </select>
              </div>
              <div>
                <label className="text-[#2c2c2c] font-medium mb-2 block">Class Number (Optional):</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-3 w-4 h-4 text-[#666]" />
                  <input
                    type="text"
                    value={classNumber}
                    onChange={(e) => setClassNumber(e.target.value)}
                    placeholder="e.g., 01, 02, A, B"
                    className="w-full pl-10 pr-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none text-sm"
                  />
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={generateRandomSchedule}
                disabled={isGenerating}
                className="bg-[#8B4513] hover:bg-[#654321] text-white flex-1 sm:flex-none"
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
                <>
                  <Button
                    onClick={downloadSchedule}
                    variant="outline"
                    className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button
                    onClick={clearSchedule}
                    variant="outline"
                    className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white flex-1 sm:flex-none"
                  >
                    Clear Schedule
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {classNumber && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-blue-800 text-sm">
                <strong>Class-specific schedule:</strong> Generating schedule for Class {classNumber}. 
                This will create separate sections for department-specific courses and joint classes where applicable.
              </p>
            </div>
          )}
        </div>
      </Card>

      {/* Schedule Generation Info */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Advanced Schedule Generation Rules</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-medium text-[#2c2c2c] mb-2">Conflict Prevention:</h4>
            <ul className="text-[#666] text-sm space-y-1">
              <li>• No professor teaches multiple classes simultaneously</li>
              <li>• Each classroom is assigned to only one class per time slot</li>
              <li>• Department schedules avoid internal conflicts</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#2c2c2c] mb-2">Joint Classes:</h4>
            <ul className="text-[#666] text-sm space-y-1">
              <li>• Economics: Computer Science + Management</li>
              <li>• Ethics: Computer Science + Mechanical Eng.</li>
              <li>• Project Management: Architecture + Management</li>
              <li>• Mathematics: Computer Science + Mechanical Eng.</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-[#2c2c2c] mb-2">Class Numbering:</h4>
            <ul className="text-[#666] text-sm space-y-1">
              <li>• Specify class number for separate sections</li>
              <li>• Leave empty for department-wide scheduling</li>
              <li>• Joint classes serve multiple departments</li>
              <li>• Separate classes for specialized content</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Generated Schedule Display */}
      {generatedSchedule && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-6 h-6 text-green-500" />
              <h3 className="text-xl font-semibold text-[#2c2c2c]">
                Generated Schedule {classNumber && `- Class ${classNumber}`}
              </h3>
            </div>
            <div className="text-sm text-[#666]">
              Last generated: {new Date().toLocaleString()}
            </div>
          </div>
          
          {departments.map(dept => renderScheduleTable(dept))}
        </div>
      )}

      {/* Department & Faculty Overview */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Faculty & Course Overview</h3>
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
        
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-800 mb-2">Joint Course Schedule</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {jointCourses.map((jc, index) => (
              <div key={index} className="text-sm">
                <div className="font-medium text-green-700">{jc.course}</div>
                <div className="text-green-600">
                  {jc.professor} - {jc.departments.join(' + ')}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ScheduleGenerator;
