'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  loginSchema,
  type LoginSchema,
  useAuth,
  useLogin,
} from '@/features/auth';

import { Button, Card, Input, Label } from '@/components/ui';

export default function LoginForm() {
  const { isAuthenticated, isLoading } = useAuth();
  const mutation = useLogin();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    mutation.mutate(data);
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return null;

  return (
    <Card className="w-full max-w-md p-8 shadow-xl">
      <h1 className="text-text-primary mb-2 text-center text-2xl font-bold">
        Iniciar sesion
      </h1>
      <p className="text-text-secondary mb-6 text-center text-sm">
        Ingresa tus credenciales para acceder
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            {...register('email')}
            placeholder="correo@correo.com"
            autoComplete="email"
          />
          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <Label htmlFor="password">Contrasena</Label>
          <Input
            id="password"
            type="password"
            {...register('password')}
            placeholder="••••••••"
            autoComplete="current-password"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <Button type="submit" loading={mutation.isPending} className="w-full">
          Ingresar
        </Button>
      </form>

      <div className="text-text-muted mt-6 space-y-1 text-center text-sm">
        <p>
          Admin:{' '}
          <span className="text-text-primary font-medium">
            admin@test.com / 12345678
          </span>
        </p>
        <p>
          Usuario:{' '}
          <span className="text-text-primary font-medium">
            user@test.com / 12345678
          </span>
        </p>
      </div>

      <p className="text-text-secondary mt-4 text-center text-sm">
        No tienes cuenta?{' '}
        <Link
          href="/auth/register"
          className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
        >
          Registrate
        </Link>
      </p>
    </Card>
  );
}
