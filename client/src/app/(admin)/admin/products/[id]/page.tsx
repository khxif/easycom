'use client';

import { Loading } from '@/components/core/loading';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { useGetProductById, useGetProductSales } from '@/hooks/queries';
import { ArrowLeftIcon, UsersIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { use } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

export default function ProductDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: product, isLoading } = useGetProductById(id);
  console.log(product);
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      {!isLoading && product ? (
        <>
          <div className="flex flex-col space-y-5">
            <Link href="/admin/products" className="flex items-center space-x-2 text-sm">
              <ArrowLeftIcon size={16} />
              <p>Back</p>
            </Link>
            <div className="flex items-center space-x-3">
              <Image
                src={product?.image_url ?? ''}
                alt={product?.name ?? ''}
                width={300}
                height={300}
                className="size-20 rounded-full object-cover"
              />
              <h1 className="text-2xl font-semibold md:text-3xl">{product?.name}</h1>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Card>
                <CardContent className="py-5 flex items-center space-x-5">
                  <UsersIcon />
                  <div className="flex flex-col space-y-1.5">
                    <h2 className="font-semibold text-xl">Created By</h2>
                    <p className="font-medium text-lg">{product?.created_by?.name}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="py-5 flex items-center space-x-5">
                  <UsersIcon />
                  <div className="flex flex-col space-y-1.5">
                    <h2 className="font-semibold text-xl">Current Stock</h2>
                    <p className="font-medium text-lg">{product?.stock}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          <SalesGraph id={id} />
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

function SalesGraph({ id }: { id: string }) {
  const { data, isLoading } = useGetProductSales(id);
  console.log(data);
  return !isLoading && data ? (
    <Card>
      <CardHeader>
        <CardTitle>Sales</CardTitle>
        <CardDescription>Number of orders placed</CardDescription>
      </CardHeader>
      <CardContent className="h-96">
        <ResponsiveContainer>
          <ChartContainer config={chartConfig}>
            <AreaChart
              accessibilityLayer
              data={data?.data ?? []}
              margin={{
                left: 12,
                right: 12,
                bottom: 0,
                top: 20,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="month"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={value => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <defs>
                <linearGradient id="fillSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--color-sales)" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="var(--color-sales)" stopOpacity={0.1} />
                </linearGradient>
              </defs>

              <Area
                dataKey="sales"
                type="natural"
                fill="url(#fillSales)"
                fillOpacity={0.4}
                stroke="var(--color-sales)"
                stackId="a"
              />
            </AreaChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  ) : (
    <Loading />
  );
}

const chartConfig = {
  sales: {
    label: 'Sales',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;
