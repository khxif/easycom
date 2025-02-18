import Link from 'next/link';
import { UserButton } from '../../core/user-button';
import { AdminSidebarMobile } from './admin-sidebar-mobile';
import { HomeIcon } from 'lucide-react';

export function DashboardHeader() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md w-full">
      <AdminSidebarMobile />

      <div className="flex justify-end w-full items-center space-x-5">
        <Link href="/">
          <HomeIcon className="size-6" />
        </Link>
        <UserButton />
      </div>
    </nav>
  );
}
