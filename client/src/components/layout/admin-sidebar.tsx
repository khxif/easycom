"use client";

import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { Logo } from "../core/logo";
import Link from "next/link";
import { cn } from "@/lib/utils";

const links = [
  {
    title: "Overview",
    url: "/admin",
    icon: Home,
  },
  {
    title: "Products",
    url: "/admin/products",
    icon: Inbox,
  },
  {
    title: "Users",
    url: "/admin/users",
    icon: Calendar,
  },
  {
    title: "Admins",
    url: "/admin/admins",
    icon: Search,
  },
  {
    title: "Account",
    url: "/admin/account",
    icon: Settings,
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  console.log(pathname);
  return (
    <aside className="hidden max-w-xs w-full h-svh flex-col space-y-20 py-4 px-2 bg-[#202427] 
      text-white md:flex">
      <div>
        <Logo />
      </div>
      <section className="flex flex-col space-y-3">
        {links?.map((link) => (
          <Link
            href={link.url}
            key={link.url}
            className={cn("flex items-center space-x-2 p-4 rounded-lg hover:bg-zinc-700",{
              "bg-zinc-700": pathname === link.url,
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
