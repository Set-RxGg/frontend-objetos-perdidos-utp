import type { User } from './user.interface';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  User: User;
}
