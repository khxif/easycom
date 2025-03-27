import { TooltipProvider } from '@/components/ui/tooltip';
import { ReactNode } from 'react';
import { QueryProvider } from './query-provider';
import { ThemeProvider } from './theme-provide';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
      <QueryProvider>
        <TooltipProvider>{children}</TooltipProvider>
      </QueryProvider>
    </ThemeProvider>
  );
}
