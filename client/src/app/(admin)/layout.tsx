import { DashboardHeader } from "@/components/header/dashboard-header";
import { AdminSidebar } from "@/components/layout/admin-sidebar";
import { AdminProtected } from "@/providers/admin-protected";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProtected>
      <main className="flex">
        <AdminSidebar />
        <section className="flex flex-col w-full">
          <DashboardHeader />
          {children}
        </section>
      </main>
    </AdminProtected>
  );
}
