'use client';

import { OrdersTable } from '@/components/dashboard/tables/orders-table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge, BadgeVariants } from '@/components/ui/badge';
import { useGetAllOrders } from '@/hooks/queries';
import { useExtractSearchParams } from '@/hooks/use-extract-search-params';
import { ColumnDef } from '@tanstack/react-table';
import {
  ChartNoAxesColumnIncreasingIcon,
  CircleCheckIcon,
  CircleDollarSignIcon,
  CircleXIcon,
  Clock10Icon,
} from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const { searchParams } = useExtractSearchParams();
  const { data, isLoading } = useGetAllOrders(searchParams);
  console.log(data?.data)

  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Orders</h1>
      </div>

      <OrdersTable columns={columns} data={data?.data} isLoading={isLoading} meta={data?.meta} />
    </main>
  );
}

const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'user',
    header: 'Name',
    cell: ({ row }) => (
      <div className="flex items-center space-x-4 p-2">
        <Avatar>
          <AvatarImage src={row.original.user.profile_picture ?? ''} />
          <AvatarFallback>{row.original.user?.name.split(' ').join('')[0]}</AvatarFallback>
        </Avatar>

        <Link href={`/admin/admins/${row.original._id}`}>
          <span className="flex flex-col space-y-2">
            <h2 className="font-medium">{row.original.user?.name}</h2>
          </span>
        </Link>
      </div>
    ),
  },
  {
    header: () => (
      <span className="flex items-center space-x-1.5">
        <CircleDollarSignIcon className="size-5" />
        <p>Amount</p>
      </span>
    ),
    accessorKey: 'amount',
  },
  {
    accessorKey: 'status',
    header: () => (
      <span className="flex items-center space-x-1.5">
        <ChartNoAxesColumnIncreasingIcon className="size-5" />
        <p>Status</p>
      </span>
    ),
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
        failed: {
          icon: CircleXIcon,
          label: 'Failed',
          variant: 'failed',
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
    cell: ({ row }) => (
      <div className="flex flex-col space-y-4">
        {row.original.products?.map((product: { product: Product }, index: number) => (
          <p key={product?.product?._id ?? index}>{product?.product?.name ?? 'Deleted Product'}</p>
        ))}
      </div>
    ),
  },
  {
    accessorKey: 'created_at',
    header: 'Order Placed',
    cell: ({ row }) => <p>{new Date(row.original.createdAt).toLocaleString()}</p>,
  },
];
