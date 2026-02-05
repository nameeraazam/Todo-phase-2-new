'use client';

import { Task } from '../../types';
import TaskItem from '../tasks/task-item';

interface TaskListProps {
  tasks: Task[];
  loading?: boolean;
  emptyMessage?: string;
  onTaskUpdate?: (updatedTask: Task) => void;
  onTaskDelete?: (taskId: string) => void;
}

export default function TaskList({
  tasks,
  loading = false,
  emptyMessage = 'No tasks found.',
  onTaskUpdate,
  onTaskDelete
}: TaskListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Loading tasks...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow overflow-hidden sm:rounded-md">
      <ul className="divide-y divide-gray-200">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onUpdate={onTaskUpdate}
            onDelete={onTaskDelete}
          />
        ))}
      </ul>
    </div>
  );
}