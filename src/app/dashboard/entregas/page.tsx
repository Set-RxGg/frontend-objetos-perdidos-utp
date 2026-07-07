'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  useReportesAdmin,
  useDevolverReporte,
  devolverReporteSchema,
} from '@/features/reportes';
import type { DevolverReporteSchema } from '@/features/reportes';
import {
  Card,
  Button,
  Input,
  Label,
  Pagination,
  Breadcrumbs,
} from '@/components/ui';

const lugarEntregaLabels: Record<string, string> = {
  GARITA_SEGURIDAD: 'Garita de Seguridad',
  LABORATORIO_FISC: 'Laboratorio FISC',
};

const ITEMS_PER_PAGE = 5;

function EntregasContent() {
  const { data: response, isLoading } = useReportesAdmin();
  const { mutate: devolver, isPending: isDevolutiong } = useDevolverReporte();
  const searchParams = useSearchParams();

  const [selectedId, setSelectedId] = useState<string | null>(
    searchParams.get('objetoId') ?? null,
  );
  const [page, setPage] = useState(1);

  const reportes = response?.data ?? [];
  const extraviados = reportes.filter((r) => r.estado === 'extraviado');

  const devueltos = reportes.filter((r) => r.estado === 'devuelto');

  const extraviadosPages = Math.max(
    1,
    Math.ceil(extraviados.length / ITEMS_PER_PAGE),
  );
  const devueltosPages = Math.max(
    1,
    Math.ceil(devueltos.length / ITEMS_PER_PAGE),
  );
  const paginatedExtraviados = extraviados.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );
  const paginatedDevueltos = devueltos.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DevolverReporteSchema>({
    resolver: zodResolver(devolverReporteSchema),
  });

  const selectedReporte = selectedId
    ? reportes.find((r) => r._id === selectedId)
    : null;

  const onSubmit = (data: DevolverReporteSchema) => {
    if (!selectedId) return;
    devolver(
      { id: selectedId, data },
      {
        onSuccess: () => {
          setSelectedId(null);
          reset();
        },
      },
    );
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Gestión de Entregas' },
        ]}
      />

      <div className="flex items-center justify-between">
        <h1 className="text-text-primary text-2xl font-bold">
          Gestión de Entregas
        </h1>
      </div>

      {isLoading ? (
        <p className="text-text-secondary">Cargando reportes...</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            <h2 className="text-text-primary text-lg font-semibold">
              Objetos Extraviados ({extraviados.length})
            </h2>

            {extraviados.length === 0 ? (
              <Card className="text-text-secondary p-8 text-center">
                No hay objetos extraviados pendientes de entrega
              </Card>
            ) : (
              <>
                {paginatedExtraviados.map((r) => (
                  <Card
                    key={r._id}
                    className={`cursor-pointer p-5 transition-all hover:shadow-md ${
                      selectedId === r._id ? 'ring-primary-500 ring-2' : ''
                    }`}
                    onClick={() => {
                      setSelectedId(r._id);
                      reset();
                    }}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-text-primary font-semibold">
                          {r.nombre_objeto}
                        </h3>
                        <p className="text-text-secondary mt-1 text-sm">
                          {r.descripcion}
                        </p>
                        <div className="text-text-muted mt-2 flex gap-4 text-xs">
                          <span>Ubicación: {r.ubicacion}</span>
                          <span>{lugarEntregaLabels[r.lugar_entrega]}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
                <Pagination
                  currentPage={page}
                  totalPages={extraviadosPages}
                  onPageChange={setPage}
                />
              </>
            )}

            <h2 className="text-text-primary text-lg font-semibold">
              Objetos Devueltos
            </h2>

            {devueltos.length === 0 ? (
              <Card className="text-text-secondary p-8 text-center">
                No hay objetos devueltos aún
              </Card>
            ) : (
              <>
                {paginatedDevueltos.map((r) => (
                  <Card key={r._id} className="p-5 opacity-75">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-text-primary font-semibold">
                          {r.nombre_objeto}
                        </h3>
                        <p className="text-text-secondary mt-1 text-sm">
                          Devuelto a {r.devuelto_a_nombre} (Cédula:{' '}
                          {r.devuelto_a_cedula})
                        </p>
                        {r.fecha_devolucion && (
                          <p className="text-text-muted text-xs">
                            {new Date(r.fecha_devolucion).toLocaleDateString(
                              'es-PA',
                            )}
                          </p>
                        )}
                      </div>
                      <span className="bg-success-light text-success-dark rounded-full px-2.5 py-0.5 text-xs font-medium">
                        Devuelto
                      </span>
                    </div>
                  </Card>
                ))}
                <Pagination
                  currentPage={page}
                  totalPages={devueltosPages}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>

          {selectedReporte && (
            <div>
              <Card className="sticky top-4 p-5">
                <h2 className="text-text-primary mb-4 text-lg font-semibold">
                  Marcar como Devuelto
                </h2>

                <p className="text-text-secondary mb-4 text-sm">
                  Objeto: <strong>{selectedReporte.nombre_objeto}</strong>
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label>Nombre del reclamante</Label>
                    <Input
                      {...register('devuelto_a_nombre')}
                      placeholder="Nombre completo"
                    />
                    <p className="mt-1 text-sm text-red-500">
                      {errors.devuelto_a_nombre?.message}
                    </p>
                  </div>

                  <div>
                    <Label>Cédula del reclamante</Label>
                    <Input
                      {...register('devuelto_a_cedula')}
                      placeholder="8-123-456"
                    />
                    <p className="mt-1 text-sm text-red-500">
                      {errors.devuelto_a_cedula?.message}
                    </p>
                  </div>

                  <div>
                    <Label>Teléfono (opcional)</Label>
                    <Input
                      {...register('devuelto_a_telefono')}
                      placeholder="6000-0000"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <Button type="submit" loading={isDevolutiong}>
                      Confirmar Devolución
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        setSelectedId(null);
                        reset();
                      }}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function EntregasPage() {
  return (
    <Suspense fallback={<p className="text-text-secondary">Cargando...</p>}>
      <EntregasContent />
    </Suspense>
  );
}
