import * as AdminFetchers from '@/fetchers/admins';
import * as OverviewFetchers from '@/fetchers/overview';
import * as ProductFetchers from '@/fetchers/products';
import { useQuery } from '@tanstack/react-query';

export function useGetProducts(limit?: number) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => ProductFetchers.getProducts(limit),
    staleTime: 5000, // ✅ Prevents unnecessary re-fetching
    gcTime: Infinity, 
    placeholderData: prev => prev || { data: [], meta: { total: 0 } }
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
