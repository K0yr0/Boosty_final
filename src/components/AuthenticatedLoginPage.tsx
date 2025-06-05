
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { BookOpen, User, Mail, Lock, GraduationCap } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

const AuthenticatedLoginPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<'student' | 'professor' | 'dean'>('student');
  const [department, setDepartment] = useState('');
  const [studentYear, setStudentYear] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
        toast({
          title: 'Welcome back!',
          description: 'You have successfully logged in.',
        });
      } else {
        await signup(email, password, fullName, role, department || undefined, studentYear || undefined);
        toast({
          title: 'Account created!',
          description: 'Please check your email to verify your account.',
        });
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fff3e6] to-[#ffe0cc] flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 md:p-8 bg-white/95 backdrop-blur-sm shadow-xl">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-[#8B4513] mr-2" />
            <h1 className="text-2xl font-bold text-[#2c2c2c]">Boosty</h1>
          </div>
          <p className="text-[#666] text-sm">
            {isLogin ? 'Welcome back! Please sign in to continue.' : 'Create your account to get started.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
                  <Input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="pl-10"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                  Role
                </label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value as 'student' | 'professor' | 'dean')}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                    required
                  >
                    <option value="student">Student</option>
                    <option value="professor">Professor</option>
                    <option value="dean">Dean</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                  Department
                </label>
                <Input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  placeholder="e.g., Computer Science"
                />
              </div>

              {role === 'student' && (
                <div>
                  <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
                    Year of Study
                  </label>
                  <select
                    value={studentYear}
                    onChange={(e) => setStudentYear(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#8B4513] focus:border-transparent"
                  >
                    <option value="">Select year</option>
                    <option value="1st Year">1st Year</option>
                    <option value="2nd Year">2nd Year</option>
                    <option value="3rd Year">3rd Year</option>
                    <option value="4th Year">4th Year</option>
                    <option value="Graduate">Graduate</option>
                  </select>
                </div>
              )}
            </>
          )}

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#2c2c2c] mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#666]" />
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[#8B4513] hover:bg-[#654321] text-white py-2 px-4 rounded-md transition-colors"
          >
            {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
          </Button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-[#8B4513] hover:underline text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
      </Card>
    </div>
  );
};

export default AuthenticatedLoginPage;
