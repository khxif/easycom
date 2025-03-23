'use client';

import { cn } from '@/lib/utils';
import {
  BookUserIcon,
  HandshakeIcon,
  LayoutDashboardIcon,
  SendToBackIcon,
  ShoppingBagIcon,
  UserCogIcon,
  UsersIcon,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from '../../core/logo';

export const links = [
  {
    title: 'Overview',
    url: '/admin/overview',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Products',
    url: '/admin/products',
    icon: ShoppingBagIcon,
  },
  {
    title: 'Customers',
    url: '/admin/customers',
    icon: UsersIcon,
  },
  {
    title: 'Sellers',
    url: '/admin/sellers',
    icon: HandshakeIcon,
  },
  {
    title: 'Admins',
    url: '/admin/admins',
    icon: UserCogIcon,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: SendToBackIcon,
  },
  {
    title: 'Account',
    url: '/admin/account',
    icon: BookUserIcon,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside
      className="hidden max-w-xs w-full h-svh flex-col space-y-20 py-4 px-2 bg-[#202427] 
      text-white md:flex"
    >
      <div>
        <Logo />
      </div>
      <section className="flex flex-col space-y-3">
        {links?.map(link => (
          <Link
            href={link.url}
            key={link.url}
            className={cn('flex items-center space-x-2 p-4 rounded-lg hover:bg-zinc-700', {
              'bg-zinc-700': pathname.startsWith(link.url),
            })}
          >
            <link.icon size={20} />
            <p className="text-sm">{link.title}</p>
          </Link>
        ))}
      </section>
    </aside>
  );
}
