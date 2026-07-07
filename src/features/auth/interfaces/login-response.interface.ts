import type { User } from './user.interface';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
  code?: string;
}

export interface LoginResponseData {
  user: User;
  expires_in: number;
}

export type LoginResponse = ApiResponse<LoginResponseData>;
