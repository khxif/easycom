import { UserButton } from '../../core/user-button';
import { AdminSidebarMobile } from './admin-sidebar-mobile';

export function DashboardHeader() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md w-full">
      <AdminSidebarMobile />

      <div className="flex justify-end w-full items-end">
        <UserButton />
      </div>
    </nav>
  );
}
