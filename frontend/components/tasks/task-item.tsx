'use client';

import { useState } from 'react';
import { Task } from '@/types';
import TaskForm from './task-form';
import { put } from '@/lib/api/client';

interface TaskItemProps {
  task: Task;
  onUpdate?: (updatedTask: Task) => void;
  onDelete?: (taskId: string) => void;
}

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdate = async (updatedTask: Partial<Task>) => {
    try {
      const response = await put<Partial<Task>, Task>(`/tasks/${task.id}`, updatedTask);
      if (!response.error && response.data) {
        onUpdate?.(response.data);
        setIsEditing(false);
      } else {
        console.error('Error updating task:', response.error);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    if (window.confirm(`Are you sure you want to delete "${task.title}"?`)) {
      setIsDeleting(true);
      try {
        onDelete(task.id);
      } catch (error) {
        console.error('Error deleting task:', error);
        setIsDeleting(false);
      }
    }
  };

  const handleToggleComplete = async () => {
    try {
      const response = await put<{ completed: boolean }, Task>(`/tasks/${task.id}`, { completed: !task.completed });
      if (!response.error && response.data) {
        onUpdate?.(response.data);
      } else {
        console.error('Error updating task completion:', response.error);
      }
    } catch (error) {
      console.error('Error updating task completion:', error);
    }
  };

  return (
    <li className="px-4 py-4 sm:px-6">
      {isEditing ? (
        <TaskForm
          task={task}
          onSubmit={handleUpdate}
          onCancel={handleEditToggle}
        />
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={task.completed}
              onChange={handleToggleComplete}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div className="ml-3 min-w-0">
              <p
                className={`text-sm font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}
              >
                {task.title}
              </p>
              {task.description && (
                <p className="text-sm text-gray-500 truncate">{task.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleEditToggle}
              className="inline-flex items-center px-2.5 py-0.5 mr-2 border border-transparent text-xs font-medium rounded text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className={`inline-flex items-center px-2.5 py-0.5 border border-transparent text-xs font-medium rounded ${
                isDeleting
                  ? 'text-gray-400 bg-gray-100'
                  : 'text-red-700 bg-red-100 hover:bg-red-200'
              } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500`}
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        </div>
      )}
    </li>
  );
}