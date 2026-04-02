'use client';

import { ReactNode } from 'react';
import { SurfaceProvider } from '@/lib/surface/context';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <SurfaceProvider>
      {children}
    </SurfaceProvider>
  );
}
