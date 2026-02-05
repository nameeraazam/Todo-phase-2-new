// lib/auth/session.ts

// Mock session management for the frontend
// In a real application, this would interface with your authentication system

export interface Session {
  user: any | null;
  token: string | null;
}

/**
 * Gets the current session from localStorage
 */
export async function getSession(): Promise<Session | null> {
  if (typeof window === 'undefined') {
    // Server-side, no session available
    return null;
  }

  try {
    const userStr = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userStr || !token) {
      return null;
    }

    const user = JSON.parse(userStr);

    return {
      user,
      token,
    };
  } catch (error) {
    console.error('Error getting session:', error);
    return null;
  }
}

/**
 * Sets the session in localStorage
 */
export async function setSession(session: Session): Promise<void> {
  if (typeof window === 'undefined') {
    // Server-side, can't set session
    return;
  }

  try {
    if (session.user) {
      localStorage.setItem('user', JSON.stringify(session.user));
    }
    if (session.token) {
      localStorage.setItem('token', session.token);
    }
  } catch (error) {
    console.error('Error setting session:', error);
  }
}

/**
 * Clears the current session from localStorage
 */
export async function clearSession(): Promise<void> {
  if (typeof window === 'undefined') {
    // Server-side, can't clear session
    return;
  }

  try {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  } catch (error) {
    console.error('Error clearing session:', error);
  }
}