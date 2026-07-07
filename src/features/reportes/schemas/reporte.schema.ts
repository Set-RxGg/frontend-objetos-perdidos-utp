import { z } from 'zod';

export const createReporteSchema = z.object({
  nombre_objeto: z.string().min(1, 'El nombre del objeto es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  ubicacion: z.string().min(1, 'La ubicación es requerida'),
  lugar_entrega: z.enum(['GARITA_SEGURIDAD', 'LABORATORIO_FISC']),
});

export type CreateReporteSchema = z.infer<typeof createReporteSchema>;

export const devolverReporteSchema = z.object({
  devuelto_a_nombre: z.string().min(1, 'El nombre es requerido'),
  devuelto_a_cedula: z.string().min(1, 'La cédula es requerida'),
  devuelto_a_telefono: z.string().optional(),
});

export type DevolverReporteSchema = z.infer<typeof devolverReporteSchema>;
