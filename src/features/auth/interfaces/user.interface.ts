import type { AuthRole } from '../types/auth-role.type';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: AuthRole;
}
