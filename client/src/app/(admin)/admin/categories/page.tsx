'use client';

import { Loading } from '@/components/core/loading';
import { ConfirmModal } from '@/components/dashboard/confirm-modal';
import { CategoriesTable } from '@/components/dashboard/tables/categories/categories-table';
import { Button } from '@/components/ui/button';
import { useDeleteCategoryMutation } from '@/hooks/mutations';
import { useGetCategories } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PlusCircleIcon, TrashIcon } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CategoriesPage() {
  const { data, isLoading } = useGetCategories();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Categories</h1>
        <Link href="/admin/categories/create">
          <Button className="flex items-center space-x-1">
            <PlusCircleIcon className="size-8" />
            <p>Category</p>
          </Button>
        </Link>
      </div>

      {!isLoading ? (
        <CategoriesTable columns={columns} data={data?.data} isLoading={isLoading} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

const columns: ColumnDef<Category>[] = [
  {
    accessorKey: 'name',
    header: 'Category Name',
  },
  {
    accessorKey: 'description',
    header: 'Description',
  },
  {
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-1 py-2">
          <Link href={`/admin/categories/${row.original._id}/edit`}>
            <Button size="sm" variant="ghost" color="primary">
              <PencilIcon className="size-6" />
            </Button>
          </Link>
          <DeleteCategory id={row.original._id} />
        </div>
      );
    },
  },
];

function DeleteCategory({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync } = useDeleteCategoryMutation();

  const handleDelete = async () => {
    try {
      await mutateAsync(id);

      queryClient.invalidateQueries({ queryKey: ['categories'] });
      toast.success('Category deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
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
        description="Do you want to delete category?"
        buttonText="Delete"
      />
    </>
  );
}
