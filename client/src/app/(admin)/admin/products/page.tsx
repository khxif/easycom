'use client';

import { Loading } from '@/components/core/loading';
import { ProductsTable } from '@/components/dashboard/tables/product-table';
import { Button } from '@/components/ui/button';
import { useGetProducts } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

export default function ProductsPage() {
  const { data, isLoading } = useGetProducts();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Products list</h1>
        <Link href="/admin/products/create">
          <Button>Add Products</Button>
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
    header: 'Product Name',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'stock',
    header: 'Stock',
  },
];
