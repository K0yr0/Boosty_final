
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Timer, Trophy, Play, Pause, RotateCcw } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const StudySquads: React.FC = () => {
  const [activeSquad, setActiveSquad] = useState<string | null>(null);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  const squads = [
    {
      id: 'cs101',
      name: 'CS101 Study Squad',
      course: 'Introduction to Computer Science',
      members: [
        { name: 'Kayra', status: 'studying', progress: 85 },
        { name: 'Irmak', status: 'studying', progress: 72 },
        { name: 'Mehmet', status: 'break', progress: 90 },
        { name: 'Ayşe', status: 'offline', progress: 45 },
      ],
      totalMembers: 8,
      activeMembers: 3,
    },
    {
      id: 'math201',
      name: 'Math201 Focus Group',
      course: 'Calculus II',
      members: [
        { name: 'Ali', status: 'studying', progress: 95 },
        { name: 'Zeynep', status: 'studying', progress: 78 },
        { name: 'Can', status: 'studying', progress: 82 },
      ],
      totalMembers: 6,
      activeMembers: 3,
    },
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning && pomodoroTime > 0) {
      interval = setInterval(() => {
        setPomodoroTime(time => time - 1);
      }, 1000);
    } else if (pomodoroTime === 0) {
      setIsRunning(false);
      if (isBreak) {
        toast({
          title: 'Break Complete!',
          description: 'Ready for another focus session?',
        });
        setPomodoroTime(25 * 60);
        setIsBreak(false);
      } else {
        toast({
          title: 'Pomodoro Complete!',
          description: 'Great job! Time for a break.',
        });
        setPomodoroTime(5 * 60);
        setIsBreak(true);
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, pomodoroTime, isBreak]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinSquad = (squadId: string) => {
    setActiveSquad(squadId);
    toast({
      title: 'Joined Squad!',
      description: 'You are now part of the silent study session',
    });
  };

  const handleLeaveSquad = () => {
    setActiveSquad(null);
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
    toast({
      title: 'Left Squad',
      description: 'Study session ended',
    });
  };

  const togglePomodoro = () => {
    setIsRunning(!isRunning);
    toast({
      title: isRunning ? 'Paused' : 'Started',
      description: isRunning ? 'Timer paused' : 'Focus session started!',
    });
  };

  const resetPomodoro = () => {
    setIsRunning(false);
    setPomodoroTime(25 * 60);
    setIsBreak(false);
    toast({
      title: 'Timer Reset',
      description: 'Ready for a new focus session',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Silent Study Squads</h2>
        {activeSquad && (
          <Button
            onClick={handleLeaveSquad}
            variant="outline"
            className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
          >
            Leave Squad
          </Button>
        )}
      </div>

      {/* Active Pomodoro Timer */}
      {activeSquad && (
        <Card className="p-6 bg-white">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">
              {isBreak ? 'Break Time' : 'Focus Session'}
            </h3>
            <div className="text-6xl font-bold text-[#8B4513] mb-6">
              {formatTime(pomodoroTime)}
            </div>
            <div className="flex justify-center space-x-4">
              <Button
                onClick={togglePomodoro}
                className="bg-[#8B4513] hover:bg-[#654321] text-white"
              >
                {isRunning ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isRunning ? 'Pause' : 'Start'}
              </Button>
              <Button
                onClick={resetPomodoro}
                variant="outline"
                className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Available Squads */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {squads.map((squad) => (
          <Card key={squad.id} className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-[#2c2c2c]">{squad.name}</h3>
                <p className="text-[#666]">{squad.course}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center text-[#8B4513]">
                  <Users className="w-4 h-4 mr-1" />
                  <span className="font-semibold">{squad.activeMembers}/{squad.totalMembers}</span>
                </div>
                <span className="text-[#666] text-sm">Active Members</span>
              </div>
            </div>

            {/* Member Progress */}
            <div className="space-y-3 mb-4">
              {squad.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-2 ${
                      member.status === 'studying' ? 'bg-green-500' :
                      member.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                    }`} />
                    <span className="text-[#2c2c2c] font-medium">{member.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#8B4513] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${member.progress}%` }}
                      />
                    </div>
                    <span className="text-[#666] text-sm w-10">{member.progress}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Squad Actions */}
            <div className="pt-4 border-t border-[#e0e0e0]">
              {activeSquad === squad.id ? (
                <div className="flex items-center justify-center text-green-600">
                  <Users className="w-4 h-4 mr-2" />
                  <span className="font-medium">Currently Active</span>
                </div>
              ) : (
                <Button
                  onClick={() => handleJoinSquad(squad.id)}
                  disabled={!!activeSquad}
                  className="w-full bg-[#8B4513] hover:bg-[#654321] text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  Join Squad
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Squad Stats */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Your Squad Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Trophy className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#8B4513]">45</div>
            <div className="text-[#666]">Pomodoros Completed</div>
          </div>
          <div className="text-center">
            <Timer className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#8B4513]">18.5</div>
            <div className="text-[#666]">Hours This Week</div>
          </div>
          <div className="text-center">
            <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#8B4513]">3</div>
            <div className="text-[#666]">Squad Battles Won</div>
          </div>
          <div className="text-center">
            <Trophy className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-[#8B4513]">12</div>
            <div className="text-[#666]">Streak Days</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default StudySquads;
