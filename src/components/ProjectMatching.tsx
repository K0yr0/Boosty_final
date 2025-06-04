
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Calendar, Clock, MessageCircle, BarChart, UserPlus, Check, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import TeamChat from './TeamChat';

const ProjectMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'myTeams' | 'requests'>('projects');
  const [showChat, setShowChat] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<{ name: string; members: string[] } | null>(null);

  const projects = [
    {
      id: 1,
      name: 'AI-Powered Tutoring System',
      description: 'Develop an intelligent tutoring system that adapts to individual student needs and provides personalized learning experiences.',
      skills: ['Python', 'Machine Learning', 'NLP', 'React'],
      teamSize: 4,
      timeline: '6 months',
      difficulty: 'Advanced',
    },
    {
      id: 2,
      name: 'Blockchain-Based Voting Platform',
      description: 'Create a secure and transparent voting platform using blockchain technology to ensure fair and verifiable elections.',
      skills: ['Blockchain', 'Solidity', 'Cryptography', 'Web3.js'],
      teamSize: 5,
      timeline: '8 months',
      difficulty: 'Expert',
    },
    {
      id: 3,
      name: 'Sustainable Energy Management App',
      description: 'Design a mobile app to help users track and reduce their energy consumption, promoting sustainable living and environmental awareness.',
      skills: ['React Native', 'UI/UX Design', 'Firebase', 'Data Analysis'],
      teamSize: 3,
      timeline: '4 months',
      difficulty: 'Intermediate',
    },
  ];

  const myTeams = [
    {
      id: 101,
      name: 'Eco Warriors',
      members: ['Kayra', 'Eylül', 'James'],
      startDate: '2024-02-01',
      project: 'Sustainable Energy Management App',
    },
    {
      id: 102,
      name: 'Code Alchemists',
      members: ['Ada', 'Sarah', 'Mike'],
      startDate: '2024-01-15',
      project: 'AI-Powered Tutoring System',
    },
  ];

  const requests = [
    {
      id: 1,
      projectName: 'E-Commerce Platform',
      requesterName: 'Sarah',
      message: 'Hi! I saw your skills and think you\'d be perfect for our team. We need someone with React experience.',
      timestamp: '2 hours ago',
      skills: ['React', 'Node.js', 'MongoDB'],
    },
    {
      id: 2,
      projectName: 'Mobile Fitness App',
      requesterName: 'Mike',
      message: 'Would you like to join our mobile app development team? We could use your frontend skills.',
      timestamp: '1 day ago',
      skills: ['React Native', 'UI/UX', 'Firebase'],
    },
  ];

  const handleAcceptRequest = (requestId: number) => {
    toast({
      title: 'Request Accepted',
      description: 'You have joined the team! Check your teams tab.',
    });
  };

  const handleDeclineRequest = (requestId: number) => {
    toast({
      title: 'Request Declined',
      description: 'The request has been declined.',
    });
  };

  const handleTeamChat = (teamName: string, members: string[]) => {
    setSelectedTeam({ name: teamName, members });
    setShowChat(true);
  };

  const handleViewProgress = () => {
    toast({
      title: 'Team Progress',
      description: 'Task completion: 65%, Next deadline: March 15th',
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-2 sm:p-0">
      <h2 className="text-xl sm:text-2xl font-bold text-[#2c2c2c] px-2 sm:px-0">Project Matching</h2>

      {/* Tabs */}
      <Card className="p-3 sm:p-4 bg-white mx-2 sm:mx-0">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
          <Button
            onClick={() => setActiveTab('projects')}
            variant={activeTab === 'projects' ? 'default' : 'outline'}
            className={`w-full sm:w-auto text-sm ${activeTab === 'projects' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}`}
          >
            Available Projects
          </Button>
          <Button
            onClick={() => setActiveTab('myTeams')}
            variant={activeTab === 'myTeams' ? 'default' : 'outline'}
            className={`w-full sm:w-auto text-sm ${activeTab === 'myTeams' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}`}
          >
            My Teams
          </Button>
          <Button
            onClick={() => setActiveTab('requests')}
            variant={activeTab === 'requests' ? 'default' : 'outline'}
            className={`w-full sm:w-auto text-sm ${activeTab === 'requests' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}`}
          >
            Requests Received
          </Button>
        </div>
      </Card>

      {/* Content based on active tab */}
      {activeTab === 'projects' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
          {projects.map((project) => (
            <Card key={project.id} className="p-4 sm:p-6 bg-white">
              <h3 className="text-base sm:text-lg font-semibold text-[#2c2c2c] mb-2">{project.name}</h3>
              <p className="text-[#666] mb-4 text-sm sm:text-base">{project.description}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#2c2c2c] mb-2">Skills Required:</h4>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] text-xs sm:text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#666]">Team Size:</span>
                  <span className="text-[#2c2c2c]">{project.teamSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Timeline:</span>
                  <span className="text-[#2c2c2c]">{project.timeline}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#666]">Difficulty:</span>
                  <span className="text-[#2c2c2c]">{project.difficulty}</span>
                </div>
              </div>

              <Button className="w-full mt-4 bg-[#8B4513] hover:bg-[#654321] text-white text-sm sm:text-base">
                <UserPlus className="w-4 h-4 mr-2" />
                Join Project
              </Button>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'myTeams' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 px-2 sm:px-0">
          {myTeams.map((team) => (
            <Card key={team.id} className="p-4 sm:p-6 bg-white">
              <h3 className="text-base sm:text-lg font-semibold text-[#2c2c2c] mb-2">{team.name}</h3>
              <p className="text-[#666] mb-4 text-sm sm:text-base">Project: {team.project}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#2c2c2c] mb-2">Members:</h4>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member, index) => (
                    <span key={index} className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] text-xs sm:text-sm rounded">
                      {member}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-sm mb-4">
                <div className="flex justify-between">
                  <span className="text-[#666]">Start Date:</span>
                  <span className="text-[#2c2c2c]">{team.startDate}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button
                  onClick={() => handleTeamChat(team.name, team.members)}
                  variant="outline"
                  className="flex-1 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white text-sm"
                >
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Team Chat
                </Button>
                <Button
                  onClick={handleViewProgress}
                  variant="outline"
                  className="flex-1 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white text-sm"
                >
                  <BarChart className="w-4 h-4 mr-1" />
                  View Progress
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'requests' && (
        <div className="space-y-4 px-2 sm:px-0">
          {requests.map((request) => (
            <Card key={request.id} className="p-4 sm:p-6 bg-white">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-4 space-y-2 sm:space-y-0">
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-[#2c2c2c] mb-1">{request.projectName}</h3>
                  <p className="text-[#666] text-sm">Request from: {request.requesterName}</p>
                  <p className="text-[#666] text-xs">{request.timestamp}</p>
                </div>
              </div>

              <p className="text-[#666] mb-4 text-sm sm:text-base">{request.message}</p>

              <div className="mb-4">
                <h4 className="text-sm font-medium text-[#2c2c2c] mb-2">Required Skills:</h4>
                <div className="flex flex-wrap gap-2">
                  {request.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] text-xs sm:text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                <Button
                  onClick={() => handleAcceptRequest(request.id)}
                  className="bg-green-500 hover:bg-green-600 text-white text-sm"
                >
                  <Check className="w-4 h-4 mr-1" />
                  Accept
                </Button>
                <Button
                  onClick={() => handleDeclineRequest(request.id)}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white text-sm"
                >
                  <X className="w-4 h-4 mr-1" />
                  Decline
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Team Chat Modal */}
      {showChat && selectedTeam && (
        <TeamChat
          teamName={selectedTeam.name}
          members={selectedTeam.members}
          onClose={() => setShowChat(false)}
        />
      )}
    </div>
  );
};

export default ProjectMatching;
