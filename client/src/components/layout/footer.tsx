'use client';

import { cn } from '@/lib/utils';
import { HeartIcon, HomeIcon, ShoppingCartIcon, SquareUserRoundIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();
  return (
    <footer
      className="md:hidden w-full fixed bottom-0 left-0 py-4 px-8 bg-inherit 
    flex items-center justify-between"
    >
      {links.map(link => (
        <Link
          href={link.href}
          key={link.id}
          className={cn(
            'flex items-center justify-center flex-col space-y-2  hover:text-zinc-600',
            {
              'text-zinc-600': link.href === pathname,
            },
          )}
        >
          <link.icon className="size-5" />
          <h6 className="text-sm font-medium">{link.label}</h6>
        </Link>
      ))}
    </footer>
  );
}

const links = [
  {
    id: 1,
    label: 'Home',
    icon: HomeIcon,
    href: '/',
  },
  {
    id: 2,
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
  {
    id: 3,
    label: 'Cart',
    icon: ShoppingCartIcon,
    href: '/cart',
  },
  {
    id: 4,
    label: 'Account',
    icon: SquareUserRoundIcon,
    href: '/account',
  },
];
