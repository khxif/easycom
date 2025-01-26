import { DashboardHeader } from "@/components/header/dashboard-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminProtected } from "@/providers/admin-protected";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProtected>
      <main className="flex h-svh overflow-y-hidden">
        <AdminSidebar />
        <section className="flex flex-col w-full">
          <DashboardHeader />
          <div className="min-h-full overflow-y-scroll">{children}</div>
        </section>
      </main>
    </AdminProtected>
  );
}
