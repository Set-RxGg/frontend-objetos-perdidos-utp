import type { LoginResponse } from '../interfaces';

export const loginMock: LoginResponse = {
  accessToken: 'mock-access-token',

  refreshToken: 'mock-refresh-token',

  User: {
    id: '1',

    firstName: 'Roderik',

    lastName: 'González',

    email: 'admin@test.com',

    role: 'ADMIN',
  },
};
