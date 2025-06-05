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

// Demo users data
const DEMO_USERS = {
  'kayra@demo.com': {
    id: 'demo-student-id',
    name: 'Kayra',
    role: 'student' as const,
    email: 'kayra@demo.com',
    department: 'Computer Science',
    student_year: '3rd Year',
    password: '12'
  },
  'irmak@demo.com': {
    id: 'demo-professor-id',
    name: 'Irmak',
    role: 'professor' as const,
    email: 'irmak@demo.com',
    department: 'Computer Science',
    password: '23'
  },
  'eylul@demo.com': {
    id: 'demo-dean-id',
    name: 'Eylül',
    role: 'dean' as const,
    email: 'eylul@demo.com',
    department: 'Computer Science',
    password: '34'
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('AuthProvider: Setting up auth listener');
    
    // Check for demo user in localStorage first
    const demoUser = localStorage.getItem('demoUser');
    if (demoUser) {
      try {
        const parsedUser = JSON.parse(demoUser);
        setUser(parsedUser);
        setLoading(false);
        return;
      } catch (error) {
        console.error('Error parsing demo user:', error);
        localStorage.removeItem('demoUser');
      }
    }
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.id);
        
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
        console.log('Initial session:', initialSession?.user?.id);
        
        setSession(initialSession);
        
        if (initialSession?.user) {
          await fetchUserProfile(initialSession.user);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    return () => {
      console.log('AuthProvider: Cleaning up auth listener');
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (authUser: User) => {
    try {
      console.log('Fetching profile for user:', authUser.id);
      
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (profile) {
        console.log('Profile found:', profile);
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
      console.error('Error in fetchUserProfile:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    console.log('Attempting login for:', email);
    
    // Check if this is a demo login
    const demoUser = DEMO_USERS[email as keyof typeof DEMO_USERS];
    if (demoUser && demoUser.password === password) {
      console.log('Demo login successful');
      const authUser: AuthUser = {
        id: demoUser.id,
        name: demoUser.name,
        role: demoUser.role,
        email: demoUser.email,
        department: demoUser.department,
        student_year: 'student_year' in demoUser ? demoUser.student_year : undefined
      };
      setUser(authUser);
      localStorage.setItem('demoUser', JSON.stringify(authUser));
      return;
    }
    
    // Regular Supabase login
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) {
      console.error('Login error:', error);
      throw error;
    }
    
    console.log('Login successful');
  };

  const signup = async (
    email: string, 
    password: string, 
    fullName: string, 
    role: 'student' | 'professor' | 'dean',
    department?: string,
    studentYear?: string
  ) => {
    console.log('Attempting signup for:', email, role);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          full_name: fullName
        }
      }
    });

    if (error) {
      console.error('Signup error:', error);
      throw error;
    }

    if (data.user) {
      console.log('User created, updating profile');
      // Update the profile with additional information
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          role,
          department,
          student_year: studentYear
        })
        .eq('id', data.user.id);

      if (profileError) {
        console.error('Profile update error:', profileError);
        throw profileError;
      }
    }
    
    console.log('Signup successful');
  };

  const logout = async () => {
    console.log('Attempting logout');
    
    // Clear demo user if present
    localStorage.removeItem('demoUser');
    
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
    
    setUser(null);
    setSession(null);
    
    console.log('Logout successful');
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
