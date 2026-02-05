import { post, get, put, del, patch } from './client';
import { Task, CreateTaskRequest, UpdateTaskRequest, TaskListResponse } from '../../types';

/**
 * Fetch user's tasks
 */
export async function fetchTasks(
  status?: 'all' | 'active' | 'completed',
  search?: string,
  sortBy: 'createdAt' | 'updatedAt' | 'title' = 'createdAt',
  order: 'asc' | 'desc' = 'desc',
  page: number = 1,
  limit: number = 10
): Promise<TaskListResponse> {
  // Build query parameters
  const params = new URLSearchParams();
  if (status) params.append('status', status);
  if (search) params.append('search', search);
  params.append('sortBy', sortBy);
  params.append('order', order);
  params.append('page', page.toString());
  params.append('limit', limit.toString());

  const queryString = params.toString();
  const endpoint = `/tasks${queryString ? `?${queryString}` : ''}`;

  const response = await get<TaskListResponse>(endpoint);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data!;
}

/**
 * Create a new task
 */
export async function createTask(taskData: CreateTaskRequest): Promise<Task> {
  const response = await post<CreateTaskRequest, Task>('/tasks', taskData);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data!;
}

/**
 * Update an existing task
 */
export async function updateTask(taskId: string, taskData: UpdateTaskRequest): Promise<Task> {
  const response = await put<UpdateTaskRequest, Task>(`/tasks/${taskId}`, taskData);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data!;
}

/**
 * Delete a task
 */
export async function deleteTask(taskId: string): Promise<{ success: boolean }> {
  const response = await del(`/tasks/${taskId}`);

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data!;
}

/**
 * Update task completion status
 */
export async function updateTaskCompletion(
  taskId: string,
  completed: boolean
): Promise<Task> {
  const response = await patch<{ completed: boolean }, Task>(`/tasks/${taskId}/complete`, {
    completed
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.data!;
}