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

/**
 * Generic API request function that handles JWT token attachment
 */
export async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
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