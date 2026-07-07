import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authService, type LoginRequest, useAuth } from '@/features/auth';

export function useLogin() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (credentials: LoginRequest) => authService.login(credentials),
    onSuccess: (response) => {
      if (response.status === 'error' || !response.data) {
        toast.error(response.message || 'Credenciales inválidas');
        return;
      }
      login(response.data.user);
      toast.success('Inicio de sesión exitoso');
      router.push('/dashboard');
    },
    onError: () => {
      toast.error('Error al iniciar sesión');
    },
  });
}
