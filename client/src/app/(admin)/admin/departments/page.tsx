'use client';

import { Button } from '@/components/ui/button';
import { PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function DepartmentsPage() {
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Departments</h1>
        <Link href="/admin/departments/create">
          <Button className="flex items-center space-x-1">
            <PlusCircleIcon className="size-8" />
            <p>Departments</p>
          </Button>
        </Link>
      </div>
    </main>
  );
}
