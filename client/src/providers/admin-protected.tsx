"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export function AdminProtected({ children }: { children: ReactNode }) {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!user || !user.is_admin) router.push("/login");
  }, [user, router]);

  return <>{children}</>;
}
