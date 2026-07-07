import { api } from '@/lib/axios';

import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from '../interfaces';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const { data } = await api.post<LoginResponse>('/auth/login', credentials);
    return data;
  }

  async register(payload: RegisterRequest): Promise<LoginResponse> {
    const { data } = await api.post<{
      status: 'success' | 'error';
      data: User;
    }>('/auth/register', payload);

    return {
      status: data.status,
      data: {
        user: data.data,
        expires_in: 900,
      },
    };
  }

  async me(): Promise<{ status: string; data?: { user: User } }> {
    try {
      const { data } = await api.get<{
        status: 'success' | 'error';
        data: User;
      }>('/auth/me');
      if (data.status === 'success' && data.data) {
        return { status: 'success', data: { user: data.data } };
      }
      return { status: 'error' };
    } catch {
      return { status: 'error' };
    }
  }

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  }
}

export const authService = new AuthService();
