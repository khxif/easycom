'use client';

import { Loading } from '@/components/core/loading';
import { ConfirmModal } from '@/components/dashboard/confirm-modal';
import { AdminsTable } from '@/components/dashboard/tables/admin-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { useDeleteAdminMutation } from '@/hooks/mutations';
import { useGetAdmins } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { MapPinHouseIcon, PencilIcon, PhoneIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function AdminsPage() {
  const { data, isLoading } = useGetAdmins();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Admins list</h1>
        <Link href="/admin/admins/create">
          <Button className="flex items-center space-x-1">
            <PlusCircleIcon className="size-8" />
            <p>Admins</p>
          </Button>
        </Link>
      </div>
      {!isLoading && data ? (
        <AdminsTable columns={columns} data={data?.data} isLoading={isLoading} />
      ) : (
        <Loading />
      )}
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
    accessorKey: 'location',
    header: () => (
      <span className="flex items-center space-x-1.5 py-4">
        <MapPinHouseIcon className="size-4" />
        <p>Location</p>
      </span>
    ),
    cell: row => (
      <span className="flex items-center space-x-1.5 py-4">
        <p className="capitalize">{row.getValue() as string}</p>
      </span>
    ),
  },
  {
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 py-2">
          <Link href={`/admin/admins/${row.original._id}/edit`}>
            <Button size="sm" variant="ghost" color="primary">
              <PencilIcon className="size-6" />
            </Button>
          </Link>
          <DeleteAdmin id={row.original._id} />
        </div>
      );
    },
  },
];

function DeleteAdmin({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync } = useDeleteAdminMutation();

  const handleDelete = async () => {
    try {
      const data = await mutateAsync(id);
      if (data.status !== 200) return toast.error('Failed to delete admin');

      queryClient.invalidateQueries({ queryKey: ['admins'] });
      toast.success('Admin deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete admin');
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
        description="Do you want to delete admin?"
        buttonText="Delete"
      />
    </>
  );
}
