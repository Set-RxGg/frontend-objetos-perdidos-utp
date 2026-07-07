'use client';

import { ReactNode } from 'react';

import QueryProvider from './QueryProvider';
import AuthProvider from './AuthProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({
  children,
}: Readonly<AppProvidersProps>) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
