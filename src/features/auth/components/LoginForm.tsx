'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { loginSchema, LoginSchema, useLogin } from '@/features/auth';

import { Button, Card, Input, Label } from '@/components/ui';
import Link from 'next/dist/client/link';

export default function LoginForm() {
  const mutation = useLogin();

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

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Iniciar sesión</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Email</Label>

          <Input {...register('email')} placeholder="correo@correo.com" />

          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div>
          <Label>Contraseña</Label>

          <Input type="password" {...register('password')} />

          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <Button type="submit" loading={mutation.isPending} className="w-full">
          Ingresar
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-500">
        ¿No tienes cuenta?{' '}
        <Link
          href="/auth/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Regístrate
        </Link>
      </p>
    </Card>
  );
}
