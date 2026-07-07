'use client';

import { useAuth } from '@/features/auth';
import { Card, Breadcrumbs } from '@/components/ui';
import { getInitials } from '@/lib/get-initials';

export default function PerfilPage() {
  const { user } = useAuth();

  if (!user) {
    return <p className="text-text-secondary">Cargando...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Breadcrumbs
        items={[
          { label: 'Dashboard', href: '/dashboard' },
          { label: 'Mi Perfil' },
        ]}
      />

      <h1 className="text-text-primary text-2xl font-bold">Mi Perfil</h1>

      <Card className="p-6">
        <div className="mb-6 flex items-center gap-4">
          <div className="bg-primary-100 text-primary-600 flex h-16 w-16 items-center justify-center rounded-full text-xl font-bold tracking-wider">
            {getInitials(user.nombre, user.apellido)}
          </div>
          <div>
            <h2 className="text-text-primary text-xl font-semibold">
              {user.nombre} {user.apellido}
            </h2>
            <p className="text-text-secondary text-sm">
              {user.rol === 'administrativo' ? 'Administrador' : 'Usuario'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-text-muted text-sm">Cédula</p>
            <p className="text-text-primary font-medium">{user.cedula}</p>
          </div>

          <div>
            <p className="text-text-muted text-sm">Email</p>
            <p className="text-text-primary font-medium">{user.email}</p>
          </div>

          {user.telefono && (
            <div>
              <p className="text-text-muted text-sm">Teléfono</p>
              <p className="text-text-primary font-medium">{user.telefono}</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
