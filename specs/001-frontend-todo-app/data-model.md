# Data Model: Frontend Web Application (Todo App)

**Feature**: 001-frontend-todo-app
**Date**: 2026-01-19

## Overview

This document defines the data models for the frontend application. Since the frontend is primarily concerned with representing data received from the backend API and sending requests to it, the models here represent the client-side representation of the data structures.

## Entity Definitions

### User

Represents an authenticated user in the system.

**Fields**:
- `id: string` - Unique identifier for the user
- `email: string` - User's email address (unique)
- `name: string` - User's display name
- `createdAt: string` - Timestamp when the user account was created (ISO 8601)
- `updatedAt: string` - Timestamp when the user account was last updated (ISO 8601)

**Validation Rules**:
- Email must be a valid email format
- Name must be 1-50 characters
- ID must be unique across all users

**State Transitions**:
- Unauthenticated → Authenticated (on successful login)
- Authenticated → Unauthenticated (on logout/expired session)

### Task

Represents a todo item belonging to a specific user.

**Fields**:
- `id: string` - Unique identifier for the task
- `userId: string` - Reference to the user who owns this task
- `title: string` - Title of the task (required)
- `description: string` - Detailed description of the task (optional)
- `completed: boolean` - Whether the task is completed (default: false)
- `createdAt: string` - Timestamp when the task was created (ISO 8601)
- `updatedAt: string` - Timestamp when the task was last updated (ISO 8601)
- `completedAt: string | null` - Timestamp when the task was marked as completed (ISO 8601, nullable)

**Validation Rules**:
- Title must be 1-100 characters
- Description can be up to 1000 characters
- userId must reference an existing user
- completedAt can only be set when completed is true

**State Transitions**:
- Pending → Completed (when user marks task as complete)
- Completed → Pending (when user marks task as incomplete)

## Relationships

### User → Task (One-to-Many)
- A user can have many tasks
- Each task belongs to exactly one user
- Foreign key: Task.userId references User.id
- When a user is deleted, all their tasks should also be deleted (cascading delete)

## Client-Side State Models

### Session
Represents the current user session on the client side.

**Fields**:
- `user: User | null` - The currently authenticated user
- `isLoading: boolean` - Whether authentication state is being loaded
- `isLoggedIn: boolean` - Whether the user is currently logged in
- `error: string | null` - Any error that occurred during authentication

### TaskFilter
Represents filters that can be applied to the task list.

**Fields**:
- `status: 'all' | 'active' | 'completed'` - Filter by completion status
- `searchQuery: string` - Search term to filter tasks by title/description
- `sortBy: 'createdAt' | 'updatedAt' | 'title'` - Field to sort tasks by
- `sortOrder: 'asc' | 'desc'` - Sort direction

## API Request/Response Models

### CreateTaskRequest
Model for creating a new task.

**Fields**:
- `title: string` - Title of the task (required)
- `description?: string` - Detailed description of the task (optional)

### UpdateTaskRequest
Model for updating an existing task.

**Fields**:
- `title?: string` - New title for the task (optional)
- `description?: string` - New description for the task (optional)
- `completed?: boolean` - New completion status (optional)

### TaskListResponse
Model for the response when fetching a list of tasks.

**Fields**:
- `tasks: Task[]` - Array of task objects
- `total: number` - Total number of tasks matching the filter
- `page: number` - Current page number (for pagination)
- `limit: number` - Number of tasks per page (for pagination)

## TypeScript Definitions

```typescript
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
```