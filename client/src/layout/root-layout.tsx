'use client';

import { Loading } from '@/components/core/loading';
import { useInitApp } from '@/hooks/use-init-app';
import { useRootLayoutStore } from '@/stores/root-layout-store';

export function RootLayout({ children }: { children: React.ReactNode }) {
  const { isAppInitialized } = useRootLayoutStore();

  useInitApp();

  return <>{isAppInitialized ? children : <Loading />}</>;
}
