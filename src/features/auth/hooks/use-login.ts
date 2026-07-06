import { useMutation } from '@tanstack/react-query';

import { authService, LoginRequest } from '@/features/auth';

export function useLogin() {
  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
  });
}
