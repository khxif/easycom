'use client';

import { getErrorMessage } from '@/lib/utils';
import { MutationCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';
import { toast } from 'sonner';

export function QueryProvider({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: 1, refetchOnWindowFocus: false },
      mutations: { retry: 1 },
    },
    mutationCache: new MutationCache({
      onError: onQueryMutationError,
    }),
  });

  function onQueryMutationError(error: Error) {
    toast.error(getErrorMessage(error));
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
