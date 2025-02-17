import { RootLayout } from '@/layout/root-layout';
import { Providers } from '@/providers/providers';
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
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
      <body className={`${Montseratt.className}`}>
        <Providers>
          <RootLayout>{children}</RootLayout>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
