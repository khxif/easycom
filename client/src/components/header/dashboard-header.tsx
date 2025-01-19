import { MenuIcon } from "lucide-react";
import UserButton from "../core/user-button";

export function DashboardHeader() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <MenuIcon />
      <UserButton />
    </nav>
  );
}
