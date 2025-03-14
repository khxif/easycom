'use client';

import { Loading } from '@/components/core/loading';
import { ConfirmModal } from '@/components/dashboard/confirm-modal';
import { ProductsTable } from '@/components/dashboard/tables/product-table';
import { Button } from '@/components/ui/button';
import { useDeleteProductMutation } from '@/hooks/mutations';
import { useGetMyProducts } from '@/hooks/queries';
import { useQueryClient } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChartColumnStackedIcon,
  CircleDollarSignIcon,
  LayersIcon,
  PencilIcon,
  PlusCircleIcon,
  TrashIcon,
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

export default function ProductsPage() {
  const { data, isLoading } = useGetMyProducts();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Products list</h1>
        <Link href="/admin/products/create">
          <Button className="flex items-center space-x-1">
            <PlusCircleIcon className="size-8" />
            <p>Products</p>
          </Button>
        </Link>
      </div>
      {!isLoading ? (
        <ProductsTable columns={columns} data={data?.data} isLoading={isLoading} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

const columns: ColumnDef<Product>[] = [
  {
    cell: row => {
      return (
        <div className="size-14">
          <img
            src={row.getValue() as string}
            alt="product-image"
            className="rounded-full  size-12 object-fill"
          />
        </div>
      );
    },
    header: 'Product Image',
    accessorKey: 'image_url',
  },
  {
    accessorKey: 'name',
    header: () => (
      <span>
        <p>
          Product Name <span className="text-primary">*</span>
        </p>
      </span>
    ),
  },
  {
    accessorKey: 'category',
    header: () => (
      <div className="flex items-center space-x-1 py-4">
        <ChartColumnStackedIcon className="size-5" />
        <p>Category</p>
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: () => (
      <span className="flex items-center space-x-1 py-4">
        <CircleDollarSignIcon className="size-5" />
        <p>Price</p>
      </span>
    ),
  },
  {
    accessorKey: 'stock',
    header: () => (
      <span className="flex items-center space-x-1">
        <LayersIcon className="size-5" />
        <p>Stock</p>
      </span>
    ),
  },
  {
    accessorKey: '_id',
    header: '',
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Link href={`/admin/products/${row.original._id}/edit`}>
            <Button size="sm" variant="ghost" color="primary">
              <PencilIcon className="size-6" />
            </Button>
          </Link>
          <DeleteProduct id={row.original._id} />
        </div>
      );
    },
  },
];

function DeleteProduct({ id }: { id: string }) {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { mutateAsync } = useDeleteProductMutation();

  const handleDelete = async () => {
    try {
      const data = await mutateAsync(id);
      if (data.status !== 200) return toast.error('Failed to delete product');

      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product deleted successfully');
      setIsModalOpen(false);
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
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
        description="Do you want to delete the product?"
        buttonText="Delete"
      />
    </>
  );
}
