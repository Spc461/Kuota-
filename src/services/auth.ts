import apiService, { ApiResponse } from './api';
import { User } from '../types/models';

export interface LoginCredentials {
  email?: string;
  phone?: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email?: string;
  phone?: string;
  password: string;
  role: 'student' | 'teacher';
}

export interface AuthResponse {
  user: User;
  token: string;
}

export const authService = {
  login: async (
    credentials: LoginCredentials
  ): Promise<ApiResponse<AuthResponse>> => {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  },

  register: async (data: RegisterData): Promise<ApiResponse<AuthResponse>> => {
    return apiService.post<AuthResponse>('/auth/register', data);
  },

  logout: async (): Promise<ApiResponse<void>> => {
    return apiService.post<void>('/auth/logout', {});
  },

  refreshToken: async (): Promise<ApiResponse<{ token: string }>> => {
    return apiService.post<{ token: string }>('/auth/refresh', {});
  },

  forgotPassword: async (
    email: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return apiService.post<{ message: string }>('/auth/forgot-password', {
      email,
    });
  },

  resetPassword: async (
    token: string,
    password: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return apiService.post<{ message: string }>('/auth/reset-password', {
      token,
      password,
    });
  },

  verifyEmail: async (
    token: string
  ): Promise<ApiResponse<{ message: string }>> => {
    return apiService.post<{ message: string }>('/auth/verify-email', {
      token,
    });
  },
};
