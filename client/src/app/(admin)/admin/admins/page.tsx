'use client';

import { AdminsTable } from '@/components/dashboard/tables/admin-table';
import { Button } from '@/components/ui/button';
import { useGetAdmins } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export default function AdminsPage() {
  const { data, isLoading } = useGetAdmins();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Admins list</h1>
        <Link href="/admin/admins/create">
          <Button>Admins</Button>
        </Link>
      </div>
      {data?.data && <AdminsTable columns={columns} data={data?.data} isLoading={isLoading} />}
    </main>
  );
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Admin Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'phone_number',
    header: 'Phone Number',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
];
