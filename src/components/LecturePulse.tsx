import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Frown, Meh, Smile, TrendingUp, Users, Clock, Send } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface LecturePulseProps {
  userRole: 'student' | 'professor';
}

const LecturePulse: React.FC<LecturePulseProps> = ({ userRole }) => {
  const [currentSlide, setCurrentSlide] = useState(12);
  const [isLiveSession, setIsLiveSession] = useState(userRole === 'student' ? true : false);
  const [feedbackCounts, setFeedbackCounts] = useState({
    confused: 0,
    unsure: 0,
    gotIt: 0,
  });
  const [hasVotedThisSlide, setHasVotedThisSlide] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');

  const totalStudents = 45;

  const handleFeedback = (type: 'confused' | 'unsure' | 'gotIt') => {
    if (hasVotedThisSlide) {
      toast({
        title: 'Already Voted',
        description: 'You can only vote once per slide',
        variant: "destructive",
      });
      return;
    }

    setFeedbackCounts(prev => ({
      ...prev,
      [type]: prev[type] + 1,
    }));
    
    setHasVotedThisSlide(true);
    
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
    if (userRole !== 'professor') {
      toast({
        title: 'Access Denied',
        description: 'Only professors can start live sessions',
        variant: "destructive",
      });
      return;
    }

    setIsLiveSession(!isLiveSession);
    if (!isLiveSession) {
      setFeedbackCounts({ confused: 0, unsure: 0, gotIt: 0 });
      setHasVotedThisSlide(false);
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

  const nextSlide = () => {
    if (userRole !== 'professor') return;
    setCurrentSlide(prev => prev + 1);
    setHasVotedThisSlide(false);
    setFeedbackCounts({ confused: 0, unsure: 0, gotIt: 0 });
  };

  const handleQuestionSubmit = () => {
    if (!newQuestion.trim()) {
      toast({
        title: 'Error',
        description: 'Please enter a question before submitting',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'Question Submitted',
      description: 'Your question has been sent to the professor',
    });
    setNewQuestion('');
  };

  const confusionPercentage = Math.round((feedbackCounts.confused / totalStudents) * 100);
  const understandingPercentage = Math.round((feedbackCounts.gotIt / totalStudents) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-bold text-[#2c2c2c]">Lecture Pulse</h2>
        <div className="flex space-x-2">
          {userRole === 'professor' && (
            <>
              <Button
                onClick={nextSlide}
                disabled={!isLiveSession}
                className="bg-blue-500 hover:bg-blue-600 text-white text-xs md:text-sm px-2 md:px-4"
              >
                Next Slide
              </Button>
              <Button
                onClick={toggleSession}
                className={`${
                  isLiveSession 
                    ? 'bg-red-500 hover:bg-red-600' 
                    : 'bg-[#8B4513] hover:bg-[#654321]'
                } text-white text-xs md:text-sm px-2 md:px-4`}
              >
                {isLiveSession ? 'End Session' : 'Start Live Session'}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Live Session Status */}
      <Card className="p-4 md:p-6 bg-white">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base md:text-lg font-semibold text-[#2c2c2c]">
            CS101 - Introduction to Algorithms
          </h3>
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${isLiveSession ? 'bg-green-500' : 'bg-gray-400'}`} />
            <span className="text-[#666] text-sm">{isLiveSession ? 'LIVE' : 'OFFLINE'}</span>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 md:gap-4 mb-4">
          <div className="text-center">
            <Users className="w-5 h-5 md:w-6 md:h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-[#2c2c2c]">{totalStudents}</div>
            <div className="text-[#666] text-xs md:text-sm">Students Online</div>
          </div>
          <div className="text-center">
            <Clock className="w-5 h-5 md:w-6 md:h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-[#2c2c2c]">Slide {currentSlide}</div>
            <div className="text-[#666] text-xs md:text-sm">Current Position</div>
          </div>
          <div className="text-center">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#8B4513] mx-auto mb-2" />
            <div className="text-lg md:text-xl font-bold text-[#2c2c2c]">{confusionPercentage}%</div>
            <div className="text-[#666] text-xs md:text-sm">Confusion Level</div>
          </div>
        </div>
      </Card>

      {/* Student Feedback Panel */}
      {userRole === 'student' && (
        <Card className="p-4 md:p-6 bg-white">
          <h3 className="text-base md:text-lg font-semibold text-[#2c2c2c] mb-4">Quick Feedback</h3>
          {hasVotedThisSlide && (
            <div className="mb-4 p-3 bg-green-100 border border-green-300 rounded-lg">
              <span className="text-green-600 text-sm">✅ Vote submitted for Slide {currentSlide}</span>
            </div>
          )}
          <div className="grid grid-cols-3 gap-2 md:gap-4">
            <Button
              onClick={() => handleFeedback('confused')}
              disabled={!isLiveSession || hasVotedThisSlide}
              className="h-16 md:h-20 bg-red-100 hover:bg-red-200 text-red-600 border border-red-300 flex flex-col items-center justify-center text-xs md:text-sm"
              variant="outline"
            >
              <Frown className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
              <span>Confused</span>
              <span className="text-xs">({feedbackCounts.confused})</span>
            </Button>
            <Button
              onClick={() => handleFeedback('unsure')}
              disabled={!isLiveSession || hasVotedThisSlide}
              className="h-16 md:h-20 bg-yellow-100 hover:bg-yellow-200 text-yellow-600 border border-yellow-300 flex flex-col items-center justify-center text-xs md:text-sm"
              variant="outline"
            >
              <Meh className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
              <span>Unsure</span>
              <span className="text-xs">({feedbackCounts.unsure})</span>
            </Button>
            <Button
              onClick={() => handleFeedback('gotIt')}
              disabled={!isLiveSession || hasVotedThisSlide}
              className="h-16 md:h-20 bg-green-100 hover:bg-green-200 text-green-600 border border-green-300 flex flex-col items-center justify-center text-xs md:text-sm"
              variant="outline"
            >
              <Smile className="w-6 h-6 md:w-8 md:h-8 mb-1 md:mb-2" />
              <span>Got It!</span>
              <span className="text-xs">({feedbackCounts.gotIt})</span>
            </Button>
          </div>
        </Card>
      )}

      {/* Ask Question Section */}
      {userRole === 'student' && (
        <Card className="p-4 md:p-6 bg-white">
          <h3 className="text-base md:text-lg font-semibold text-[#2c2c2c] mb-4">Ask a Question</h3>
          <div className="space-y-3">
            <textarea
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="Type your question here..."
              className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none resize-none text-sm md:text-base"
              rows={3}
            />
            <Button
              onClick={handleQuestionSubmit}
              className="bg-[#8B4513] hover:bg-[#654321] text-white w-full sm:w-auto text-sm md:text-base"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit Question
            </Button>
          </div>
        </Card>
      )}

      {/* Real-time Analytics */}
      <Card className="p-4 md:p-6 bg-white">
        <h3 className="text-base md:text-lg font-semibold text-[#2c2c2c] mb-4">Live Analytics</h3>
        
        {confusionPercentage > 60 && isLiveSession && (
          <div className="bg-red-100 border border-red-300 rounded-lg p-4 mb-4">
            <div className="flex items-center">
              <Frown className="w-5 h-5 text-red-600 mr-2" />
              <span className="text-red-600 font-semibold text-sm md:text-base">
                High Confusion Alert: {confusionPercentage}% of students are confused
              </span>
            </div>
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-2">
              <span className="text-[#666] text-sm md:text-base">Understanding Level</span>
              <span className="text-[#2c2c2c] font-semibold text-sm md:text-base">{understandingPercentage}%</span>
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
              <span className="text-[#666] text-sm md:text-base">Confusion Level</span>
              <span className="text-[#2c2c2c] font-semibold text-sm md:text-base">{confusionPercentage}%</span>
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

      {/* Top Questions with Answers */}
      <Card className="p-4 md:p-6 bg-white">
        <h3 className="text-base md:text-lg font-semibold text-[#2c2c2c] mb-4">Top 3 Questions (Post-Lecture)</h3>
        <div className="space-y-4">
          <div className="p-4 bg-[#fff3e6] rounded-lg">
            <div className="font-medium text-[#2c2c2c] mb-2 text-sm md:text-base">1. What's the difference between recursion and iteration?</div>
            <div className="text-[#666] text-xs md:text-sm">Answer: Recursion involves a function calling itself, while iteration uses loops. Recursion can be more elegant for certain problems but may use more memory due to function call stack.</div>
          </div>
          <div className="p-4 bg-[#fff3e6] rounded-lg">
            <div className="font-medium text-[#2c2c2c] mb-2 text-sm md:text-base">2. How do you determine the base case in recursion?</div>
            <div className="text-[#666] text-xs md:text-sm">Answer: The base case is the simplest version of the problem that can be solved directly without further recursion. It prevents infinite loops and provides the stopping condition.</div>
          </div>
          <div className="p-4 bg-[#fff3e6] rounded-lg">
            <div className="font-medium text-[#2c2c2c] mb-2 text-sm md:text-base">3. Can you show more examples of recursive algorithms?</div>
            <div className="text-[#666] text-xs md:text-sm">Answer: Common examples include factorial calculation, Fibonacci sequence, tree traversal, binary search, and tower of Hanoi problem.</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LecturePulse;
