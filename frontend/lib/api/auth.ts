import { post, get, del } from './client';
import { User } from '../../types';

interface SignupRequest {
  email: string;
  password: string;
  name: string;
}

interface SigninRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

/**
 * Sign up a new user
 */
export async function signup(userData: SignupRequest): Promise<AuthResponse> {
  const response = await post<SignupRequest, AuthResponse>('/auth/signup', userData);
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}

/**
 * Sign in an existing user
 */
export async function signin(credentials: SigninRequest): Promise<AuthResponse> {
  const response = await post<SigninRequest, AuthResponse>('/auth/signin', credentials);
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}

/**
 * Sign out the current user
 */
export async function signout(): Promise<void> {
  const response = await post('/auth/signout', {});
  
  if (response.error) {
    throw new Error(response.error.message);
  }
}

/**
 * Get current user info
 */
export async function getCurrentUser(): Promise<User> {
  const response = await get<User>('/auth/me');
  
  if (response.error) {
    throw new Error(response.error.message);
  }
  
  return response.data!;
}