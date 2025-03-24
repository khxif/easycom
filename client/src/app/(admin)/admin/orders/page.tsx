'use client';

import { Loading } from '@/components/core/loading';
import { OrdersTable } from '@/components/dashboard/tables/orders-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, BadgeVariants } from '@/components/ui/badge';
import { useGetAllOrders } from '@/hooks/queries';
import { ColumnDef } from '@tanstack/react-table';
import { CircleCheckIcon, Clock10Icon } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { data, isLoading } = useGetAllOrders();
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Orders</h1>
      </div>

      {!isLoading ? (
        <OrdersTable columns={columns} data={data?.data} isLoading={isLoading} />
      ) : (
        <Loading />
      )}
    </main>
  );
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'user',
    header: 'User',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4 p-2">
        <Avatar>
          <AvatarImage src={row.original.user.profile_picture} />
          <AvatarFallback>{row.original.user.name.split(' ').join('')[0]}</AvatarFallback>
        </Avatar>

        <Link href={`/admin/admins/${row.original._id}`}>
          <span className="flex flex-col space-y-2">
            <h2 className="font-medium">{row.original.user.name}</h2>
          </span>
        </Link>
      </div>
    ),
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const map = {
        success: {
          icon: CircleCheckIcon,
          label: 'Success',
          variant: 'success',
        },
        pending: {
          icon: Clock10Icon,
          label: 'Pending',
          variant: 'pending',
        },
      };
      const {
        label,
        icon: Icon,
        variant,
      } = map[row.original.status.toLowerCase() as keyof typeof map];
      return (
        <Badge variant={variant as BadgeVariants} className="flex items-center space-x-2 max-w-fit">
          <Icon className="size-4" />
          <p>{label}</p>
        </Badge>
      );
    },
  },
  {
    accessorKey: 'products',
    header: 'Products',
    cell: ({ row }) => {
      const products = row.original.products
        ?.map((product: { product: Product }) => product.product.name)
        .join(', ');
      return <p>{products}</p>;
    },
  },
];
