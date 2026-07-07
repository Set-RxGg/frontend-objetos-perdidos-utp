import type { User } from './user.interface';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
