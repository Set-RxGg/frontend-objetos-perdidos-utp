'use client';

import Link from 'next/link';

import { useAuth } from '@/features/auth';
import { useReportes, useReportesAdmin } from '@/features/reportes';
import { Card, Button, Breadcrumbs } from '@/components/ui';

export default function DashboardPage() {
  const { user } = useAuth();
  const { data: response } = useReportes();
  const { data: adminResponse } = useReportesAdmin();

  const reportes = response?.data ?? [];
  const adminReportes = adminResponse?.data ?? [];
  const isAdmin = user?.rol === 'administrativo';

  const total = isAdmin ? adminReportes.length : reportes.length;
  const extraviados = (isAdmin ? adminReportes : reportes).filter(
    (r) => r.estado === 'extraviado',
  ).length;
  const devueltos = (isAdmin ? adminReportes : reportes).filter(
    (r) => r.estado === 'devuelto',
  ).length;

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Dashboard' }]} />

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-text-primary text-2xl font-bold">
            Bienvenido, {user?.nombre}
          </h1>
          <p className="text-text-secondary text-sm">
            {isAdmin ? 'Panel de administración' : 'Panel de usuario'}
          </p>
        </div>

        {isAdmin && (
          <Link href="/dashboard/entregas">
            <Button>Gestionar Entregas</Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card className="flex items-center gap-4 p-6 transition-shadow hover:shadow-md">
          <div className="bg-primary-100 text-primary-600 flex h-12 w-12 items-center justify-center rounded-full">
            <span className="text-lg font-bold">{total}</span>
          </div>
          <div>
            <p className="text-text-secondary text-sm">Total Objetos</p>
            <p className="text-text-primary text-2xl font-bold">{total}</p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-6 transition-shadow hover:shadow-md">
          <div className="bg-danger-light text-danger-dark flex h-12 w-12 items-center justify-center rounded-full">
            <span className="text-lg font-bold">{extraviados}</span>
          </div>
          <div>
            <p className="text-text-secondary text-sm">Extraviados</p>
            <p className="text-text-primary text-2xl font-bold">
              {extraviados}
            </p>
          </div>
        </Card>

        <Card className="flex items-center gap-4 p-6 transition-shadow hover:shadow-md">
          <div className="bg-success-light text-success-dark flex h-12 w-12 items-center justify-center rounded-full">
            <span className="text-lg font-bold">{devueltos}</span>
          </div>
          <div>
            <p className="text-text-secondary text-sm">Devueltos</p>
            <p className="text-text-primary text-2xl font-bold">{devueltos}</p>
          </div>
        </Card>
      </div>

      {isAdmin && <AdminRecentSection reportes={adminReportes} />}

      <div className="flex gap-4">
        <Link href="/dashboard/reportar">
          <Button variant="primary">Reportar Objeto</Button>
        </Link>
        <Link href="/dashboard/objetos">
          <Button variant="outline">Ver Todos</Button>
        </Link>
      </div>
    </div>
  );
}

function AdminRecentSection({
  reportes,
}: {
  reportes: import('@/features/reportes').Reporte[];
}) {
  const pendientes = reportes.filter((r) => r.estado === 'extraviado');

  if (pendientes.length === 0) return null;

  return (
    <Card className="p-5">
      <h2 className="text-text-primary mb-3 font-semibold">
        Objetos Extraviados ({pendientes.length})
      </h2>
      <div className="space-y-2">
        {pendientes.slice(0, 5).map((reporte) => (
          <div
            key={reporte._id}
            className="bg-background-muted flex items-center justify-between rounded-lg px-4 py-2"
          >
            <div>
              <p className="text-text-primary text-sm font-medium">
                {reporte.nombre_objeto}
              </p>
              <p className="text-text-muted text-xs">{reporte.ubicacion}</p>
            </div>
            <Link href="/dashboard/entregas">
              <Button size="sm" variant="outline">
                Ver
              </Button>
            </Link>
          </div>
        ))}
      </div>
    </Card>
  );
}
