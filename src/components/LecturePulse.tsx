
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Frown, Meh, Smile, TrendingUp, Users, Clock } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LecturePulse: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(12);
  const [isLiveSession, setIsLiveSession] = useState(false);
  const [feedbackCounts, setFeedbackCounts] = useState({
    confused: 0,
    unsure: 0,
    gotIt: 0,
  });

  const totalStudents = 45;

  const handleFeedback = (type: 'confused' | 'unsure' | 'gotIt') => {
    setFeedbackCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    
    const messages = {
      confused: 'Feedback sent: Confused 😕',
      unsure: 'Feedback sent: Unsure 🤔',
      gotIt: 'Feedback sent: Got it! 🎯',
    };
    
    toast({
      title: messages[type],
      description: 'Your feedback helps improve the lecture!',
    });
  };

  const toggleSession = () => {
    setIsLiveSession(!isLiveSession);
    if (!isLiveSession) {
      setFeedbackCounts({ confused: 0, unsure: 0, gotIt: 0 });
      toast({
        title: 'Live Session Started',
        description: 'Students can now provide real-time feedback',
      });
    } else {
      toast({
        title: 'Session Ended',
        description: 'Feedback data saved for analysis',
      });
    }
  };

  const confusionPercentage = Math.round((feedbackCounts.confused / totalStudents) * 100);
  const understandingPercentage = Math.round((feedbackCounts.gotIt / totalStudents) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Lecture Pulse</h2>
        <Button
          onClick={toggleSession}
          className={`${
            isLiveSession 
              ? 'bg-red-500 hover:bg-red-600' 
              : 'bg-[#8B4513] hover:bg-[#654321]'
          } text-white`}
        >
          {isLiveSession ? 'End Session' : 'Start Live Session'}
        </Button>
      </div>

      {/* Live Session Status */}
      <Card className="p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-[#2c2c2c]">
            CS101 - Introduction to Algorithms
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLiveSession ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-[#666]">{isLiveSession ? 'LIVE' : 'OFFLINE'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="text-center">
            <Users className="w-6 h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-xl font-bold text-[#2c2c2c]">{totalStudents}</div>
            <div className="text-[#666]">Students Online</div>
          </div>
          <div className="text-center">
            <Clock className="w-6 h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-xl font-bold text-[#2c2c2c]">Slide {currentSlide}</div>
            <div className="text-[#666]">Current Position</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-6 h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-xl font-bold text-[#2c2c2c]">{confusionPercentage}%</div>
            <div className="text-[#666]">Confusion Level</div>
          </div>
        </div>
      </Card>

      {/* Student Feedback Panel */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Quick Feedback</h3>
        <div className="grid grid-cols-3 gap-4">
          <Button
            onClick={() => handleFeedback('confused')}
            disabled={!isLiveSession}
            className="h-20 bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 flex flex-col items-center justify-center"
            variant="outline"
          >
            <Frown className="w-8 h-8 mb-2" />
            <span>Confused</span>
            <span className="text-sm">({feedbackCounts.confused})</span>
          </Button>
          <Button
            onClick={() => handleFeedback('unsure')}
            disabled={!isLiveSession}
            className="h-20 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 border border-yellow-300 flex flex-col items-center justify-center"
            variant="outline"
          >
            <Meh className="w-8 h-8 mb-2" />
            <span>Unsure</span>
            <span className="text-sm">({feedbackCounts.unsure})</span>
          </Button>
          <Button
            onClick={() => handleFeedback('gotIt')}
            disabled={!isLiveSession}
            className="h-20 bg-green-100 hover:bg-green-200 text-green-600 border border-green-300 flex flex-col items-center justify-center"
            variant="outline"
          >
            <Smile className="w-8 h-8 mb-2" />
            <span>Got It!</span>
            <span className="text-sm">({feedbackCounts.gotIt})</span>
          </Button>
        </div>
      </Card>

      {/* Real-time Analytics */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Live Analytics</h3>
        
        {confusionPercentage > 60 && isLiveSession && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <Frown className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold">
                High Confusion Alert: {confusionPercentage}% of students are confused
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#666]">Understanding Level</span>
              <span className="text-[#2c2c2c] font-semibold">{understandingPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${understandingPercentage}%` }}
              />
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#666]">Confusion Level</span>
              <span className="text-[#2c2c2c] font-semibold">{confusionPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-red-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${confusionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Top Questions */}
      <Card className="p-6 bg-white">
        <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Top 3 Questions (Post-Lecture)</h3>
        <div className="space-y-3">
          <div className="p-3 bg-[#fff3e6] rounded-lg">
            <span className="text-[#2c2c2c] font-medium">1. What's the difference between recursion and iteration?</span>
          </div>
          <div className="p-3 bg-[#fff3e6] rounded-lg">
            <span className="text-[#2c2c2c] font-medium">2. How do you determine the base case in recursion?</span>
          </div>
          <div className="p-3 bg-[#fff3e6] rounded-lg">
            <span className="text-[#2c2c2c] font-medium">3. Can you show more examples of recursive algorithms?</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LecturePulse;
