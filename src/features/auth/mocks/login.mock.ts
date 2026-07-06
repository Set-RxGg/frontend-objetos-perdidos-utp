import type { LoginResponse } from '../interfaces';

export const loginMock: LoginResponse = {
  accessToken: 'mock-access-token',
  refreshToken: 'mock-refresh-token',
  User: {
    id: '1',
    cedula: '8-123-456',
    email: 'admin@test.com',
    firstName: 'Roderik',
    lastName: 'González',
    telefono: '6000-0000',
    role: 'ADMIN',
  },
};
