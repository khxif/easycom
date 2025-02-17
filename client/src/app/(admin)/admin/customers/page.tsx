'use client';

import { Loading } from '@/components/core/loading';
import { CustomersTable } from '@/components/dashboard/tables/customer-table';
import { Button } from '@/components/ui/button';
import { useGetUsers } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import { MailIcon, PhoneIcon, TrashIcon } from 'lucide-react';

export default function UsersPage() {
  const { data, isLoading } = useGetUsers();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Customers list</h1>
      </div>
      {!isLoading ? (
        <CustomersTable columns={columns} data={data?.data} isLoading={isLoading} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: () => (
      <span className="flex items-center space-x-1.5 py-4">
        <MailIcon className="size-4" />
        <p>Email</p>
      </span>
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
    accessorKey: '_id',
    header: '',
    cell: () => (
      <div className="flex space-x-1 py-2">
        <Button size="sm" variant="ghost">
          <TrashIcon className="text-red-600 size-6" />
        </Button>
      </div>
    ),
  },
];
