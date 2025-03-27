'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useGetOverview } from '@/hooks/queries';
import { Users as UsersIcon } from 'lucide-react';
import CountUp from 'react-countup';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';
import { Loading } from '@/components/core/loading';

export default function OverviewPage() {
  const { data: overview, isLoading } = useGetOverview();
  console.log(overview);
  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      {!isLoading ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold md:text-3xl">Overview</h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="py-5 flex items-center space-x-5">
                <UsersIcon />
                <div className="flex flex-col space-y-1.5">
                  <h2 className="font-semibold text-xl">Total Products</h2>
                  <p className="font-medium text-lg">
                    <CountUp end={overview?.total_products ?? 0} duration={2} />
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-5 flex items-center space-x-5">
                <UsersIcon />
                <div className="flex flex-col space-y-1.5">
                  <h2 className="font-semibold text-xl">Total Users</h2>
                  <p className="font-medium text-lg">
                    <CountUp end={overview?.total_users ?? 0} duration={2} />
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="py-5 flex items-center space-x-5">
                <UsersIcon />
                <div className="flex flex-col space-y-1.5">
                  <h2 className="font-semibold text-xl">Total Admins</h2>
                  <p className="font-medium text-lg">
                    <CountUp end={overview?.total_admins ?? 0} duration={2} />
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

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
                    data={overview?.orders_by_month ?? []}
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
                      <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0.1} />
                      </linearGradient>
                    </defs>

                    <Area
                      dataKey="orders"
                      type="natural"
                      fill="url(#fillOrders)"
                      fillOpacity={0.4}
                      stroke="var(--color-orders)"
                      stackId="a"
                    />
                  </AreaChart>
                </ChartContainer>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </>
      ) : (
        <Loading />
      )}
    </main>
  );
}

const chartConfig = {
  orders: {
    label: 'Orders',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;
