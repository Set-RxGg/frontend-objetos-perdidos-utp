'use client';

import { useParams, useRouter } from 'next/navigation';

import { useReporte, useDeleteReporte } from '@/features/reportes';
import type { ReporteEstado } from '@/features/reportes';
import { useAuth } from '@/features/auth';
import Image from 'next/image';

import { Card, Button, Breadcrumbs } from '@/components/ui';
import { env } from '@/config/env';

const statusLabels: Record<ReporteEstado, string> = {
  extraviado: 'Extraviado',
  devuelto: 'Devuelto',
};

const lugarEntregaLabels: Record<string, string> = {
  GARITA_SEGURIDAD: 'Garita de Seguridad',
  LABORATORIO_FISC: 'Laboratorio FISC',
};

export default function ObjetoDetallePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const { user } = useAuth();
  const isAdmin = user?.rol === 'administrativo';

  const { data: response, isLoading } = useReporte(id);
  const { mutate: deleteObject, isPending: isDeleting } = useDeleteReporte();

  const objeto = response?.data;

  const handleDelete = () => {
    if (window.confirm('¿Estás seguro de eliminar este reporte?')) {
      deleteObject(id, {
        onSuccess: () => router.push('/dashboard/objetos'),
      });
    }
  };

  if (isLoading) {
    return <p className="text-text-secondary">Cargando...</p>;
  }

  if (!objeto) {
    return <p className="text-text-secondary">Objeto no encontrado</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Objetos Perdidos', href: '/dashboard/objetos' },
          { label: objeto.nombre_objeto },
        ]}
      />

      <Card className="p-6">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h1 className="text-text-primary text-2xl font-bold">
              {objeto.nombre_objeto}
            </h1>
            <p className="text-text-secondary mt-1 text-sm">
              Reportado por usuario #{objeto.reportado_por}
            </p>
          </div>
        </div>

        {objeto.foto_url && (
          <div className="mb-6 overflow-hidden rounded-lg">
            <Image
              src={
                objeto.foto_url.startsWith('/')
                  ? `${env.NEXT_PUBLIC_API_URL.replace(/\/$/, '')}${objeto.foto_url}`
                  : objeto.foto_url
              }
              alt={objeto.nombre_objeto}
              width={672}
              height={256}
              className="h-64 w-full object-cover"
              unoptimized
            />
          </div>
        )}

        <div className="mb-6 space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-text-muted text-sm">Estado</p>
              <p className="text-text-primary font-medium">
                {statusLabels[objeto.estado]}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Lugar de entrega</p>
              <p className="text-text-primary font-medium">
                {lugarEntregaLabels[objeto.lugar_entrega]}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Ubicación</p>
              <p className="text-text-primary font-medium">
                {objeto.ubicacion}
              </p>
            </div>
            <div>
              <p className="text-text-muted text-sm">Fecha del reporte</p>
              <p className="text-text-primary font-medium">
                {new Date(objeto.createdAt).toLocaleDateString('es-PA')}
              </p>
            </div>
          </div>

          {objeto.estado === 'devuelto' && (
            <div className="bg-success-light rounded-lg p-3">
              <p className="text-success-dark text-sm font-medium">
                Devuelto a {objeto.devuelto_a_nombre} (Cédula:{' '}
                {objeto.devuelto_a_cedula})
                {objeto.fecha_devolucion && (
                  <span>
                    {' '}
                    el{' '}
                    {new Date(objeto.fecha_devolucion).toLocaleDateString(
                      'es-PA',
                    )}
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-text-muted text-sm">Descripción</p>
          <p className="text-text-primary mt-1">{objeto.descripcion}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          {isAdmin && (
            <>
              <Button
                variant="outline"
                onClick={() => router.push(`/dashboard/objetos/${id}/editar`)}
              >
                Editar
              </Button>
              {objeto.estado === 'extraviado' && (
                <Button
                  variant="primary"
                  onClick={() =>
                    router.push(`/dashboard/entregas?objetoId=${objeto._id}`)
                  }
                >
                  Generar Reporte de Devolución
                </Button>
              )}
              <Button
                variant="danger"
                onClick={handleDelete}
                loading={isDeleting}
              >
                Eliminar
              </Button>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
