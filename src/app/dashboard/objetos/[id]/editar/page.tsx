'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';

import {
  useReporte,
  useUpdateReporte,
  createReporteSchema,
} from '@/features/reportes';
import type { CreateReporteSchema } from '@/features/reportes';
import { Button, Card, Input, Label, Breadcrumbs } from '@/components/ui';
import { cn } from '@/lib/cn';
import { env } from '@/config/env';

const lugares = [
  { value: 'GARITA_SEGURIDAD' as const, label: 'Garita de Seguridad' },
  { value: 'LABORATORIO_FISC' as const, label: 'Laboratorio FISC' },
];

function EditarForm({ id }: { id: string }) {
  const { data: response, isLoading } = useReporte(id);
  const { mutate: update, isPending } = useUpdateReporte();
  const router = useRouter();

  const [localPreview, setLocalPreview] = useState<string | null>(null);
  const reporte = response?.data;
  const fotoUrl = reporte?.foto_url
    ? reporte.foto_url.startsWith('/')
      ? `${env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}${reporte.foto_url}`
      : reporte.foto_url
    : null;
  const preview = localPreview ?? fotoUrl;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReporteSchema>({
    resolver: zodResolver(createReporteSchema),
    values: reporte
      ? {
          nombre_objeto: reporte.nombre_objeto,
          descripcion: reporte.descripcion,
          ubicacion: reporte.ubicacion,
          lugar_entrega: reporte.lugar_entrega,
        }
      : undefined,
  });

  const [foto, setFoto] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLocalPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setLocalPreview(null);
    }
  };

  const onSubmit = (data: CreateReporteSchema) => {
    update(
      {
        id,
        data: { ...data, foto: foto ?? undefined } as Parameters<
          typeof update
        >[0]['data'],
      },
      {
        onSuccess: () => router.push(`/dashboard/objetos/${id}`),
      },
    );
  };

  if (isLoading) {
    return <p className="text-text-secondary">Cargando...</p>;
  }

  if (!reporte) {
    return <p className="text-text-secondary">Reporte no encontrado</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Objetos Perdidos', href: '/dashboard/objetos' },
          {
            label: reporte.nombre_objeto,
            href: `/dashboard/objetos/${id}`,
          },
          { label: 'Editar' },
        ]}
      />

      <h1 className="text-text-primary text-2xl font-bold">Editar Reporte</h1>

      <Card className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Nombre del objeto</Label>
            <Input
              {...register('nombre_objeto')}
              placeholder="Ej: Celular Samsung"
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.nombre_objeto?.message}
            </p>
          </div>

          <div>
            <Label>Descripción</Label>
            <textarea
              {...register('descripcion')}
              placeholder="Describe el objeto..."
              className="rounded-input border-border focus:border-primary-500 focus:ring-primary-200 w-full border px-3 py-2 transition outline-none focus:ring-2"
              rows={4}
            />
            <p className="mt-1 text-sm text-red-500">
              {errors.descripcion?.message}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Ubicación donde se encontró</Label>
              <Input
                {...register('ubicacion')}
                placeholder="Ej: Edificio A, Salón 101"
              />
              <p className="mt-1 text-sm text-red-500">
                {errors.ubicacion?.message}
              </p>
            </div>

            <div>
              <Label>Lugar de entrega</Label>
              <select
                {...register('lugar_entrega')}
                className="rounded-input border-border focus:border-primary-500 focus:ring-primary-200 w-full border px-3 py-2 transition outline-none focus:ring-2"
              >
                {lugares.map((l) => (
                  <option key={l.value} value={l.value}>
                    {l.label}
                  </option>
                ))}
              </select>
              <p className="mt-1 text-sm text-red-500">
                {errors.lugar_entrega?.message}
              </p>
            </div>
          </div>

          <div>
            <Label>Foto (opcional)</Label>
            <div className="mt-1 flex items-center gap-4">
              <label
                className={cn(
                  'border-border text-text-secondary flex cursor-pointer items-center gap-2 rounded-lg border border-dashed px-4 py-3 text-sm transition',
                  'hover:border-primary-400 hover:text-primary-600',
                )}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleFileChange}
                  className="sr-only"
                />
                <span>Seleccionar archivo</span>
              </label>
              {foto && (
                <span className="text-text-muted text-sm">{foto.name}</span>
              )}
            </div>
            {preview && (
              <Image
                src={preview}
                alt="Preview"
                width={128}
                height={128}
                className="mt-2 h-32 w-32 rounded-lg object-cover"
                unoptimized
              />
            )}
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" loading={isPending}>
              Guardar Cambios
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/dashboard/objetos/${id}`)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function EditarReportePage() {
  const params = useParams();
  const id = params.id as string;

  return <EditarForm id={id} />;
}
