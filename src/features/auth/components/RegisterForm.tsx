'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { registerSchema, RegisterSchema, useRegister } from '@/features/auth';

import { Button, Card, Input, Label } from '@/components/ui';

export default function RegisterForm() {
  const mutation = useRegister();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterSchema) => {
    const { confirmPassword, ...payload } = data;
    mutation.mutate(payload);
  };

  return (
    <Card className="w-full max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Crear cuenta</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label>Cédula</Label>
          <Input {...register('cedula')} placeholder="8-123-456" />
          <p className="mt-1 text-sm text-red-500">{errors.cedula?.message}</p>
        </div>

        <div>
          <Label>Email</Label>
          <Input {...register('email')} placeholder="correo@correo.com" />
          <p className="mt-1 text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Nombre</Label>
            <Input {...register('nombre')} placeholder="Tu nombre" />
            <p className="mt-1 text-sm text-red-500">
              {errors.nombre?.message}
            </p>
          </div>

          <div>
            <Label>Apellido</Label>
            <Input {...register('apellido')} placeholder="Tu apellido" />
            <p className="mt-1 text-sm text-red-500">
              {errors.apellido?.message}
            </p>
          </div>
        </div>

        <div>
          <Label>Teléfono (opcional)</Label>
          <Input {...register('telefono')} placeholder="6000-0000" />
          <p className="mt-1 text-sm text-red-500">
            {errors.telefono?.message}
          </p>
        </div>

        <div>
          <Label>Contraseña</Label>
          <Input type="password" {...register('password')} />
          <p className="mt-1 text-sm text-red-500">
            {errors.password?.message}
          </p>
        </div>

        <div>
          <Label>Confirmar contraseña</Label>
          <Input type="password" {...register('confirmPassword')} />
          <p className="mt-1 text-sm text-red-500">
            {errors.confirmPassword?.message}
          </p>
        </div>

        <Button type="submit" loading={mutation.isPending} className="w-full">
          Registrarse
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-500">
        ¿Ya tienes cuenta?{' '}
        <Link
          href="/auth/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Inicia sesión
        </Link>
      </p>
    </Card>
  );
}
