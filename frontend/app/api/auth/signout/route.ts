import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // In a real application, you would invalidate the JWT token on the server
    // For this demo, we'll just return a success response
    
    return Response.json({
      message: 'Sign out successful'
    });
  } catch (error) {
    console.error('Signout error:', error);
    return Response.json(
      { error: 'An error occurred during sign out' },
      { status: 500 }
    );
  }
}