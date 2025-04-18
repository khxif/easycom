'use client';

import { ConfirmModal } from '@/components/dashboard/confirm-modal';
import { CustomersTable } from '@/components/dashboard/tables/customer-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDeleteUserMutation } from '@/hooks/mutations';
import { useGetUsers } from '@/hooks/queries';
import { useExtractSearchParams } from '@/hooks/use-extract-search-params';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { PhoneIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function UsersPage() {
  const { searchParams } = useExtractSearchParams();
  const { data, isLoading } = useGetUsers(searchParams);
  
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Customers list</h1>
      </div>

      <CustomersTable columns={columns} data={data?.data} meta={data?.meta} isLoading={isLoading} />
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

        <Link href={`/admin/customers/${row.original._id}`}>
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
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => <DeleteProduct id={row.original._id} />,
  },
];

function DeleteProduct({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync } = useDeleteUserMutation();

  const handleDelete = async () => {
    try {
      const data = await mutateAsync(id);
      if (data.status !== 200) return toast.error('Failed to delete customer');

      queryClient.invalidateQueries({ queryKey: ['users'] });
      toast.success('Customer deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete customer');
    }
  };
  return (
    <>
      <Button size="sm" variant="ghost" onClick={() => setIsModalOpen(true)}>
        <TrashIcon className="text-red-600 size-6" />
      </Button>
      <ConfirmModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onConfirm={handleDelete}
        title="Confirm Delete"
        description="Do you want to delete this customer?"
        buttonText="Delete"
      />
    </>
  );
}
