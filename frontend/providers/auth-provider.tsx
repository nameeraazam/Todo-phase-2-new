'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { getSession, setSession, clearSession, Session } from '@/lib/auth/session';

interface AuthContextType {
  user: any | null;
  token: string | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  signIn: (userData: any, token: string) => Promise<void>;
  signUp: (userData: any, token: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSessionState] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize session on component mount
    const initializeSession = async () => {
      try {
        const currentSession = await getSession();
        setSessionState(currentSession);
      } catch (error) {
        console.error('Error initializing session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeSession();
  }, []);

  const signIn = async (userData: any, token: string) => {
    try {
      const newSession: Session = {
        user: userData,
        token,
      };

      await setSession(newSession);
      setSessionState(newSession);
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  const signUp = async (userData: any, token: string) => {
    try {
      const newSession: Session = {
        user: userData,
        token,
      };

      await setSession(newSession);
      setSessionState(newSession);
    } catch (error) {
      console.error('Error signing up:', error);
      throw error;
    }
  };

  const signOut = async () => {
    try {
      await clearSession();
      setSessionState(null);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user: session?.user || null,
    token: session?.token || null,
    isLoading,
    isLoggedIn: !!session?.user,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}