'use client';

import { Card, CardContent } from '@/components/ui/card';
import { useGetOverview } from '@/hooks/queries';
import { Users as UsersIcon } from 'lucide-react';

export default function OverviewPage() {
  const { data: overview } = useGetOverview();
  console.log(overview);
  return (
    <main className="p-5 flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Overview</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="py-5 flex items-center space-x-5">
            <UsersIcon />
            <div className="flex flex-col space-y-1.5">
              <h2 className="font-semibold text-xl">Total Products</h2>
              <p className="font-medium text-lg">{overview?.total_products}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-5 flex items-center space-x-5">
            <UsersIcon />
            <div className="flex flex-col space-y-1.5">
              <h2 className="font-semibold text-xl">Total Users</h2>
              <p className="font-medium text-lg">{overview?.total_users}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="py-5 flex items-center space-x-5">
            <UsersIcon />
            <div className="flex flex-col space-y-1.5">
              <h2 className="font-semibold text-xl">Total Admins</h2>
              <p className="font-medium text-lg">{overview?.total_admins}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
