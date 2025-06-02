
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageCircle, Check, X, Clock, User } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const QuestionsAndAnswers: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'answered' | 'unanswered'>('all');
  const [questions, setQuestions] = useState([
    {
      id: 1,
      student: 'Kayra',
      question: 'Can you explain the difference between tail recursion and regular recursion?',
      timestamp: '2 hours ago',
      answered: false,
      answer: '',
      topic: 'Recursion',
    },
    {
      id: 2,
      student: 'Ada',
      question: 'What are the best practices for avoiding stack overflow in recursive functions?',
      timestamp: '4 hours ago',
      answered: true,
      answer: 'To avoid stack overflow: 1) Always ensure you have a proper base case, 2) Make sure each recursive call moves closer to the base case, 3) Consider using iterative solutions for deep recursion, 4) Use tail recursion when possible.',
      topic: 'Recursion',
    },
    {
      id: 3,
      student: 'James',
      question: 'How do I know when to use arrays versus other data structures?',
      timestamp: '1 day ago',
      answered: true,
      answer: 'Use arrays when: 1) You need fast random access to elements, 2) The size is relatively fixed, 3) You need contiguous memory allocation. Consider other structures like lists for dynamic sizing or trees for hierarchical data.',
      topic: 'Arrays',
    },
    {
      id: 4,
      student: 'Sarah',
      question: 'Could you provide more examples of recursive vs iterative solutions?',
      timestamp: '1 day ago',
      answered: false,
      answer: '',
      topic: 'Recursion',
    },
    {
      id: 5,
      student: 'Eylül',
      question: 'What is the time complexity of nested loops with different sizes?',
      timestamp: '2 days ago',
      answered: false,
      answer: '',
      topic: 'Loops',
    },
  ]);

  const [answerTexts, setAnswerTexts] = useState<{ [key: number]: string }>({});

  const filteredQuestions = questions.filter(q => {
    if (filter === 'answered') return q.answered;
    if (filter === 'unanswered') return !q.answered;
    return true;
  });

  const handleAnswerSubmit = (questionId: number) => {
    const answerText = answerTexts[questionId];
    if (!answerText || answerText.trim() === '') {
      toast({
        title: 'Error',
        description: 'Please enter an answer before submitting',
        variant: 'destructive',
      });
      return;
    }

    setQuestions(prev => prev.map(q => 
      q.id === questionId 
        ? { ...q, answered: true, answer: answerText }
        : q
    ));

    setAnswerTexts(prev => ({ ...prev, [questionId]: '' }));

    toast({
      title: 'Answer Submitted',
      description: 'Your answer has been posted and the student will be notified',
    });
  };

  const handleAnswerChange = (questionId: number, text: string) => {
    setAnswerTexts(prev => ({ ...prev, [questionId]: text }));
  };

  const unansweredCount = questions.filter(q => !q.answered).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Questions & Answers</h2>
        <div className="flex items-center space-x-2">
          <span className="text-[#666]">{unansweredCount} unanswered questions</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <Card className="p-4 bg-white">
        <div className="flex space-x-2">
          <Button
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'default' : 'outline'}
            className={filter === 'all' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}
          >
            All Questions ({questions.length})
          </Button>
          <Button
            onClick={() => setFilter('unanswered')}
            variant={filter === 'unanswered' ? 'default' : 'outline'}
            className={filter === 'unanswered' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}
          >
            Unanswered ({unansweredCount})
          </Button>
          <Button
            onClick={() => setFilter('answered')}
            variant={filter === 'answered' ? 'default' : 'outline'}
            className={filter === 'answered' ? 'bg-[#8B4513] hover:bg-[#654321] text-white' : 'border-[#8B4513] text-[#8B4513]'}
          >
            Answered ({questions.length - unansweredCount})
          </Button>
        </div>
      </Card>

      {/* Questions List */}
      <div className="space-y-4">
        {filteredQuestions.map((question) => (
          <Card key={question.id} className="p-6 bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-[#8B4513] rounded-full flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#2c2c2c]">{question.student}</div>
                  <div className="flex items-center text-[#666] text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {question.timestamp}
                    <span className="mx-2">•</span>
                    <span className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] rounded text-xs">
                      {question.topic}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                {question.answered ? (
                  <div className="flex items-center text-green-600">
                    <Check className="w-5 h-5 mr-1" />
                    <span className="text-sm">Answered</span>
                  </div>
                ) : (
                  <div className="flex items-center text-red-600">
                    <X className="w-5 h-5 mr-1" />
                    <span className="text-sm">Pending</span>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-medium text-[#2c2c2c] mb-2">Question:</h3>
              <p className="text-[#666] bg-[#f9f9f9] p-3 rounded-lg">{question.question}</p>
            </div>

            {question.answered ? (
              <div>
                <h4 className="font-medium text-[#2c2c2c] mb-2">Your Answer:</h4>
                <p className="text-[#666] bg-green-50 p-3 rounded-lg border border-green-200">
                  {question.answer}
                </p>
              </div>
            ) : (
              <div>
                <h4 className="font-medium text-[#2c2c2c] mb-2">Write Answer:</h4>
                <div className="space-y-3">
                  <textarea
                    value={answerTexts[question.id] || ''}
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full p-3 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none resize-none"
                    rows={4}
                  />
                  <Button
                    onClick={() => handleAnswerSubmit(question.id)}
                    className="bg-[#8B4513] hover:bg-[#654321] text-white"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Submit Answer
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {filteredQuestions.length === 0 && (
        <Card className="p-6 bg-white text-center">
          <MessageCircle className="w-12 h-12 text-[#8B4513] mx-auto mb-4" />
          <p className="text-[#666]">No questions found for the current filter.</p>
        </Card>
      )}
    </div>
  );
};

export default QuestionsAndAnswers;
