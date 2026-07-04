'use client';

import { ReactNode } from 'react';

import QueryProvider from './QueryProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({
  children,
}: Readonly<AppProvidersProps>) {
  return <QueryProvider>{children}</QueryProvider>;
}
