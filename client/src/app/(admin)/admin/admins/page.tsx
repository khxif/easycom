'use client';

import { AdminsTable } from '@/components/dashboard/tables/admin-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useGetAdmins } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PhoneIcon, ShieldIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';

export default function AdminsPage() {
  const { data, isLoading } = useGetAdmins();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
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
    accessorKey: 'profile_picture',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4 p-2">
        <Avatar>
          <AvatarImage src={(row.getValue('profile_picture') as string) ?? ''} />
          <AvatarFallback>{row.original.name.split(' ').join('')[0]}</AvatarFallback>
        </Avatar>

        <Link href={`/admin/admins/${row.original._id}`}>
          <span className="flex flex-col space-y-2">
            <h2 className="font-medium">{row.original.name}</h2>
            <p className="text-muted-foreground text-sm">{row.original.email}</p>
          </span>
        </Link>
      </div>
    ),
  },
  {
    accessorKey: 'phone_number',
    header: () => (
      <span className="flex items-center space-x-1.5 py-4">
        <PhoneIcon className="size-4" />
        <p>Phone</p>
      </span>
    ),
  },
  {
    accessorKey: 'role',
    header: () => (
      <span className="flex items-center space-x-1.5 py-4">
        <ShieldIcon className="size-4" />
        <p>Role</p>
      </span>
    ),
    cell: row => (
      <span className="flex items-center space-x-1.5 py-4">
        <p className="capitalize">{(row.getValue() as string).split('-').join(' ')}</p>
      </span>
    ),
  },
  {
    accessorKey: '_id',
    header: '',
    cell: row => {
      return (
        <div className="flex space-x-1 py-2">
          <Link href={`/admin/admins/${row.getValue()}/edit`}>
            <Button size="sm" variant="ghost" color="primary">
              <PencilIcon className="size-6" />
            </Button>
          </Link>
          <Button size="sm" variant="ghost">
            <TrashIcon className="text-red-600 size-6" />
          </Button>
        </div>
      );
    },
  },
];
