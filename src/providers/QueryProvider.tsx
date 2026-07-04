'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

import { queryClient } from '@/lib/react-query/query-client';

interface QueryProviderProps {
  children: ReactNode;
}

export default function QueryProvider({
  children,
}: Readonly<QueryProviderProps>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
