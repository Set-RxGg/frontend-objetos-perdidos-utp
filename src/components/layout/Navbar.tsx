'use client';

import { useAuth } from '@/features/auth';
import { Button } from '@/components/ui';
import { getInitials } from '@/lib/get-initials';
import { HiOutlineBars3BottomLeft } from 'react-icons/hi2';

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: Readonly<NavbarProps>) {
  const { user, logout } = useAuth();

  return (
    <header className="border-sidebar-border bg-navbar text-navbar-foreground flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="hover:bg-sidebar-hover flex h-9 w-9 items-center justify-center rounded-lg text-gray-300 transition-colors hover:text-white"
          title="Toggle sidebar"
        >
          <HiOutlineBars3BottomLeft className="h-5 w-5" />
        </button>

        <h2 className="text-lg font-semibold">Sistema de Objetos Perdidos</h2>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary-600 flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold tracking-wide text-white">
            {user ? getInitials(user.nombre, user.apellido) : '??'}
          </div>
          <span className="hidden text-sm text-gray-300 sm:inline">
            {user?.nombre} {user?.apellido}
          </span>
          <span className="bg-primary-700 hidden rounded px-1.5 py-0.5 text-xs font-medium text-white sm:inline">
            {user?.rol === 'administrativo' ? 'Admin' : 'User'}
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={logout}
          className="hover:bg-sidebar-hover border-gray-500 text-gray-300 hover:text-white"
        >
          Salir
        </Button>
      </div>
    </header>
  );
}
