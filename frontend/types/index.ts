// User entity
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

// Task entity
export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
}

// Session state
export interface Session {
  user: User | null;
  isLoading: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

// Task filter options
export type TaskStatusFilter = 'all' | 'active' | 'completed';
export type TaskSortField = 'createdAt' | 'updatedAt' | 'title';

export interface TaskFilter {
  status: TaskStatusFilter;
  searchQuery: string;
  sortBy: TaskSortField;
  sortOrder: 'asc' | 'desc';
}

// API request/response types
export interface CreateTaskRequest {
  title: string;
  description?: string;
}

export interface UpdateTaskRequest {
  title?: string;
  description?: string;
  completed?: boolean;
}

export interface TaskListResponse {
  tasks: Task[];
  total: number;
  page: number;
  limit: number;
}