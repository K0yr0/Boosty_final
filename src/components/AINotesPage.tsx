
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, Search, Tag, AlertTriangle, CheckCircle, Download } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AINotesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('week5');

  const notesData = {
    week5: {
      title: 'Week 5: Recursion',
      confusionPeaks: [
        { topic: 'Base cases', percentage: 72 },
        { topic: 'Stack overflow', percentage: 58 },
      ],
      strongUnderstanding: [
        { topic: 'Recursive calls', percentage: 89 },
        { topic: 'Function parameters', percentage: 76 },
      ],
      summary: [
        'Recursion is a programming technique where a function calls itself',
        'Every recursive function needs a base case to prevent infinite loops',
        'Recursive solutions often mirror mathematical definitions',
        'Common examples include factorial, fibonacci, and tree traversal',
      ],
      flashcards: [
        {
          question: 'What is a base case in recursion?',
          answer: 'A condition that stops the recursive calls and returns a value without making further recursive calls.',
        },
        {
          question: 'What happens without a base case?',
          answer: 'The function will call itself infinitely, leading to a stack overflow error.',
        },
        {
          question: 'Name three common recursive algorithms',
          answer: 'Factorial calculation, Fibonacci sequence, and binary tree traversal.',
        },
      ],
    },
  };

  const currentNotes = notesData[selectedWeek as keyof typeof notesData];

  const handleDownload = () => {
    toast({
      title: 'Notes Downloaded',
      description: 'PDF saved to your downloads folder',
    });
  };

  const handleGenerateFlashcards = () => {
    toast({
      title: 'Flashcards Generated',
      description: 'New flashcards created based on confusion data',
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">AI Notes & Highlights</h2>
        <div className="flex space-x-2">
          <Button
            onClick={handleGenerateFlashcards}
            className="bg-[#8B4513] hover:bg-[#654321] text-white"
          >
            <Brain className="w-4 h-4 mr-2" />
            Generate Flashcards
          </Button>
          <Button
            onClick={handleDownload}
            variant="outline"
            className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Search and Filter */}
      <Card className="p-4 bg-white">
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-[#666]" />
            <Input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-[#e0e0e0] focus:border-[#8B4513]"
            />
          </div>
          <select
            value={selectedWeek}
            onChange={(e) => setSelectedWeek(e.target.value)}
            className="px-4 py-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none"
          >
            <option value="week5">Week 5: Recursion</option>
            <option value="week4">Week 4: Arrays & Loops</option>
            <option value="week3">Week 3: Functions</option>
            <option value="week2">Week 2: Variables</option>
            <option value="week1">Week 1: Introduction</option>
          </select>
        </div>
      </Card>

      {/* Confusion Analysis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-white">
          <div className="flex items-center mb-4">
            <AlertTriangle className="w-6 h-6 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-[#2c2c2c]">High Confusion Areas</h3>
          </div>
          <div className="space-y-3">
            {currentNotes.confusionPeaks.map((item, index) => (
              <div key={index} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[#2c2c2c] font-medium">{item.topic}</span>
                  <span className="text-red-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-white">
          <div className="flex items-center mb-4">
            <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
            <h3 className="text-lg font-semibold text-[#2c2c2c]">Strong Understanding</h3>
          </div>
          <div className="space-y-3">
            {currentNotes.strongUnderstanding.map((item, index) => (
              <div key={index} className="p-3 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-[#2c2c2c] font-medium">{item.topic}</span>
                  <span className="text-green-600 font-semibold">{item.percentage}%</span>
                </div>
                <div className="w-full bg-green-200 rounded-full h-2 mt-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Lecture Summary */}
      <Card className="p-6 bg-white">
        <div className="flex items-center mb-4">
          <Tag className="w-6 h-6 text-[#8B4513] mr-2" />
          <h3 className="text-lg font-semibold text-[#2c2c2c]">{currentNotes.title} - Summary</h3>
        </div>
        <div className="space-y-3">
          {currentNotes.summary.map((point, index) => (
            <div key={index} className="flex items-start">
              <div className="w-2 h-2 bg-[#8B4513] rounded-full mt-2 mr-3 flex-shrink-0" />
              <span className="text-[#2c2c2c]">{point}</span>
            </div>
          ))}
        </div>
      </Card>

      {/* AI-Generated Flashcards */}
      <Card className="p-6 bg-white">
        <div className="flex items-center mb-4">
          <Brain className="w-6 h-6 text-[#8B4513] mr-2" />
          <h3 className="text-lg font-semibold text-[#2c2c2c]">AI-Generated Flashcards</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentNotes.flashcards.map((card, index) => (
            <div key={index} className="border border-[#e0e0e0] rounded-lg overflow-hidden">
              <div className="bg-[#fff3e6] p-4">
                <h4 className="font-medium text-[#2c2c2c] mb-2">Question:</h4>
                <p className="text-[#666]">{card.question}</p>
              </div>
              <div className="p-4 bg-white">
                <h4 className="font-medium text-[#2c2c2c] mb-2">Answer:</h4>
                <p className="text-[#666]">{card.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AINotesPage;
