# API Contracts: Frontend Web Application (Todo App)

**Feature**: 001-frontend-todo-app
**Date**: 2026-01-19

## Overview

This document defines the API contracts between the frontend application and the backend service. These contracts specify the endpoints, request/response formats, and authentication requirements for all interactions.

## Authentication

All API endpoints (except authentication endpoints) require a valid JWT token in the Authorization header:

```
Authorization: Bearer <jwt-token>
```

If an invalid or expired token is provided, the API will return a 401 Unauthorized response.

## Endpoints

### Authentication

#### POST /api/auth/signup

Register a new user account.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123",
  "name": "John Doe"
}
```

**Response (201 Created)**:
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-01-19T10:00:00.000Z",
    "updatedAt": "2026-01-19T10:00:00.000Z"
  },
  "token": "jwt-token-string"
}
```

**Validation**:
- Email must be valid format
- Password must be at least 8 characters
- Name must be 1-50 characters

#### POST /api/auth/signin

Authenticate an existing user.

**Request**:
```json
{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-01-19T10:00:00.000Z",
    "updatedAt": "2026-01-19T10:00:00.000Z"
  },
  "token": "jwt-token-string"
}
```

**Validation**:
- Email must be valid format
- Password must be provided

#### POST /api/auth/signout

Sign out the current user.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK)**:
```json
{
  "success": true
}
```

#### GET /api/auth/me

Get information about the current authenticated user.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK)**:
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe",
    "createdAt": "2026-01-19T10:00:00.000Z",
    "updatedAt": "2026-01-19T10:00:00.000Z"
  }
}
```

### Task Management

#### GET /api/tasks

Retrieve the authenticated user's tasks.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Query Parameters**:
- `status` (optional): Filter by completion status ('all', 'active', 'completed')
- `search` (optional): Search term to filter tasks by title/description
- `sortBy` (optional): Field to sort by ('createdAt', 'updatedAt', 'title') - default: 'createdAt'
- `order` (optional): Sort order ('asc', 'desc') - default: 'desc'
- `page` (optional): Page number for pagination - default: 1
- `limit` (optional): Number of tasks per page - default: 10, max: 50

**Response (200 OK)**:
```json
{
  "tasks": [
    {
      "id": "task-uuid",
      "userId": "user-uuid",
      "title": "Complete project proposal",
      "description": "Finish the project proposal document for client review",
      "completed": false,
      "createdAt": "2026-01-19T09:30:00.000Z",
      "updatedAt": "2026-01-19T09:30:00.000Z",
      "completedAt": null
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "totalPages": 1
  }
}
```

#### POST /api/tasks

Create a new task for the authenticated user.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread, fruits"
}
```

**Response (201 Created)**:
```json
{
  "task": {
    "id": "task-uuid",
    "userId": "user-uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, fruits",
    "completed": false,
    "createdAt": "2026-01-19T10:15:00.000Z",
    "updatedAt": "2026-01-19T10:15:00.000Z",
    "completedAt": null
  }
}
```

**Validation**:
- Title is required and must be 1-100 characters
- Description is optional and can be up to 1000 characters

#### PUT /api/tasks/{taskId}

Update an existing task.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "title": "Updated task title",
  "description": "Updated task description",
  "completed": true
}
```

**Response (200 OK)**:
```json
{
  "task": {
    "id": "task-uuid",
    "userId": "user-uuid",
    "title": "Updated task title",
    "description": "Updated task description",
    "completed": true,
    "createdAt": "2026-01-19T10:15:00.000Z",
    "updatedAt": "2026-01-19T10:20:00.000Z",
    "completedAt": "2026-01-19T10:20:00.000Z"
  }
}
```

**Validation**:
- taskId in URL must be a valid task ID owned by the user
- Title must be 1-100 characters if provided
- Description can be up to 1000 characters if provided

#### DELETE /api/tasks/{taskId}

Delete a task.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Response (200 OK)**:
```json
{
  "success": true
}
```

**Validation**:
- taskId in URL must be a valid task ID owned by the user

#### PATCH /api/tasks/{taskId}/complete

Mark a task as complete or incomplete.

**Request Headers**:
```
Authorization: Bearer <jwt-token>
```

**Request Body**:
```json
{
  "completed": true
}
```

**Response (200 OK)**:
```json
{
  "task": {
    "id": "task-uuid",
    "userId": "user-uuid",
    "title": "Buy groceries",
    "description": "Milk, eggs, bread, fruits",
    "completed": true,
    "createdAt": "2026-01-19T10:15:00.000Z",
    "updatedAt": "2026-01-19T10:25:00.000Z",
    "completedAt": "2026-01-19T10:25:00.000Z"
  }
}
```

**Validation**:
- taskId in URL must be a valid task ID owned by the user
- completed field must be a boolean

## Error Responses

All error responses follow the same structure:

```json
{
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message",
    "details": {} // Optional additional error details
  }
}
```

### Common Error Codes

- `UNAUTHORIZED`: 401 - Invalid or missing authentication token
- `FORBIDDEN`: 403 - User does not have permission to access the resource
- `NOT_FOUND`: 404 - Requested resource does not exist
- `VALIDATION_ERROR`: 400 - Request data failed validation
- `INTERNAL_ERROR`: 500 - Internal server error