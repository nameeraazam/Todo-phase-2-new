import { NextRequest } from 'next/server';
import { User } from '@/types';

// Mock user database (in a real app, this would be a real database)
let mockUsers: User[] = [
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
    const { email, password, name } = await request.json();

    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    
    if (existingUser) {
      return Response.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // In a real application, you would hash the password and save to database
    // For this demo, we'll create a mock user
    const newUser: User = {
      id: `${mockUsers.length + 1}`,
      name,
      email,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    mockUsers.push(newUser);

    // Create a mock JWT token (in a real app, this would be a real JWT)
    const token = `mock-jwt-token-${newUser.id}`;

    return Response.json({
      user: newUser,
      token,
      message: 'Sign up successful'
    });
  } catch (error) {
    console.error('Signup error:', error);
    return Response.json(
      { error: 'An error occurred during sign up' },
      { status: 500 }
    );
  }
}