import { Logo } from "@/components/core/logo";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Heart as HeartIcon,
  ShoppingCart as ShoppingCartIcon,
} from "lucide-react";
import Link from "next/link";
import UserButton from "../core/user-button";
import SearchBar from "./search-bar";

export function Header() {
  return (
    <header className="flex flex-col max-w-7xl mx-auto p-4 space-y-4 ">
      <nav className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Tooltip key={link.id}>
              <TooltipTrigger>
                <Link href={link.href}>
                  <link.icon size={22} />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{link?.label}</TooltipContent>
            </Tooltip>
          ))}
          <UserButton />
        </div>
      </nav>
      <SearchBar />
    </header>
  );
}

const navLinks = [
  {
    id: 1,
    label: "Cart",
    icon: ShoppingCartIcon,
    href: "/cart",
  },
  {
    id: 2,
    label: "Favorites",
    icon: HeartIcon,
    href: "/favorites",
  },
];
