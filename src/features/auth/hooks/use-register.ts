import { useMutation } from '@tanstack/react-query';
import { authService, RegisterRequest } from '@/features/auth';

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
  });
}
