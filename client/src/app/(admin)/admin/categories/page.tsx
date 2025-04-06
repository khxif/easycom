'use client';

import { Loading } from '@/components/core/loading';
import { CategoriesTable } from '@/components/dashboard/tables/categories/categories-table';
import { Button } from '@/components/ui/button';
import { useGetCategories } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import { PencilIcon, PlusCircleIcon } from 'lucide-react';
import Link from 'next/link';

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

const columns: ColumnDef<Department>[] = [
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
          {/* <DeleteAdmin id={row.original._id} /> */}
        </div>
      );
    },
  },
];
