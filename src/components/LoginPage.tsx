
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { User, Lock, BookOpen } from 'lucide-react';

interface LoginPageProps {
  onLogin: (userData: { name: string; role: 'student' | 'professor' | 'dean' }) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (username === 'kayra' && password === '12') {
      toast({
        title: "Welcome to Boosty!",
        description: "Successfully logged in as student",
      });
      onLogin({ name: username, role: 'student' });
    } else if (username === 'irmak' && password === '23') {
      toast({
        title: "Welcome Professor!",
        description: "Successfully logged in as professor",
      });
      onLogin({ name: username, role: 'professor' });
    } else if (username === 'eylul' && password === '34') {
      toast({
        title: "Welcome Dean!",
        description: "Successfully logged in as dean",
      });
      onLogin({ name: username, role: 'dean' });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid credentials. Try: kayra/12 (student), irmak/23 (professor), or eylul/34 (dean)",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-12 h-12 text-[#8B4513] mr-2" />
            <h1 className="text-4xl font-bold text-[#2c2c2c]">Boosty</h1>
          </div>
          <p className="text-[#666] text-lg">Ultimate University Learning Platform</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[#2c2c2c] font-medium">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-3 w-5 h-5 text-[#666]" />
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                className="pl-10 h-12 border-2 border-[#e0e0e0] focus:border-[#8B4513] rounded-lg"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[#2c2c2c] font-medium">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-[#666]" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="pl-10 h-12 border-2 border-[#e0e0e0] focus:border-[#8B4513] rounded-lg"
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 bg-[#8B4513] hover:bg-[#654321] text-white font-semibold rounded-lg transition-colors"
          >
            Login to Boosty
          </Button>
        </form>

      </div>
    </div>
  );
};

export default LoginPage;
