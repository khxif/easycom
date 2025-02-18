'use client';

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { MenuIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { links } from './admin-sidebar';

export function AdminSidebarMobile() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <MenuIcon className="size-6 md:hidden cursor-pointer" onClick={() => setOpen(true)} />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetTitle>Easycom</SheetTitle>

        <div className="flex flex-col space-y-4 mt-10">
          {links.map(link => (
            <SheetClose key={link.url}>
              <Link
                href={link.url}
                className={cn(
                  'flex items-center space-x-2 p-4 rounded-lg hover:bg-zinc-400 dark:hover:bg-zinc-700',
                  pathname.startsWith(link.url) && 'bg-zinc-400 dark:bg-zinc-700',
                )}
              >
                <link.icon className="size-4" />
                <span>{link.title}</span>
              </Link>
            </SheetClose>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
