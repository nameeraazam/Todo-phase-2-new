'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    // If user is authenticated, redirect to dashboard
    // Otherwise, redirect to signin page
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/signin');
    }
  }, [user, router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <p>Redirecting...</p>
    </div>
  );
}