import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Play, Pause, BarChart, MessageCircle } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { usePersistentTimer } from '@/hooks/usePersistentTimer';

const StudySquads: React.FC = () => {
  const [selectedSquad, setSelectedSquad] = useState<number | null>(null);
  const { pomodoroTime, isRunning, currentCycle, startTimer, pauseTimer, resetTimer } = usePersistentTimer(selectedSquad);

  const squads = [
    {
      id: 1,
      name: 'CS101 Focus Group',
      members: ['Kayra', 'Ada', 'James'],
      activeNow: 2,
      totalSessions: 15,
      avgFocusTime: '45 min',
      topic: 'Recursion Practice',
      joined: true,
    },
    {
      id: 2,
      name: 'Algorithm Enthusiasts',
      members: ['Sarah', 'Emma', 'Mike', 'Lisa'],
      activeNow: 3,
      totalSessions: 28,
      avgFocusTime: '52 min',
      topic: 'Data Structures',
      joined: false,
    },
    {
      id: 3,
      name: 'Programming Fundamentals',
      members: ['Alex', 'Emma', 'David'],
      activeNow: 1,
      totalSessions: 8,
      avgFocusTime: '38 min',
      topic: 'Basic Concepts Review',
      joined: false,
    },
  ];

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleJoinSquad = (squadId: number) => {
    setSelectedSquad(squadId);
    toast({
      title: 'Joined Squad!',
      description: 'You are now part of the study group. Start focusing!',
    });
  };

  const handleLeaveSquad = () => {
    setSelectedSquad(null);
    resetTimer();
    toast({
      title: 'Left Squad',
      description: 'You have left the study group.',
    });
  };

  const handleStartPomodoro = () => {
    startTimer();
    toast({
      title: 'Focus Session Started',
      description: 'Stay focused for the next 25 minutes!',
    });
  };

  const handlePausePomodoro = () => {
    pauseTimer();
    toast({
      title: 'Session Paused',
      description: 'Take a quick break and resume when ready.',
    });
  };

  const handleTeamChat = () => {
    window.open('https://zoom.us/join', '_blank');
    toast({
      title: 'Team Chat Opened',
      description: 'Opening Zoom for team coordination...',
    });
  };

  const handleSeeProgress = () => {
    toast({
      title: 'Progress Report',
      description: 'Total study time: 12 hours this week. Keep it up!',
    });
  };

  // Show timer completion notification
  React.useEffect(() => {
    if (pomodoroTime === 0 && selectedSquad) {
      toast({
        title: 'Pomodoro Complete!',
        description: 'Great job! Take a 5-minute break.',
      });
    }
  }, [pomodoroTime, selectedSquad]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">Silent Study Squads</h2>

      {selectedSquad ? (
        // Active Squad View
        <div className="space-y-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-[#2c2c2c]">
                {squads.find(s => s.id === selectedSquad)?.name}
              </h3>
              <Button
                onClick={handleLeaveSquad}
                variant="outline"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
              >
                Leave Squad
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8B4513]">
                  {squads.find(s => s.id === selectedSquad)?.activeNow}
                </div>
                <div className="text-[#666]">Active Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8B4513]">{currentCycle}</div>
                <div className="text-[#666]">Cycles Today</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-[#8B4513]">
                  {squads.find(s => s.id === selectedSquad)?.avgFocusTime}
                </div>
                <div className="text-[#666]">Avg Focus</div>
              </div>
            </div>

            {/* Pomodoro Timer */}
            <div className="text-center mb-6">
              <div className="text-6xl font-bold text-[#8B4513] mb-4">
                {formatTime(pomodoroTime)}
              </div>
              <div className="flex justify-center space-x-4">
                {!isRunning ? (
                  <Button
                    onClick={handleStartPomodoro}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  >
                    <Play className="w-5 h-5 mr-2" />
                    Start Focus
                  </Button>
                ) : (
                  <Button
                    onClick={handlePausePomodoro}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white"
                  >
                    <Pause className="w-5 h-5 mr-2" />
                    Pause
                  </Button>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <Button
                onClick={handleTeamChat}
                variant="outline"
                className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Team Chat
              </Button>
              <Button
                onClick={handleSeeProgress}
                variant="outline"
                className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
              >
                <BarChart className="w-4 h-4 mr-2" />
                See Progress
              </Button>
            </div>
          </Card>

          {/* Live Activity */}
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Live Squad Activity</h3>
            <div className="space-y-3">
              {squads.find(s => s.id === selectedSquad)?.members.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-[#fff3e6] rounded-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-[#8B4513] rounded-full flex items-center justify-center mr-3">
                      <span className="text-white text-sm">{member[0]}</span>
                    </div>
                    <span className="text-[#2c2c2c]">{member}</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2" />
                    <span className="text-[#666] text-sm">
                      {index < 2 ? 'Focusing' : 'Break'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      ) : (
        // Squad Selection View
        <div className="space-y-6">
          <Card className="p-6 bg-white">
            <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Available Study Squads</h3>
            <p className="text-[#666] mb-4">
              Join a silent study group to stay focused and motivated with your classmates.
            </p>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {squads.map((squad) => (
              <Card key={squad.id} className="p-6 bg-white">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-[#2c2c2c] mb-2">
                    {squad.name}
                  </h3>
                  <p className="text-[#666] text-sm mb-3">{squad.topic}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#666]">Members:</span>
                      <span className="text-[#2c2c2c]">{squad.members.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Active now:</span>
                      <span className="text-green-600 font-semibold">{squad.activeNow}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Sessions:</span>
                      <span className="text-[#2c2c2c]">{squad.totalSessions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#666]">Avg Focus:</span>
                      <span className="text-[#2c2c2c]">{squad.avgFocusTime}</span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-[#2c2c2c] mb-2">Members:</h4>
                  <div className="flex flex-wrap gap-1">
                    {squad.members.map((member, index) => (
                      <span key={index} className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] text-xs rounded">
                        {member}
                      </span>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => handleJoinSquad(squad.id)}
                  className="w-full bg-[#8B4513] hover:bg-[#654321] text-white"
                  disabled={squad.joined}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {squad.joined ? 'Already Joined' : 'Join Squad'}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudySquads;
