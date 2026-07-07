'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HiOutlineHome,
  HiOutlineMagnifyingGlass,
  HiOutlinePlusCircle,
  HiOutlineUser,
  HiOutlineClipboardDocumentList,
  HiOutlineXMark,
} from 'react-icons/hi2';
import type { IconType } from 'react-icons';
import { HiOutlineAcademicCap } from 'react-icons/hi2';

import { useAuth } from '@/features/auth';
import { cn } from '@/lib/cn';

interface NavItem {
  label: string;
  href: string;
  icon: IconType;
  adminOnly?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Dashboard', href: '/dashboard', icon: HiOutlineHome },
  {
    label: 'Objetos Perdidos',
    href: '/dashboard/objetos',
    icon: HiOutlineMagnifyingGlass,
  },
  {
    label: 'Reportar Objeto',
    href: '/dashboard/reportar',
    icon: HiOutlinePlusCircle,
  },
  {
    label: 'Entregas',
    href: '/dashboard/entregas',
    icon: HiOutlineClipboardDocumentList,
    adminOnly: true,
  },
  { label: 'Mi Perfil', href: '/dashboard/perfil', icon: HiOutlineUser },
];

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: Readonly<SidebarProps>) {
  const pathname = usePathname();
  const { user } = useAuth();
  const isAdmin = user?.rol === 'administrativo';

  const visibleItems = navItems.filter((item) => !item.adminOnly || isAdmin);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'border-sidebar-border bg-sidebar shadow-sidebar fixed top-0 left-0 z-40 flex h-full flex-col border-r text-white transition-all duration-300 md:static',
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-64 -translate-x-full md:w-16 md:translate-x-0',
        )}
      >
        <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-4">
          <div
            className={cn(
              'flex items-center gap-2',
              !isOpen && 'md:w-full md:justify-center',
            )}
          >
            <HiOutlineAcademicCap className="text-primary-400 h-6 w-6" />
            <span
              className={cn(
                'text-lg font-bold tracking-wide text-white transition-opacity',
                !isOpen && 'md:hidden md:opacity-0',
              )}
            >
              UTP
            </span>
          </div>
          <button
            onClick={onToggle}
            className="hover:bg-sidebar-hover flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:text-white md:hidden"
          >
            <HiOutlineXMark className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3 pt-4">
          {visibleItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                title={isOpen ? undefined : item.label}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all',
                  isOpen ? '' : 'md:justify-center md:px-0',
                  isActive
                    ? 'bg-primary-600/20 text-primary-400 font-medium'
                    : 'hover:bg-sidebar-hover text-gray-400 hover:text-white',
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span
                  className={cn(
                    'transition-opacity',
                    isOpen ? 'opacity-100' : 'md:hidden md:opacity-0',
                  )}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
