// Authentication service for frontend
interface User {
  id: number;
  username: string;
  email: string;
  role: 'user' | 'artisan' | 'admin';
  profile: any;
}

interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface RegisterData extends LoginCredentials {
  username: string;
  role?: 'user' | 'artisan';
}

const API_BASE_URL = 'http://localhost:3001/api';

class AuthService {
  private token: string | null = null;
  private user: User | null = null;

  constructor() {
    // Load saved token and user from localStorage only on client side
    if (typeof window !== 'undefined') {
      this.loadFromStorage();
    }
  }

  private loadFromStorage() {
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
      const userData = localStorage.getItem('auth_user');
      if (userData) {
        try {
          this.user = JSON.parse(userData);
        } catch (e) {
          console.warn('Failed to parse user data from localStorage');
          this.clearStorage();
        }
      }
    }
  }

  private saveToStorage(token: string, user: User) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
    this.token = token;
    this.user = user;
  }

  private clearStorage() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
    }
    this.token = null;
    this.user = null;
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Network error' }));
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return response.json();
  }

  async login(credentials: LoginCredentials): Promise<User> {
    const response = await this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });

    this.saveToStorage(response.token, response.user);
    return response.user;
  }

  async register(data: RegisterData): Promise<User> {
    const response = await this.makeRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    this.saveToStorage(response.token, response.user);
    return response.user;
  }

  async logout(): Promise<void> {
    this.clearStorage();
    // In a real app, you might want to call a logout endpoint to invalidate the token
  }

  async getProfile(): Promise<User> {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    const user = await this.makeRequest<User>('/auth/profile');
    this.user = user;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(user));
    }
    
    return user;
  }

  async updateProfile(profileData: any): Promise<User> {
    if (!this.token) {
      throw new Error('Not authenticated');
    }

    const response = await this.makeRequest<{ user: User }>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ profile: profileData }),
    });

    this.user = response.user;
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_user', JSON.stringify(response.user));
    }
    
    return response.user;
  }

  isAuthenticated(): boolean {
    return !!this.token && !!this.user;
  }

  getCurrentUser(): User | null {
    return this.user;
  }

  getToken(): string | null {
    return this.token;
  }

  hasRole(role: string): boolean {
    return this.user?.role === role;
  }

  // Helper method to make authenticated API calls
  async authenticatedRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    if (!this.token) {
      throw new Error('Authentication required');
    }
    return this.makeRequest<T>(endpoint, options);
  }
}

// Export singleton instance
export const authService = new AuthService();

// Export types
export type { User, LoginCredentials, RegisterData };
