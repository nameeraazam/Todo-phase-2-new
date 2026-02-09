# Quickstart Guide: Frontend Web Application (Todo App)

**Feature**: 001-frontend-todo-app
**Date**: 2026-01-19

## Overview

This guide provides instructions for setting up, developing, and running the frontend Todo application locally. The application is built with Next.js 16+, uses Better Auth for authentication, and communicates with the backend API using JWT tokens.

## Prerequisites

Before getting started, ensure you have the following installed:

- Node.js (version 18.17 or higher)
- npm (version 9.0 or higher) or yarn (version 1.22 or higher)
- Git
- Access to the backend API (either running locally or via a remote endpoint)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-directory>
```

### 2. Navigate to the Frontend Directory

```bash
cd frontend
```

### 3. Install Dependencies

Using npm:
```bash
npm install
```

Or using yarn:
```bash
yarn install
```

### 4. Environment Configuration

Create a `.env.local` file in the `frontend` directory with the following variables:

```env
# Backend API configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
NEXT_PUBLIC_JWT_SECRET=your-jwt-secret-here

# Better Auth configuration
AUTH_SECRET=your-auth-secret-here
NEXTAUTH_URL=http://localhost:3000

# Add any other environment variables as needed
```

**Note**: For development, the backend API is typically running on `http://localhost:8000/api`. Adjust the `NEXT_PUBLIC_API_BASE_URL` as needed for your setup.

## Development

### 1. Start the Development Server

```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

The application will be available at `http://localhost:3000`.

### 2. Access the Application

Open your browser and navigate to `http://localhost:3000`. You should see the application home page.

### 3. Authentication Flow

1. Visit `/signup` to create a new account
2. Visit `/login` to sign in with an existing account
3. After authentication, you'll be redirected to the dashboard at `/dashboard`

## Project Structure

Understanding the key directories and files:

```
frontend/
├── app/                 # Next.js App Router pages
│   ├── (auth)/          # Authentication routes (login, signup)
│   ├── dashboard/       # Main dashboard with task management
│   ├── tasks/           # Task-specific routes
│   ├── layout.tsx       # Root layout component
│   └── page.tsx         # Home page
├── components/          # Reusable UI components
│   ├── ui/              # Base UI components (Button, Input, Card, etc.)
│   ├── auth/            # Authentication-related components
│   └── tasks/           # Task management components
├── lib/                 # Utilities and shared logic
│   ├── auth/            # Authentication utilities
│   ├── api/             # API client and request helpers
│   └── utils/           # General utility functions
├── styles/              # Global styles and Tailwind config
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Key Features Walkthrough

### Authentication
- The application uses Better Auth for secure JWT-based authentication
- Protected routes are wrapped with `ProtectedRoute` component
- Session state is managed globally using React Context

### Task Management
- View all tasks on the dashboard
- Create new tasks with title and description
- Edit existing tasks
- Mark tasks as complete/incomplete
- Delete tasks

### Responsive Design
- The UI adapts to different screen sizes (mobile, tablet, desktop)
- Touch-friendly controls for mobile users
- Consistent experience across devices

## API Integration

The frontend communicates with the backend API using the client located in `lib/api/`. Key integration points:

- Authentication requests go through the Better Auth client
- Task operations use the API client with JWT token attachment
- Error handling is centralized in the API client
- Loading and error states are managed using SWR

## Testing

### Running Tests

Unit tests:
```bash
npm run test
```

Integration tests:
```bash
npm run test:integration
```

End-to-end tests:
```bash
npm run test:e2e
```

### Test Structure

Tests are organized in the `tests/` directory:
- `unit/` - Component and utility function tests
- `integration/` - API integration and complex component tests
- `e2e/` - Full user flow tests using Playwright

## Building for Production

To create a production build:

```bash
npm run build
```

To run the production build locally:

```bash
npm run start
```

## Troubleshooting

### Common Issues

1. **Authentication not working**: Ensure your backend API is running and the `NEXT_PUBLIC_API_BASE_URL` is correctly set in your environment variables.

2. **API calls failing**: Check that the JWT token is being properly attached to requests and that your backend API is configured to accept JWT authentication.

3. **Styles not loading**: Verify that Tailwind CSS is properly configured and that you've restarted your development server after making changes to the configuration.

### Useful Commands

- `npm run lint` - Run ESLint to check for code style issues
- `npm run type-check` - Run TypeScript compiler to check for type errors
- `npm run format` - Format code using Prettier

## Next Steps

1. Explore the `/dashboard` to see the main task management interface
2. Review the component structure in `components/` to understand how UI elements are organized
3. Check the API integration in `lib/api/` to understand how requests are made
4. Look at the type definitions in `types/` to understand the data structures used throughout the application