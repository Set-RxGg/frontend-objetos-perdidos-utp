import { z } from 'zod';

export const registerSchema = z
  .object({
    cedula: z.string().min(1, 'La cédula es requerida'),
    email: z.email('Ingrese un correo válido'),
    nombre: z.string().min(1, 'El nombre es requerido'),
    apellido: z.string().min(1, 'El apellido es requerido'),
    telefono: z.string().optional(),
    rol: z.enum(['usuario', 'administrativo']).optional(),
    password: z
      .string()
      .min(8, 'La contraseña debe tener al menos 8 caracteres'),
    confirmPassword: z.string().min(1, 'Confirme su contraseña'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
