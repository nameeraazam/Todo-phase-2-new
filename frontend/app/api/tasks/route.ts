import { NextRequest } from 'next/server';
import { Task } from '@/types';

// Mock tasks database (in a real app, this would be a real database)
const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Sample Task 1',
    description: 'This is a sample task',
    completed: false,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: null,
  },
  {
    id: '2',
    title: 'Sample Task 2',
    description: 'This is another sample task',
    completed: true,
    userId: '1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(), // Completed tasks have a completedAt value
  },
];

export async function GET(request: NextRequest) {
  try {
    // In a real application, you would authenticate the user and return only their tasks
    // For this demo, we'll return mock tasks
    
    return Response.json({
      data: mockTasks,
      message: 'Tasks retrieved successfully'
    });
  } catch (error) {
    console.error('Get tasks error:', error);
    return Response.json(
      { error: 'An error occurred while retrieving tasks' },
      { status: 500 }
    );
  }
}