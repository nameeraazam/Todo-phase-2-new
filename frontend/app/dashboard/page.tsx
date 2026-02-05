'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/auth-provider';
import ProtectedRoute from '@/components/auth/protected-route';
import TaskList from '@/components/tasks/task-list';
import TaskForm from '@/components/tasks/task-form';
import { Task } from '@/types';
import { get, post, put, del } from '@/lib/api/client';

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [showTaskForm, setShowTaskForm] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        // In a real implementation, this would fetch tasks from the API
        // For now, we'll simulate with mock data
        const response = await get<Task[]>('/tasks');
        if (!response.error) {
          setTasks(response.data || []);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchTasks();
    }
  }, [user]);

  const handleCreateTask = async (taskData: Partial<Task>) => {
    try {
      const response = await post<Partial<Task>, Task>('/tasks', taskData);
      if (!response.error && response.data) {
        setTasks([response.data, ...tasks]);
        setShowTaskForm(false);
      } else {
        console.error('Error creating task:', response.error);
      }
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleTaskUpdate = async (updatedTask: Task) => {
    try {
      const response = await put<Task, Task>(`/tasks/${updatedTask.id}`, updatedTask);
      const data = response.data;
      if (!response.error && data) {
        setTasks(tasks.map(task => task.id === updatedTask.id ? data : task));
      } else {
        console.error('Error updating task:', response.error);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleTaskDelete = async (taskId: string) => {
    try {
      const response = await del(`/tasks/${taskId}`);
      if (!response.error) {
        setTasks(tasks.filter(task => task.id !== taskId));
      } else {
        console.error('Error deleting task:', response.error);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <button
              onClick={() => setShowTaskForm(!showTaskForm)}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {showTaskForm ? 'Cancel' : 'Add Task'}
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-lg font-medium text-gray-900 mb-4">Welcome, {user?.name}!</h2>

                {showTaskForm && (
                  <div className="mb-6 p-4 bg-gray-50 rounded-md">
                    <h3 className="text-md font-medium text-gray-900 mb-3">Create New Task</h3>
                    <TaskForm
                      onSubmit={handleCreateTask}
                      onCancel={() => setShowTaskForm(false)}
                    />
                  </div>
                )}

                <p className="text-gray-600 mb-6">Here are your tasks:</p>

                <TaskList
                  tasks={tasks}
                  loading={loading}
                  emptyMessage="You have no tasks yet. Create one to get started!"
                  onTaskUpdate={handleTaskUpdate}
                  onTaskDelete={handleTaskDelete}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}