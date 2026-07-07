'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { useCreateReporte, createReporteSchema } from '@/features/reportes';
import type { CreateReporteSchema } from '@/features/reportes';
import Image from 'next/image';

import { Button, Card, Input, Label, Breadcrumbs } from '@/components/ui';
import { cn } from '@/lib/cn';

const lugares = [
  { value: 'GARITA_SEGURIDAD' as const, label: 'Garita de Seguridad' },
  { value: 'LABORATORIO_FISC' as const, label: 'Laboratorio FISC' },
];

export default function ReportarPage() {
  const router = useRouter();
  const { mutate: create, isPending } = useCreateReporte();
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateReporteSchema>({
    resolver: zodResolver(createReporteSchema),
    defaultValues: {
      lugar_entrega: 'GARITA_SEGURIDAD',
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const onSubmit = (data: CreateReporteSchema) => {
    create(
      { ...data, foto: foto ?? undefined } as Parameters<typeof create>[0],
      {
        onSuccess: () => router.push('/dashboard/objetos'),
      },
    );
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Reportar Objeto' },
        ]}
      />

      <h1 className="text-text-primary text-2xl font-bold">Reportar Objeto</h1>

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
              Reportar
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
