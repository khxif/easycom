'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { useAuthStore } from '@/stores/auth-store';
import { LogOutIcon, MonitorSmartphoneIcon, MoonStarIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { Button } from '../ui/button';

type Theme = 'light' | 'dark' | 'system';

export function UserButton() {
  const user = useAuthStore(state => state.user);
  const logout = useAuthStore(state => state.logout);
  const { theme: currentTheme, setTheme } = useTheme();

  const handleThemeChange = (theme: Theme) => {
    setTheme(theme);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src={user?.profile_picture} />
          <AvatarFallback>
            {user?.name
              ?.split(' ')
              .map(name => name[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[22rem]">
        <DropdownMenuLabel className="flex flex-col space-y-1">
          <h6>{user?.name}</h6>
          <p className="text-muted-foreground">{user?.email}</p>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {user?.is_admin && (
          <Link href="/admin/overview" prefetch>
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </Link>
        )}

        <Link href="/account" prefetch>
          <DropdownMenuItem>Account</DropdownMenuItem>
        </Link>
        <DropdownMenuItem className="flex flex-col items-start space-y-1">
          <h6 className="font-semibold">Color Theme</h6>
          <div className="flex space-x-4">
            {themes.map(theme => (
              <Button
                onClick={() => handleThemeChange(theme)}
                variant="outline"
                className={cn('rounded-full w-full', theme === currentTheme && 'border-blue-600')}
                key={theme}
              >
                {theme === 'light' && <SunIcon />}
                {theme === 'dark' && <MoonStarIcon />}
                {theme === 'system' && <MonitorSmartphoneIcon />}
                {theme}
              </Button>
            ))}
          </div>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Button
            onClick={() => logout()}
            variant="ghost"
            className="text-red-600 font-medium flex items-center justify-center w-full hover:text-red-600"
          >
            <LogOutIcon />
            <p>Logout</p>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

const themes = ['light', 'dark', 'system'] as Theme[];
