import { getSession } from '../auth/session';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api';

interface ApiResponse<T> {
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
}

// Check if we're in an environment where the backend might not be available
const BACKEND_AVAILABLE = typeof window !== 'undefined' && 
  process.env.NEXT_PUBLIC_API_BASE_URL && 
  process.env.NEXT_PUBLIC_API_BASE_URL !== '';

// Import mock API if backend is not available
let mockApi: any;
if (typeof window !== 'undefined' && !BACKEND_AVAILABLE) {
  import('./mock-client').then(module => {
    mockApi = module;
  }).catch(error => {
    console.warn('Could not load mock API:', error);
  });
}

/**
 * Generic API request function that handles JWT token attachment
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  // If backend is not available, use mock API
  if (!BACKEND_AVAILABLE && mockApi) {
    try {
      if (endpoint === '/todos' && options.method === 'GET') {
        return await mockApi.getTodos();
      } else if (endpoint === '/todos' && options.method === 'POST') {
        const data = JSON.parse(options.body as string);
        return await mockApi.createTodo(data.title);
      } else if (endpoint.startsWith('/todos/') && options.method === 'PUT') {
        const id = endpoint.split('/')[2];
        const data = JSON.parse(options.body as string);
        return await mockApi.updateTodo(id, data);
      } else if (endpoint.startsWith('/todos/') && options.method === 'DELETE') {
        const id = endpoint.split('/')[2];
        return await mockApi.deleteTodo(id);
      }
    } catch (error: any) {
      return {
        error: {
          code: 'MOCK_ERROR',
          message: error.message || 'Mock API error occurred',
        },
      };
    }
  }

  try {
    const session = await getSession();

    const headers = {
      'Content-Type': 'application/json',
      ...(session?.token ? { Authorization: `Bearer ${session.token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Handle unauthorized access - possibly redirect to login
        console.error('Unauthorized access - token may be expired');
        // In a real app, you might want to redirect to login here
      }

      const errorData = await response.json();
      return {
        error: {
          code: 'REQUEST_ERROR',
          message: errorData.message || `HTTP Error: ${response.status}`,
          details: errorData.details,
        },
      };
    }

    const data = await response.json();
    return { data };
  } catch (error: any) {
    // If the real API fails, fall back to mock API
    if (mockApi) {
      console.warn('Real API failed, falling back to mock API:', error);
      
      try {
        if (endpoint === '/todos' && options.method === 'GET') {
          return await mockApi.getTodos();
        } else if (endpoint === '/todos' && options.method === 'POST') {
          const data = JSON.parse(options.body as string);
          return await mockApi.createTodo(data.title);
        } else if (endpoint.startsWith('/todos/') && options.method === 'PUT') {
          const id = endpoint.split('/')[2];
          const data = JSON.parse(options.body as string);
          return await mockApi.updateTodo(id, data);
        } else if (endpoint.startsWith('/todos/') && options.method === 'DELETE') {
          const id = endpoint.split('/')[2];
          return await mockApi.deleteTodo(id);
        }
      } catch (mockError: any) {
        return {
          error: {
            code: 'MOCK_ERROR',
            message: mockError.message || 'Mock API error occurred',
          },
        };
      }
    }
    
    return {
      error: {
        code: 'NETWORK_ERROR',
        message: error.message || 'Network error occurred',
      },
    };
  }
}

/**
 * GET request helper
 */
export async function get<T>(endpoint: string): Promise<ApiResponse<T>> {
  return apiRequest<T>(endpoint, { method: 'GET' });
}

/**
 * POST request helper
 */
export async function post<T, R = T>(
  endpoint: string,
  data: T
): Promise<ApiResponse<R>> {
  return apiRequest<R>(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * PUT request helper
 */
export async function put<T, R = T>(
  endpoint: string,
  data: T
): Promise<ApiResponse<R>> {
  return apiRequest<R>(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
}

/**
 * PATCH request helper
 */
export async function patch<T, R = T>(
  endpoint: string,
  data: T
): Promise<ApiResponse<R>> {
  return apiRequest<R>(endpoint, {
    method: 'PATCH',
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request helper
 */
export async function del(endpoint: string): Promise<ApiResponse<any>> {
  return apiRequest<any>(endpoint, { method: 'DELETE' });
}