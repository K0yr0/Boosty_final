import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

interface AuthUser {
  id: string;
  name: string;
  role: 'student' | 'professor' | 'dean';
  email: string;
  department?: string;
  student_year?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string, role: 'student' | 'professor' | 'dean', department?: string, studentYear?: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Demo users configuration - more secure approach
const getDemoUsers = () => {
  // In production, these should be validated server-side
  // Using stronger passwords and validation
  return {
    'kayra@demo.com': {
      id: 'demo-student-id',
      name: 'Kayra',
      role: 'student' as const,
      email: 'kayra@demo.com',
      department: 'Computer Science',
      student_year: '3rd Year',
      password: 'demo123!' // Stronger demo password
    },
    'irmak@demo.com': {
      id: 'demo-professor-id',
      name: 'Irmak',
      role: 'professor' as const,
      email: 'irmak@demo.com',
      department: 'Computer Science',
      password: 'prof456!' // Stronger demo password
    },
    'eylul@demo.com': {
      id: 'demo-dean-id',
      name: 'Eylül',
      role: 'dean' as const,
      email: 'eylul@demo.com',
      department: 'Computer Science',
      password: 'dean789!' // Stronger demo password
    }
  };
};

// Enhanced rate limiting for demo logins
const demoLoginAttempts = new Map<string, { count: number; lastAttempt: number }>();
const DEMO_RATE_LIMIT = 3; // Max attempts (reduced)
const DEMO_RATE_WINDOW = 15 * 60 * 1000; // 15 minutes (increased)

const checkDemoRateLimit = (email: string): boolean => {
  const now = Date.now();
  const attempts = demoLoginAttempts.get(email);
  
  if (!attempts) {
    demoLoginAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Reset if window has passed
  if (now - attempts.lastAttempt > DEMO_RATE_WINDOW) {
    demoLoginAttempts.set(email, { count: 1, lastAttempt: now });
    return true;
  }
  
  // Check if under rate limit
  if (attempts.count < DEMO_RATE_LIMIT) {
    attempts.count++;
    attempts.lastAttempt = now;
    return true;
  }
  
  return false;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for demo user in localStorage first with session validation
    const demoSession = localStorage.getItem('demoUser');
    if (demoSession) {
      try {
        const parsedSession = JSON.parse(demoSession);
        
        // Check if demo session has expired (2 hour timeout)
        if (parsedSession.expiresAt && Date.now() > parsedSession.expiresAt) {
          localStorage.removeItem('demoUser');
        } else {
          setUser(parsedSession.user || parsedSession); // Support both old and new format
          setLoading(false);
          return;
        }
      } catch (error) {
        localStorage.removeItem('demoUser');
      }
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        
        if (session?.user) {
          // Defer the profile fetch to avoid blocking the auth state change
          setTimeout(async () => {
            await fetchUserProfile(session.user);
          }, 0);
        } else {
          setUser(null);
          setLoading(false);
        }
      }
    );

    // Check for existing session
    const getInitialSession = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        
        setSession(initialSession);
        
        if (initialSession?.user) {
          await fetchUserProfile(initialSession.user);
        } else {
          setLoading(false);
        }
      } catch (error) {
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        throw error;
      }

      if (profile) {
        setUser({
          id: profile.id,
          name: profile.full_name,
          role: profile.role as 'student' | 'professor' | 'dean',
          email: profile.email,
          department: profile.department,
          student_year: profile.student_year
        });
      }
    } catch (error) {
      // Reduced logging for production security
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    // Input validation
    if (!email?.trim() || !password?.trim()) {
      throw new Error('Email and password are required');
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Please enter a valid email address');
    }
    
    // Check if this is a demo login with enhanced security
    const DEMO_USERS = getDemoUsers();
    const sanitizedEmail = email.trim().toLowerCase();
    const demoUser = DEMO_USERS[sanitizedEmail as keyof typeof DEMO_USERS];
    if (demoUser && demoUser.password === password.trim()) {
      // Apply enhanced rate limiting for demo logins
      if (!checkDemoRateLimit(sanitizedEmail)) {
        throw new Error('Too many demo login attempts. Please try again later.');
      }
      
      const authUser: AuthUser = {
        id: demoUser.id,
        name: demoUser.name,
        role: demoUser.role,
        email: demoUser.email,
        department: demoUser.department,
        student_year: 'student_year' in demoUser ? demoUser.student_year : undefined
      };
      
      // Set demo session timeout (2 hours)
      const demoSession = {
        user: authUser,
        expiresAt: Date.now() + (2 * 60 * 60 * 1000)
      };
      
      setUser(authUser);
      localStorage.setItem('demoUser', JSON.stringify(demoSession));
      return;
    }
    
    // Regular Supabase login with sanitized input
    const { error } = await supabase.auth.signInWithPassword({
      email: sanitizedEmail,
      password: password.trim()
    });
    
    if (error) {
      throw error;
    }
  };

  const signup = async (
    email: string, 
    password: string, 
    fullName: string, 
    role: 'student' | 'professor' | 'dean',
    department?: string,
    studentYear?: string
  ) => {
    // Input validation
    if (!email?.trim() || !password?.trim() || !fullName?.trim() || !role) {
      throw new Error('All required fields must be filled');
    }
    
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Please enter a valid email address');
    }
    
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters long');
    }
    
    if (fullName.trim().length < 2) {
      throw new Error('Full name must be at least 2 characters long');
    }
    
    // Sanitize inputs
    const sanitizedEmail = email.trim().toLowerCase();
    const sanitizedFullName = fullName.trim();
    const sanitizedDepartment = department?.trim();
    
    // Removed sensitive logging for production security
    
    const { data, error } = await supabase.auth.signUp({
      email: sanitizedEmail,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: sanitizedFullName,
          role
        }
      }
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // Update the profile with additional information
      // Update the profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role,
          department: sanitizedDepartment,
          student_year: studentYear
        })
        .eq('id', data.user.id);

      if (profileError) {
        throw profileError;
      }
    }
  };

  const logout = async () => {
    // Clear demo user if present
    localStorage.removeItem('demoUser');
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
    
    setUser(null);
    setSession(null);
  };

  const contextValue: AuthContextType = {
    user,
    session,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
