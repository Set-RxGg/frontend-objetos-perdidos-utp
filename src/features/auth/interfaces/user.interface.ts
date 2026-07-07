import type { AuthRole } from '../types/auth-role.type';

export interface User {
  _id: string;
  cedula: string;
  email: string;
  nombre: string;
  apellido: string;
  telefono?: string;
  rol: AuthRole;
  activo?: boolean;
}
