import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
} from '../interfaces';

import { loginMock, registerMock } from '../mocks';

class AuthService {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    console.log('AuthService.login', credentials);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return loginMock;
  }

  async register(data: RegisterRequest): Promise<LoginResponse> {
    console.log('AuthService.register', data);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    return registerMock;
  }
}
export const authService = new AuthService();
