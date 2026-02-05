'use client';

import { useAuth } from '@/providers/auth-provider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If user is not logged in and not loading, redirect to login
    if (!isLoading && !isLoggedIn) {
      router.push('/signin');
    }
  }, [isLoggedIn, isLoading, router]);

  // Show loading state while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // If user is logged in, show the protected content
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // If user is not logged in and not loading, show nothing (redirect effect will happen)
  return null;
}