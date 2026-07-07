'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import {
  registerSchema,
  type RegisterSchema,
  useAuth,
  useRegister,
} from '@/features/auth';

import { Button, Card, Input, Label } from '@/components/ui';

export default function RegisterForm() {
  const { isAuthenticated, isLoading } = useAuth();
  const mutation = useRegister();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: { rol: 'usuario' },
  });

  const onSubmit = (data: RegisterSchema) => {
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
        Crear cuenta
      </h1>
      <p className="text-text-secondary mb-6 text-center text-sm">
        Registrate en el sistema de objetos perdidos
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="cedula">Cedula</Label>
          <Input id="cedula" {...register('cedula')} placeholder="8-123-456" />
          <p className="mt-1 text-sm text-red-500">{errors.cedula?.message}</p>
        </div>

        <div>
          <Label htmlFor="reg-email">Email</Label>
          <Input
            id="reg-email"
            {...register('email')}
            placeholder="correo@correo.com"
            autoComplete="email"
          />
          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="nombre">Nombre</Label>
            <Input id="nombre" {...register('nombre')} placeholder="Nombre" />
            <p className="mt-1 text-sm text-red-500">
              {errors.nombre?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="apellido">Apellido</Label>
            <Input
              id="apellido"
              {...register('apellido')}
              placeholder="Apellido"
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.apellido?.message}
            </p>
          </div>
        </div>

        <div>
          <Label htmlFor="telefono">Telefono (opcional)</Label>
          <Input
            id="telefono"
            {...register('telefono')}
            placeholder="6000-0000"
          />
          <p className="mt-1 text-sm text-red-500">
            {errors.telefono?.message}
          </p>
        </div>

        <div>
          <Label htmlFor="rol">Tipo de cuenta</Label>
          <select
            id="rol"
            {...register('rol')}
            className="rounded-input border-border focus:border-primary-500 focus:ring-primary-200 w-full border px-3 py-2 transition outline-none focus:ring-2"
          >
            <option value="usuario">Usuario</option>
            <option value="administrativo">Administrativo</option>
          </select>
          {errors.rol && (
            <p className="mt-1 text-sm text-red-500">{errors.rol.message}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="reg-password">Contrasena</Label>
            <Input
              id="reg-password"
              type="password"
              {...register('password')}
              placeholder="••••••••"
              autoComplete="new-password"
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.password?.message}
            </p>
          </div>

          <div>
            <Label htmlFor="confirm-password">Confirmar</Label>
            <Input
              id="confirm-password"
              type="password"
              {...register('confirmPassword')}
              placeholder="••••••••"
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.confirmPassword?.message}
            </p>
          </div>
        </div>

        <Button type="submit" loading={mutation.isPending} className="w-full">
          Registrarse
        </Button>
      </form>

      <p className="text-text-secondary mt-6 text-center text-sm">
        Ya tienes cuenta?{' '}
        <Link
          href="/auth/login"
          className="text-primary-600 hover:text-primary-700 font-medium hover:underline"
        >
          Inicia sesion
        </Link>
      </p>
    </Card>
  );
}
