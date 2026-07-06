import type { AuthRole } from '../types/auth-role.type';

export interface User {
  id: string;
  cedula: string;
  email: string;
  firstName: string;
  lastName: string;
  telefono?: string;
  role: AuthRole;
}
