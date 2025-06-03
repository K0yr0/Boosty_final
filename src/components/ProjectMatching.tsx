
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Star, MessageCircle, CheckCircle, TrendingUp, Clock, UserPlus } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const ProjectMatching: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'matches' | 'requests' | 'teams' | 'received'>('matches');

  const userProfile = {
    name: 'Kayra',
    class: 'AI01',
    averageScore: 85,
    skillBracket: 'A (85-100%)',
    strengths: ['Algorithms', 'Problem Solving', 'Team Leadership'],
    preferences: ['Different class groups', 'Similar skill level', 'Complementary strengths'],
  };

  const suggestedMatches = [
    {
      id: 1,
      name: 'Irmak',
      class: 'AI03',
      score: 90,
      skillBracket: 'A (85-100%)',
      strengths: ['Data Structures', 'Algorithm Design', 'Code Optimization'],
      matchPercentage: 95,
      projectExperience: 'Led 3 successful projects',
      commonInterests: ['Machine Learning', 'Web Development'],
    },
    {
      id: 2,
      name: 'Michael',
      class: 'AI02',
      score: 88,
      skillBracket: 'A (85-100%)',
      strengths: ['Frontend Development', 'UI/UX Design', 'Testing'],
      matchPercentage: 87,
      projectExperience: 'Strong in team collaboration',
      commonInterests: ['Web Development', 'Mobile Apps'],
    },
    {
      id: 3,
      name: 'Sophia',
      class: 'AI04',
      score: 92,
      skillBracket: 'A (85-100%)',
      strengths: ['Backend Development', 'Database Design', 'API Development'],
      matchPercentage: 91,
      projectExperience: '5+ completed projects',
      commonInterests: ['Backend Systems', 'Database Management'],
    },
  ];

  const activeRequests = [
    {
      id: 1,
      projectTitle: 'E-Commerce Website',
      course: 'Web Development',
      teamSize: '3-4 members',
      deadline: '2 weeks',
      requiredSkills: ['React', 'Node.js', 'Database'],
      description: 'Building a full-stack e-commerce platform with modern technologies',
      status: 'Looking for Backend Developer',
    },
    {
      id: 2,
      projectTitle: 'Mobile Learning App',
      course: 'Mobile Development',
      teamSize: '4-5 members',
      deadline: '3 weeks',
      requiredSkills: ['Flutter', 'Firebase', 'UI/UX'],
      description: 'Educational app for university students with gamification features',
      status: 'Looking for UI/UX Designer',
    },
  ];

  const receivedRequests = [
    {
      id: 1,
      from: 'Emma Thompson',
      projectTitle: 'Smart Campus System',
      message: 'Hi! We need someone with algorithm expertise for our IoT campus project. Would you like to join?',
      timeAgo: '2 hours ago',
      status: 'pending',
    },
    {
      id: 2,
      from: 'David Chen',
      projectTitle: 'AI Tutor Bot',
      message: 'Your problem-solving skills would be perfect for our AI project. Interested in collaborating?',
      timeAgo: '1 day ago',
      status: 'pending',
    },
    {
      id: 3,
      from: 'Lisa Rodriguez',
      projectTitle: 'Blockchain Voting',
      message: 'Looking for a team leader for our blockchain project. Your leadership experience caught our attention!',
      timeAgo: '3 days ago',
      status: 'pending',
    },
  ];

  const currentTeams = [
    {
      id: 1,
      projectTitle: 'AI Study Assistant',
      members: ['Kayra (You)', 'Irmak', 'Oliver'],
      progress: 65,
      nextMeeting: 'Tomorrow 2:00 PM',
      status: 'Active',
    },
    {
      id: 2,
      projectTitle: 'Campus Navigation System',
      members: ['Kayra (You)', 'Ada', 'Michael', 'Sophia'],
      progress: 30,
      nextMeeting: 'Friday 10:00 AM',
      status: 'Planning',
    },
  ];

  const handleSendMessage = (matchId: number) => {
    toast({
      title: 'Message Sent!',
      description: 'Your collaboration request has been sent',
    });
  };

  const handleJoinProject = (projectId: number) => {
    toast({
      title: 'Request Sent!',
      description: 'Project owner will review your application',
    });
  };

  const handleRequestResponse = (requestId: number, action: 'accept' | 'decline') => {
    const request = receivedRequests.find(r => r.id === requestId);
    if (action === 'accept') {
      toast({
        title: 'Request Accepted!',
        description: `You've joined ${request?.projectTitle}. Check your teams tab.`,
      });
    } else {
      toast({
        title: 'Request Declined',
        description: 'The request has been declined.',
      });
    }
  };

  const handleViewProgress = (teamId: number) => {
    const team = currentTeams.find(t => t.id === teamId);
    toast({
      title: 'Progress Report',
      description: `${team?.projectTitle}: ${team?.progress}% complete. On track for deadline.`,
    });
  };

  const handleTeamChat = (teamId: number) => {
    const team = currentTeams.find(t => t.id === teamId);
    window.open('https://discord.com', '_blank');
    toast({
      title: 'Team Chat Opened',
      description: `Opening chat for ${team?.projectTitle}`,
    });
  };

  const renderMatches = () => (
    <div className="space-y-6">
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Your Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-[#666] mb-2"><strong>Class:</strong> {userProfile.class}</p>
            <p className="text-[#666] mb-2"><strong>Average Score:</strong> {userProfile.averageScore}%</p>
            <p className="text-[#666] mb-2"><strong>Skill Bracket:</strong> {userProfile.skillBracket}</p>
          </div>
          <div>
            <p className="text-[#666] mb-2"><strong>Strengths:</strong></p>
            <div className="flex flex-wrap gap-2">
              {userProfile.strengths.map((strength, index) => (
                <Badge key={index} variant="secondary" className="bg-[#fff3e6] text-[#8B4513]">
                  {strength}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-[#2c2c2c]">Perfect Matches for You</h3>
        {suggestedMatches.map((match) => (
          <Card key={match.id} className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="text-xl font-semibold text-[#2c2c2c]">{match.name}</h4>
                <p className="text-[#666]">{match.class} • {match.skillBracket}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center mb-1">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span className="text-[#8B4513] font-semibold">{match.matchPercentage}% Match</span>
                </div>
                <p className="text-[#666] text-sm">Score: {match.score}%</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-[#666] mb-2"><strong>Strengths:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {match.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="border-[#8B4513] text-[#8B4513]">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[#666] mb-2"><strong>Common Interests:</strong></p>
                <div className="flex flex-wrap gap-2">
                  {match.commonInterests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="bg-green-100 text-green-700">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <p className="text-[#666] mb-4">{match.projectExperience}</p>

            <Button
              onClick={() => handleSendMessage(match.id)}
              className="w-full bg-[#8B4513] hover:bg-[#654321] text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Send Collaboration Request
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderRequests = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#2c2c2c]">Available Projects</h3>
      {activeRequests.map((request) => (
        <Card key={request.id} className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-[#2c2c2c]">{request.projectTitle}</h4>
              <p className="text-[#666]">{request.course}</p>
            </div>
            <Badge className="bg-blue-100 text-blue-700">{request.status}</Badge>
          </div>

          <p className="text-[#666] mb-4">{request.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-[#666] mb-1"><strong>Team Size:</strong></p>
              <p className="text-[#2c2c2c]">{request.teamSize}</p>
            </div>
            <div>
              <p className="text-[#666] mb-1"><strong>Deadline:</strong></p>
              <p className="text-[#2c2c2c]">{request.deadline}</p>
            </div>
            <div>
              <p className="text-[#666] mb-1"><strong>Required Skills:</strong></p>
              <div className="flex flex-wrap gap-1">
                {request.requiredSkills.map((skill, index) => (
                  <Badge key={index} variant="outline" className="border-[#8B4513] text-[#8B4513]">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <Button
            onClick={() => handleJoinProject(request.id)}
            className="w-full bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            <Users className="w-4 h-4 mr-2" />
            Request to Join
          </Button>
        </Card>
      ))}
    </div>
  );

  const renderReceivedRequests = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#2c2c2c]">Collaboration Requests</h3>
      {receivedRequests.map((request) => (
        <Card key={request.id} className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-lg font-semibold text-[#2c2c2c]">{request.projectTitle}</h4>
              <p className="text-[#666]">From: {request.from}</p>
              <div className="flex items-center mt-1">
                <Clock className="w-4 h-4 text-[#666] mr-1" />
                <span className="text-[#666] text-sm">{request.timeAgo}</span>
              </div>
            </div>
            <Badge className="bg-yellow-100 text-yellow-700">{request.status}</Badge>
          </div>

          <p className="text-[#2c2c2c] mb-4 italic">"{request.message}"</p>

          <div className="flex space-x-2">
            <Button
              onClick={() => handleRequestResponse(request.id, 'accept')}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Accept
            </Button>
            <Button
              onClick={() => handleRequestResponse(request.id, 'decline')}
              variant="outline"
              className="flex-1 border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
            >
              Decline
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTeams = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-[#2c2c2c]">Your Active Teams</h3>
      {currentTeams.map((team) => (
        <Card key={team.id} className="p-6 bg-white">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h4 className="text-xl font-semibold text-[#2c2c2c]">{team.projectTitle}</h4>
              <p className="text-[#666]">Members: {team.members.join(', ')}</p>
            </div>
            <Badge className={`${
              team.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
            }`}>
              {team.status}
            </Badge>
          </div>

          <div className="mb-4">
            <div className="flex justify-between mb-2">
              <span className="text-[#666]">Progress</span>
              <span className="text-[#2c2c2c] font-semibold">{team.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-[#8B4513] h-3 rounded-full transition-all duration-500"
                style={{ width: `${team.progress}%` }}
              />
            </div>
          </div>

          <p className="text-[#666] mb-4">
            <strong>Next Meeting:</strong> {team.nextMeeting}
          </p>

          <div className="flex space-x-2">
            <Button
              onClick={() => handleViewProgress(team.id)}
              className="flex-1 bg-[#8B4513] hover:bg-[#654321] text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              View Progress
            </Button>
            <Button
              onClick={() => handleTeamChat(team.id)}
              variant="outline"
              className="flex-1 border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Team Chat
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#2c2c2c]">Smart Project Matching</h2>

      {/* Tab Navigation */}
      <div className="flex space-x-4 border-b border-[#e0e0e0]">
        <button
          onClick={() => setActiveTab('matches')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'matches'
              ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
              : 'text-[#666] hover:text-[#2c2c2c]'
          }`}
        >
          Perfect Matches
        </button>
        <button
          onClick={() => setActiveTab('requests')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'requests'
              ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
              : 'text-[#666] hover:text-[#2c2c2c]'
          }`}
        >
          Project Requests
        </button>
        <button
          onClick={() => setActiveTab('received')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'received'
              ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
              : 'text-[#666] hover:text-[#2c2c2c]'
          }`}
        >
          Requests Received
        </button>
        <button
          onClick={() => setActiveTab('teams')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'teams'
              ? 'text-[#8B4513] border-b-2 border-[#8B4513]'
              : 'text-[#666] hover:text-[#2c2c2c]'
          }`}
        >
          My Teams
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'matches' && renderMatches()}
      {activeTab === 'requests' && renderRequests()}
      {activeTab === 'received' && renderReceivedRequests()}
      {activeTab === 'teams' && renderTeams()}
    </div>
  );
};

export default ProjectMatching;
