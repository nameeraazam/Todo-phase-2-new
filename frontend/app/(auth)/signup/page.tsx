'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import SignupForm from '@/components/auth/signup-form';

import { signup } from '@/lib/api/auth';

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { signIn: contextSignIn, isLoading } = useAuth();

  const handleSubmit = async (userData: { email: string; password: string; name: string }) => {
    try {
      setError(null);

      // Call the backend API to register the user using the helper
      const data = await signup(userData);

      // Store user data and token in context
      await contextSignIn(data.user, data.token);

      // Redirect to dashboard after successful signup
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>
        
        <SignupForm onSubmit={handleSubmit} isLoading={isLoading} />
        
        {error && (
          <div className="rounded-md bg-red-50 p-4 mt-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}
        
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}