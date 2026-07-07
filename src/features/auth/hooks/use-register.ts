import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { authService, type RegisterRequest, useAuth } from '@/features/auth';

export function useRegister() {
  const { login } = useAuth();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterRequest) => authService.register(data),
    onSuccess: (response) => {
      if (response.status === 'error' || !response.data) {
        toast.error(response.message || 'Error al registrarse');
        return;
      }
      login(response.data.user);
      toast.success('Cuenta creada exitosamente');
      router.push('/dashboard');
    },
    onError: () => {
      toast.error('Error al registrarse');
    },
  });
}
