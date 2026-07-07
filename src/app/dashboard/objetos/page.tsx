'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import { useReportes } from '@/features/reportes';
import type { ReporteEstado } from '@/features/reportes';
import { Card, Input, Button, Pagination, Breadcrumbs } from '@/components/ui';

const ITEMS_PER_PAGE = 6;

const statusColors: Record<ReporteEstado, string> = {
  extraviado: 'bg-danger-light text-danger-dark',
  devuelto: 'bg-success-light text-success-dark',
};

const statusLabels: Record<ReporteEstado, string> = {
  extraviado: 'Extraviado',
  devuelto: 'Devuelto',
};

const lugarEntregaLabels: Record<string, string> = {
  GARITA_SEGURIDAD: 'Garita de Seguridad',
  LABORATORIO_FISC: 'Laboratorio FISC',
};

export default function ObjetosPage() {
  const { data: response, isLoading } = useReportes();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const reportes = response?.data ?? [];
    return reportes.filter(
      (r) =>
        r.nombre_objeto.toLowerCase().includes(search.toLowerCase()) ||
        r.descripcion.toLowerCase().includes(search.toLowerCase()),
    );
  }, [response, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE,
  );

  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Objetos Perdidos' },
        ]}
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-text-primary text-2xl font-bold">
          Objetos Perdidos
        </h1>

        <Link href="/dashboard/reportar">
          <Button>Reportar Objeto</Button>
        </Link>
      </div>

      <Input
        placeholder="Buscar objetos por nombre o descripción..."
        value={search}
        onChange={(e) => handleSearch(e.target.value)}
        className="max-w-md"
      />

      {isLoading ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse p-5">
              <div className="mb-3 h-5 w-3/4 rounded bg-gray-200" />
              <div className="mb-3 space-y-2">
                <div className="h-4 w-full rounded bg-gray-100" />
                <div className="h-4 w-2/3 rounded bg-gray-100" />
              </div>
              <div className="flex justify-between">
                <div className="h-3 w-20 rounded bg-gray-100" />
                <div className="h-3 w-16 rounded bg-gray-100" />
              </div>
            </Card>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <Card className="flex flex-col items-center gap-3 p-12 text-center">
          <div className="bg-primary-100 text-primary-500 flex h-16 w-16 items-center justify-center rounded-full text-2xl">
            ?
          </div>
          <p className="text-text-primary text-lg font-medium">
            {search ? 'Sin resultados' : 'No hay objetos registrados'}
          </p>
          <p className="text-text-secondary text-sm">
            {search
              ? 'Intenta con otros términos de búsqueda'
              : 'Sé el primero en reportar un objeto perdido'}
          </p>
          {!search && (
            <Link href="/dashboard/reportar">
              <Button variant="primary" className="mt-2">
                Reportar Objeto
              </Button>
            </Link>
          )}
        </Card>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {paginated.map((r) => (
              <Link key={r._id} href={`/dashboard/objetos/${r._id}`}>
                <Card className="group cursor-pointer p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                  <div className="mb-3 flex items-start justify-between">
                    <h3 className="text-text-primary group-hover:text-primary-600 font-semibold transition-colors">
                      {r.nombre_objeto}
                    </h3>
                    <span
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[r.estado]}`}
                    >
                      {statusLabels[r.estado]}
                    </span>
                  </div>

                  <p className="text-text-secondary mb-3 line-clamp-2 text-sm leading-relaxed">
                    {r.descripcion}
                  </p>

                  <div className="text-text-muted flex items-center justify-between text-xs">
                    <span>{lugarEntregaLabels[r.lugar_entrega]}</span>
                    <span>{r.ubicacion}</span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
}
