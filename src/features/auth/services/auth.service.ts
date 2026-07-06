import type { LoginRequest, LoginResponse } from '../interfaces';

import { loginMock } from '../mocks';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('AuthService.login', credentials);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return loginMock;
  }
}

export const authService = new AuthService();
