'use client';

import { Logo } from '@/components/core/logo';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useAuthStore } from '@/stores/auth-store';
import { HeartIcon, SearchIcon, ShoppingCartIcon } from 'lucide-react';
import Link from 'next/link';
import { UserButton } from '../core/user-button';
import { Button } from '../ui/button';
import { useState } from 'react';
import { SearchModal } from '../layout/search-modal';

export function Header() {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  return (
    <header className="flex flex-col max-w-7xl mx-auto p-4 space-y-4 ">
      <nav className="flex items-center justify-between">
        <Logo />

        <div className="flex items-center space-x-6">
          <Tooltip>
            <TooltipTrigger>
              <SearchIcon className="size-5" onClick={() => setIsSearchModalOpen(true)} />
            </TooltipTrigger>
            <TooltipContent>Search Products</TooltipContent>
          </Tooltip>

          {navLinks.map(link => (
            <Tooltip key={link.id}>
              <TooltipTrigger className="hidden md:block">
                <Link href={link.href}>
                  <link.icon className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>{link?.label}</TooltipContent>
            </Tooltip>
          ))}
          {isAuthenticated ? (
            <UserButton />
          ) : (
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </nav>
      <SearchModal isOpen={isSearchModalOpen} setIsOpen={setIsSearchModalOpen} />
    </header>
  );
}

const navLinks = [
  {
    id: 1,
    label: 'Cart',
    icon: ShoppingCartIcon,
    href: '/cart',
  },
  {
    id: 2,
    label: 'Favorites',
    icon: HeartIcon,
    href: '/favorites',
  },
];
