import type { LoginResponse } from '../interfaces';

export const registerMock: LoginResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  User: {
    id: '2',
    cedula: '8-456-789',
    email: 'estudiante@utp.ac.pa',
    firstName: 'María',
    lastName: 'Pérez',
    telefono: '6000-1111',
    role: 'USER',
  },
};
