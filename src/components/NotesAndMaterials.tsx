
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { FileText, Upload, Download, Plus, Calendar } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const NotesAndMaterials: React.FC = () => {
  const [selectedWeek, setSelectedWeek] = useState('week5');

  const materials = {
    week5: {
      title: 'Week 5: Recursion',
      lectureNotes: [
        { name: 'Recursion Fundamentals.pdf', size: '2.3 MB', uploaded: '2024-01-15' },
        { name: 'Base Cases Examples.docx', size: '1.1 MB', uploaded: '2024-01-15' },
      ],
      assignments: [
        { name: 'Recursive Algorithm Assignment.pdf', size: '856 KB', uploaded: '2024-01-16' },
        { name: 'Fibonacci Implementation.zip', size: '124 KB', uploaded: '2024-01-16' },
      ],
      supplementary: [
        { name: 'Recursion Video Tutorial.mp4', size: '45.2 MB', uploaded: '2024-01-14' },
        { name: 'Practice Problems.pdf', size: '1.8 MB', uploaded: '2024-01-14' },
      ],
    },
    week4: {
      title: 'Week 4: Arrays & Loops',
      lectureNotes: [
        { name: 'Arrays Introduction.pdf', size: '1.9 MB', uploaded: '2024-01-08' },
        { name: 'Loop Structures.docx', size: '967 KB', uploaded: '2024-01-08' },
      ],
      assignments: [
        { name: 'Array Manipulation Assignment.pdf', size: '743 KB', uploaded: '2024-01-09' },
      ],
      supplementary: [
        { name: 'Array Methods Reference.pdf', size: '1.2 MB', uploaded: '2024-01-07' },
      ],
    },
  };

  const currentMaterials = materials[selectedWeek as keyof typeof materials];

  const handleUpload = (category: string) => {
    // Simulate file upload
    toast({
      title: 'File Upload',
      description: `Upload functionality for ${category} will be available soon`,
    });
  };

  const handleDownload = (fileName: string) => {
    // Simulate file download
    toast({
      title: 'Download Started',
      description: `Downloading ${fileName}...`,
    });
  };

  const MaterialSection = ({ title, materials, category }: { title: string; materials: any[]; category: string }) => (
    <Card className="p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-[#2c2c2c]">{title}</h3>
        <Button
          onClick={() => handleUpload(category)}
          size="sm"
          className="bg-[#8B4513] hover:bg-[#654321] text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add
        </Button>
      </div>
      <div className="space-y-3">
        {materials.map((file, index) => (
          <div key={index} className="flex items-center justify-between p-3 border border-[#e0e0e0] rounded-lg hover:bg-[#fff3e6] transition-colors">
            <div className="flex items-center">
              <FileText className="w-5 h-5 text-[#8B4513] mr-3" />
              <div>
                <div className="font-medium text-[#2c2c2c]">{file.name}</div>
                <div className="text-sm text-[#666]">{file.size} • {file.uploaded}</div>
              </div>
            </div>
            <Button
              onClick={() => handleDownload(file.name)}
              size="sm"
              variant="outline"
              className="border-[#8B4513] text-[#8B4513] hover:bg-[#8B4513] hover:text-white"
            >
              <Download className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-[#2c2c2c]">Notes & Materials</h2>
        <Button
          onClick={() => handleUpload('new')}
          className="bg-[#8B4513] hover:bg-[#654321] text-white"
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload New Material
        </Button>
      </div>

      {/* Week Selection */}
      <Card className="p-4 bg-white">
        <div className="flex items-center space-x-4">
          <Calendar className="w-5 h-5 text-[#8B4513]" />
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
          <span className="text-[#666]">Select week to manage materials</span>
        </div>
      </Card>

      {currentMaterials ? (
        <div className="space-y-6">
          <MaterialSection
            title="Lecture Notes"
            materials={currentMaterials.lectureNotes}
            category="lecture-notes"
          />
          <MaterialSection
            title="Assignments"
            materials={currentMaterials.assignments}
            category="assignments"
          />
          <MaterialSection
            title="Supplementary Materials"
            materials={currentMaterials.supplementary}
            category="supplementary"
          />
        </div>
      ) : (
        <Card className="p-6 bg-white text-center">
          <p className="text-[#666]">No materials available for the selected week.</p>
        </Card>
      )}
    </div>
  );
};

export default NotesAndMaterials;
