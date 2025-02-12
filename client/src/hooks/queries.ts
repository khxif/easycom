import * as AdminFetchers from '@/fetchers/admins';
import * as FavoriteFetchers from '@/fetchers/favorite';
import * as OverviewFetchers from '@/fetchers/overview';
import * as ProductFetchers from '@/fetchers/products';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function useGetProducts(limit?: number) {
  return useQuery({
    queryKey: ['products', limit],
    queryFn: () => ProductFetchers.getProducts(limit),
    staleTime: 5000,
    gcTime: Infinity,
    placeholderData: prev => prev || { data: [], meta: { total: 0 } },
  });
}

export const getProductById = (id: string) => {
  return queryOptions({
    queryKey: ['product', id],
    queryFn: () => ProductFetchers.getProductById(id),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery(getProductById(id));
};

export function useGetAdmins() {
  return useQuery({
    queryKey: ['admins'],
    queryFn: AdminFetchers.getAdmins,
  });
}

export const getAdminById = (id: string) => {
  return queryOptions({
    queryKey: ['admins', id],
    queryFn: () => AdminFetchers.getAdminById(id),
  });
};

export const useGetAdminById = (id: string) => {
  return useQuery(getAdminById(id));
};

export function useGetOverview() {
  return useQuery({
    queryKey: ['overview'],
    queryFn: OverviewFetchers.getOverview,
  });
}

export const useGetMyFavorites = (id: string) => {
  return useQuery({
    queryKey: ['favorites', id],
    queryFn: () => FavoriteFetchers.getMyFavorites(id),
    enabled: !!id,
  });
};
