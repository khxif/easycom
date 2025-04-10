import { RootLayout } from '@/layout/root-layout';
import { Protected } from '@/providers/protected';
import { Providers } from '@/providers/providers';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Toaster } from 'sonner';
import './globals.css';

const Montseratt = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Easycom',
  description: 'E-commerce made easy!',
};

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/logo.png" type="image/x-icon" />
      <body className={`${Montseratt.className}`}>
        <Providers>
          <RootLayout>
            <Protected>
              <NuqsAdapter>{children}</NuqsAdapter>
            </Protected>
          </RootLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
