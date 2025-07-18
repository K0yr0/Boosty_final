
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Send, User } from 'lucide-react';

interface TeamChatProps {
  teamName: string;
  members: string[];
  onClose: () => void;
}

const TeamChat: React.FC<TeamChatProps> = ({ teamName, members, onClose }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Ada',
      message: 'Hey everyone! Ready to work on our project?',
      timestamp: '2 minutes ago',
    },
    {
      id: 2,
      sender: 'James',
      message: 'Yes! I\'ve already started working on the frontend part.',
      timestamp: '1 minute ago',
    },
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      sender: 'You',
      message: message,
      timestamp: 'Just now',
    };

    setMessages([...messages, newMessage]);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2 sm:p-4">
      <Card className="w-full max-w-md h-[95vh] sm:h-96 bg-white flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-[#e0e0e0] bg-white rounded-t-lg">
          <h3 className="text-sm sm:text-lg font-semibold text-[#2c2c2c] truncate">{teamName}</h3>
          <Button onClick={onClose} variant="ghost" size="sm" className="flex-shrink-0">
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Members */}
        <div className="px-3 sm:px-4 py-2 border-b border-[#e0e0e0] bg-gray-50">
          <div className="flex flex-wrap gap-1">
            {members.map((member, index) => (
              <span key={index} className="px-2 py-1 bg-[#fff3e6] text-[#8B4513] text-xs rounded">
                {member}
              </span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-3 bg-white">
          {messages.map((msg) => (
            <div key={msg.id} className="space-y-1">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#8B4513] rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#2c2c2c] truncate">{msg.sender}</span>
                <span className="text-xs text-[#666] flex-shrink-0">{msg.timestamp}</span>
              </div>
              <div className="ml-8 text-xs sm:text-sm text-[#666] break-words leading-relaxed">{msg.message}</div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 sm:p-4 border-t border-[#e0e0e0] bg-white rounded-b-lg">
          <div className="flex space-x-2">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-2 border border-[#e0e0e0] rounded-lg focus:border-[#8B4513] focus:outline-none resize-none text-xs sm:text-sm"
              rows={2}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-[#8B4513] hover:bg-[#654321] text-white flex-shrink-0"
              size="sm"
            >
              <Send className="w-3 h-3 sm:w-4 sm:h-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default TeamChat;
