import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Brain, Search, Tag, AlertTriangle, CheckCircle, Download, Lightbulb } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const AINotesPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('week5');
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [generatedNotes, setGeneratedNotes] = useState<string[]>([]);

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
      aiNotes: [
        'Base cases are the most critical part of recursion - they determine when to stop calling the function recursively. Without proper base cases, your program will crash with a stack overflow.',
        'Stack overflow occurs when too many function calls are stacked on top of each other. This happens when recursion goes too deep or lacks proper termination conditions.',
        'Think of recursion like a mirror facing another mirror - it creates infinite reflections unless you put something in between to stop it. That "something" is your base case.',
      ]
    },
    week4: {
      title: 'Week 4: Arrays & Loops',
      confusionPeaks: [
        { topic: 'Nested loops', percentage: 65 },
        { topic: 'Array indexing', percentage: 45 },
      ],
      strongUnderstanding: [
        { topic: 'For loops', percentage: 88 },
        { topic: 'Array declaration', percentage: 82 },
      ],
      summary: [
        'Arrays store multiple values in a single variable',
        'Loops allow repeated execution of code blocks',
        'Array indexing starts at 0 in most programming languages',
        'Nested loops are useful for 2D data structures',
      ],
      flashcards: [
        {
          question: 'What is the first index of an array?',
          answer: 'The first index of an array is 0.',
        },
        {
          question: 'What is a nested loop?',
          answer: 'A loop inside another loop, often used for processing 2D arrays.',
        },
      ],
      aiNotes: [
        'Nested loops can be tricky - the inner loop runs completely for each iteration of the outer loop. If outer loop runs 3 times and inner loop runs 4 times, total iterations = 3 × 4 = 12.',
        'Array indexing confusion often comes from thinking arrays start at 1. Remember: first element is at index 0, last element is at index (length - 1).',
      ]
    },
    week3: {
      title: 'Week 3: Functions',
      confusionPeaks: [
        { topic: 'Return statements', percentage: 58 },
        { topic: 'Function parameters', percentage: 42 },
      ],
      strongUnderstanding: [
        { topic: 'Function calls', percentage: 85 },
        { topic: 'Function naming', percentage: 79 },
      ],
      summary: [
        'Functions are reusable blocks of code',
        'Functions can accept parameters and return values',
        'Good function names describe what the function does',
        'Functions help organize code and reduce repetition',
      ],
      flashcards: [
        {
          question: 'What is a function parameter?',
          answer: 'A variable that receives a value when the function is called.',
        },
        {
          question: 'What does a return statement do?',
          answer: 'It sends a value back to the code that called the function.',
        },
      ],
      aiNotes: [
        'Return statements immediately exit the function and send a value back. Code after a return statement in the same block will never execute.',
        'Function parameters are like placeholders - they receive actual values (arguments) when the function is called.',
      ]
    },
    week2: {
      title: 'Week 2: Variables',
      confusionPeaks: [
        { topic: 'Variable scope', percentage: 67 },
        { topic: 'Data types', percentage: 52 },
      ],
      strongUnderstanding: [
        { topic: 'Variable declaration', percentage: 91 },
        { topic: 'Variable assignment', percentage: 87 },
      ],
      summary: [
        'Variables store data values in memory',
        'Different data types serve different purposes',
        'Variable scope determines where variables can be accessed',
        'Good variable names make code more readable',
      ],
      flashcards: [
        {
          question: 'What is variable scope?',
          answer: 'The region of code where a variable can be accessed.',
        },
        {
          question: 'Name three common data types',
          answer: 'Integer, string, and boolean.',
        },
      ],
      aiNotes: [
        'Variable scope determines visibility - global variables can be accessed anywhere, local variables only within their function or block.',
        'Data type confusion often happens when mixing numbers and strings. "5" + 3 might give "53" instead of 8 in some languages.',
      ]
    },
    week1: {
      title: 'Week 1: Introduction',
      confusionPeaks: [
        { topic: 'Programming concepts', percentage: 78 },
        { topic: 'IDE setup', percentage: 61 },
      ],
      strongUnderstanding: [
        { topic: 'Basic syntax', percentage: 73 },
        { topic: 'Hello World', percentage: 95 },
      ],
      summary: [
        'Programming is giving instructions to computers',
        'IDEs provide tools to write and run code',
        'Syntax rules must be followed for code to work',
        'Every programmer starts with "Hello World"',
      ],
      flashcards: [
        {
          question: 'What is an IDE?',
          answer: 'Integrated Development Environment - software for writing and debugging code.',
        },
        {
          question: 'What is syntax in programming?',
          answer: 'The set of rules that define valid code structure in a programming language.',
        },
      ],
      aiNotes: [
        'Programming concepts can seem abstract at first, but think of it like giving directions to someone who follows instructions very literally.',
        'IDE setup issues are common for beginners - most problems come from incorrect installation or missing dependencies.',
      ]
    },
  };

  const currentNotes = notesData[selectedWeek as keyof typeof notesData];

  if (!currentNotes) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-[#2c2c2c]">AI Notes & Highlights</h2>
        </div>
        <Card className="p-6 bg-white text-center">
          <p className="text-[#666]">No data available for the selected week.</p>
        </Card>
      </div>
    );
  }

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Notes for ' + currentNotes.title);
    link.download = `${currentNotes.title.replace(/\s+/g, '_')}_notes.txt`;
    link.click();
    
    toast({
      title: 'Notes Downloaded',
      description: 'PDF saved to your downloads folder',
    });
  };

  const handleGenerateFlashcards = () => {
    const newFlashcard = {
      question: `What strategies help with ${currentNotes.confusionPeaks[0]?.topic}?`,
      answer: `Focus on understanding the fundamental concept step by step. Practice with simple examples before moving to complex scenarios.`
    };
    
    currentNotes.flashcards.push(newFlashcard);
    
    toast({
      title: 'Flashcard Generated!',
      description: `New flashcard created for ${currentNotes.confusionPeaks[0]?.topic}`,
    });
  };

  const handleGenerateAINotes = () => {
    setGeneratedNotes(currentNotes.aiNotes || []);
    toast({
      title: 'AI Notes Generated!',
      description: 'Smart notes created based on confusion areas',
    });
  };

  const handleFlipCard = (index: number) => {
    setFlippedCards(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">AI Notes & Highlights</h2>
        <div className="flex space-x-2">
          <Button
            onClick={handleGenerateAINotes}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Generate AI Notes
          </Button>
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

      {/* AI Generated Notes */}
      {generatedNotes.length > 0 && (
        <Card className="p-6 bg-white">
          <div className="flex items-center mb-4">
            <Lightbulb className="w-6 h-6 text-blue-600 mr-2" />
            <h3 className="text-lg font-semibold text-[#2c2c2c]">AI-Generated Study Notes</h3>
          </div>
          <div className="space-y-3">
            {generatedNotes.map((note, index) => (
              <div key={index} className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-[#2c2c2c]">{note}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

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
            <div 
              key={index} 
              className="border border-[#e0e0e0] rounded-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 h-40"
              onClick={() => handleFlipCard(index)}
            >
              <div className="relative h-full bg-gradient-to-br from-[#fff3e6] to-[#f0e6d2] p-4 flex items-center justify-center">
                <div className="text-center">
                  {!flippedCards.includes(index) ? (
                    <>
                      <div className="text-xs text-[#8B4513] mb-2 font-semibold">QUESTION</div>
                      <p className="text-[#2c2c2c] text-sm font-medium">{card.question}</p>
                      <p className="text-xs text-[#8B4513] mt-3 opacity-75">Click to reveal answer</p>
                    </>
                  ) : (
                    <>
                      <div className="text-xs text-[#8B4513] mb-2 font-semibold">ANSWER</div>
                      <p className="text-[#2c2c2c] text-sm">{card.answer}</p>
                      <p className="text-xs text-[#8B4513] mt-3 opacity-75">Click to see question</p>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AINotesPage;
