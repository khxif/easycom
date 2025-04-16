'use client';

import { Loading } from '@/components/core/loading';
import { SummaryCard } from '@/components/core/summary-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { useGetOverview } from '@/hooks/queries';
import { HandshakeIcon, ShoppingBagIcon, Users as UsersIcon } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';

export default function OverviewPage() {
  const { data: overview, isLoading } = useGetOverview();

  return (
    <main className="p-5 flex flex-col space-y-10 pb-40">
      {!isLoading ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold md:text-3xl">Overview</h1>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <SummaryCard
              title="Total Products"
              count={overview?.total_products ?? 0}
              icon={ShoppingBagIcon}
            />
            <SummaryCard
              title="Total Customers"
              count={overview?.total_users ?? 0}
              icon={UsersIcon}
            />
            <SummaryCard
              title="Total Sellers"
              count={overview?.total_sellers ?? 0}
              icon={HandshakeIcon}
            />
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
