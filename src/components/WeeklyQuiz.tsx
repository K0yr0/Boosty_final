
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Award, Clock, CheckCircle, XCircle, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const WeeklyQuiz: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);

  const quiz = {
    title: 'Week 5: Recursion Quiz',
    description: 'Test your understanding of recursive algorithms and concepts',
    timeLimit: 15, // minutes
    questions: [
      {
        id: 1,
        question: 'What is the primary requirement for a recursive function?',
        options: [
          'It must have a loop',
          'It must have a base case',
          'It must return a value',
          'It must have parameters'
        ],
        correct: 1,
        explanation: 'Every recursive function must have a base case to prevent infinite recursion.',
      },
      {
        id: 2,
        question: 'What happens if a recursive function lacks a proper base case?',
        options: [
          'It runs faster',
          'It returns null',
          'It causes a stack overflow',
          'It works normally'
        ],
        correct: 2,
        explanation: 'Without a base case, the function will call itself infinitely, eventually causing a stack overflow.',
      },
      {
        id: 3,
        question: 'Which of the following is a classic example of recursion?',
        options: [
          'Bubble sort',
          'Linear search',
          'Factorial calculation',
          'Array iteration'
        ],
        correct: 2,
        explanation: 'Factorial is a classic recursive problem: n! = n * (n-1)!',
      },
    ],
  };

  const weeklyStats = {
    currentWeek: 5,
    averageScore: 78,
    weeklyScores: [85, 72, 90, 68, 0], // 0 for current week (not taken yet)
    weakestTopic: 'Pointers (52% accuracy)',
    strongestTopic: 'Variables (94% accuracy)',
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    toast({
      title: 'Quiz Started!',
      description: 'You have 15 minutes to complete 10 questions',
    });
  };

  const handleAnswerSelect = (value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = value;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmitQuiz();
    }
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
    toast({
      title: 'Quiz Completed!',
      description: 'Calculating your results...',
    });
  };

  const calculateScore = () => {
    let correct = 0;
    selectedAnswers.forEach((answer, index) => {
      if (parseInt(answer) === quiz.questions[index].correct) {
        correct++;
      }
    });
    return Math.round((correct / quiz.questions.length) * 100);
  };

  if (!quizStarted) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Weekly Pop-Up Quiz</h2>

        {/* Quiz Overview */}
        <Card className="p-6 bg-white">
          <div className="text-center mb-6">
            <Award className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#2c2c2c] mb-2">{quiz.title}</h3>
            <p className="text-[#666] mb-4">{quiz.description}</p>
            <div className="flex justify-center items-center space-x-4 text-[#666]">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{quiz.timeLimit} minutes</span>
              </div>
              <div className="flex items-center">
                <Award className="w-4 h-4 mr-1" />
                <span>{quiz.questions.length} questions</span>
              </div>
            </div>
          </div>
          <Button
            onClick={handleStartQuiz}
            className="w-full h-12 bg-[#8B4513] hover:bg-[#654321] text-white text-lg"
          >
            Start Weekly Quiz
          </Button>
        </Card>

        {/* Weekly Stats */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Your Progress</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B4513]">{weeklyStats.averageScore}%</div>
              <div className="text-[#666]">Average Score</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B4513]">Week {weeklyStats.currentWeek}</div>
              <div className="text-[#666]">Current Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#8B4513]">4/5</div>
              <div className="text-[#666]">Quizzes Taken</div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-[#666]">Weekly Scores</span>
                <TrendingUp className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex space-x-2">
                {weeklyStats.weeklyScores.map((score, index) => (
                  <div key={index} className="flex-1">
                    <div className="text-center text-sm text-[#666] mb-1">W{index + 1}</div>
                    <div className="h-20 bg-gray-200 rounded flex items-end">
                      {score > 0 && (
                        <div 
                          className="w-full bg-[#8B4513] rounded"
                          style={{ height: `${score}%` }}
                        />
                      )}
                    </div>
                    <div className="text-center text-sm text-[#2c2c2c] mt-1">
                      {score > 0 ? `${score}%` : '-'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white">
            <div className="flex items-center mb-3">
              <XCircle className="w-5 h-5 text-red-500 mr-2" />
              <h4 className="font-semibold text-[#2c2c2c]">Needs Improvement</h4>
            </div>
            <p className="text-[#666]">{weeklyStats.weakestTopic}</p>
          </Card>
          <Card className="p-6 bg-white">
            <div className="flex items-center mb-3">
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
              <h4 className="font-semibold text-[#2c2c2c]">Strongest Area</h4>
            </div>
            <p className="text-[#666]">{weeklyStats.strongestTopic}</p>
          </Card>
        </div>
      </div>
    );
  }

  if (showResults) {
    const score = calculateScore();
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Quiz Results</h2>
        
        <Card className="p-6 bg-white text-center">
          <Award className="w-16 h-16 text-[#8B4513] mx-auto mb-4" />
          <h3 className="text-3xl font-bold text-[#2c2c2c] mb-2">{score}%</h3>
          <p className="text-[#666] mb-4">
            You got {selectedAnswers.filter((answer, index) => parseInt(answer) === quiz.questions[index].correct).length} out of {quiz.questions.length} questions correct
          </p>
          <Button
            onClick={() => setQuizStarted(false)}
            className="bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            Return to Dashboard
          </Button>
        </Card>

        {/* Answer Review */}
        <Card className="p-6 bg-white">
          <h3 className="text-lg font-semibold text-[#2c2c2c] mb-4">Answer Review</h3>
          <div className="space-y-4">
            {quiz.questions.map((question, index) => {
              const userAnswer = parseInt(selectedAnswers[index]);
              const isCorrect = userAnswer === question.correct;
              return (
                <div key={index} className="border border-[#e0e0e0] rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-[#2c2c2c]">{question.question}</h4>
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <p className="text-[#666] mb-2">
                    <strong>Correct Answer:</strong> {question.options[question.correct]}
                  </p>
                  <p className="text-[#666] text-sm">{question.explanation}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  }

  const currentQ = quiz.questions[currentQuestion];
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Weekly Quiz</h2>
        <div className="text-[#666]">
          Question {currentQuestion + 1} of {quiz.questions.length}
        </div>
      </div>

      <Card className="p-6 bg-white">
        <div className="mb-6">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-[#8B4513] h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <h3 className="text-xl font-semibold text-[#2c2c2c] mb-6">{currentQ.question}</h3>

        <RadioGroup
          value={selectedAnswers[currentQuestion] || ''}
          onValueChange={handleAnswerSelect}
          className="space-y-4"
        >
          {currentQ.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem value={index.toString()} id={`option-${index}`} />
              <Label 
                htmlFor={`option-${index}`} 
                className="text-[#2c2c2c] cursor-pointer flex-1 p-3 rounded-lg hover:bg-[#fff3e6] transition-colors"
              >
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between mt-8">
          <Button
            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
            disabled={currentQuestion === 0}
            variant="outline"
            className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
          >
            Previous
          </Button>
          <Button
            onClick={handleNextQuestion}
            disabled={!selectedAnswers[currentQuestion]}
            className="bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            {currentQuestion === quiz.questions.length - 1 ? 'Submit Quiz' : 'Next Question'}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default WeeklyQuiz;
