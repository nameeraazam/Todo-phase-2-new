'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/providers/auth-provider';
import ProtectedRoute from '@/components/auth/protected-route';
import TaskList from '@/components/tasks/task-list';
import { Task } from '@/types';
import { get, put, del } from '@/lib/api/client';

export default function TasksPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
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
        <main>
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold text-gray-900 mb-4">All Tasks</h2>
                
                <TaskList
                  tasks={tasks}
                  loading={loading}
                  emptyMessage="You have no tasks yet."
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