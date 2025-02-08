import * as AdminFetchers from '@/fetchers/admins';
import * as OverviewFetchers from '@/fetchers/overview';
import * as ProductFetchers from '@/fetchers/products';
import { useQuery } from '@tanstack/react-query';

export function useGetProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: ProductFetchers.getProducts,
  });
}

export function useGetAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: AdminFetchers.getAdmins,
  });
}

export function useGetOverview() {
  return useQuery({
    queryKey: ['overview'],
    queryFn: OverviewFetchers.getOverview,
  });
}
