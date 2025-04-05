'use client';

import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
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
    title: 'Departments',
    url: '/admin/departments',
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
    isProtected: true,
  },
  {
    title: 'Admins',
    url: '/admin/admins',
    icon: UserCogIcon,
    isProtected: true,
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
  const user = useAuthStore(state => state.user);

  const pathname = usePathname();
  const filteredRoutes = links.filter(route => {
    if (!route.isProtected) return true;
    if (route.isProtected && user?.role === 'super-admin') return true;

    return false;
  });
  return (
    <aside
      className="hidden max-w-xs w-full h-svh flex-col space-y-20 py-4 px-2 bg-[#202427] 
      text-white md:flex"
    >
      <div>
        <Logo />
      </div>
      <section className="flex flex-col space-y-3">
        {filteredRoutes?.map(link => (
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
