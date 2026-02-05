import { NextRequest } from 'next/server';
import { User } from '@/types';

// Mock user database (in a real app, this would be a real database)
const mockUsers: User[] = [
  { 
    id: '1', 
    name: 'John Doe', 
    email: 'john@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  { 
    id: '2', 
    name: 'Jane Smith', 
    email: 'jane@example.com',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
];

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // In a real application, you would validate credentials against a database
    // For this demo, we'll just check if the user exists and return a mock response
    const user = mockUsers.find(u => u.email === email);

    if (!user) {
      return Response.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // In a real app, you would verify the password here
    // For this demo, we'll assume the password is correct if the email exists
    
    // Create a mock JWT token (in a real app, this would be a real JWT)
    const token = `mock-jwt-token-${user.id}`;

    return Response.json({
      user,
      token,
      message: 'Sign in successful'
    });
  } catch (error) {
    console.error('Signin error:', error);
    return Response.json(
      { error: 'An error occurred during sign in' },
      { status: 500 }
    );
  }
}