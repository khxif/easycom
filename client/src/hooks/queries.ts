import * as AdminFetchers from '@/fetchers/admins';
import * as CartFetchers from '@/fetchers/cart';
import * as FavoriteFetchers from '@/fetchers/favorite';
import * as OverviewFetchers from '@/fetchers/overview';
import * as ProductFetchers from '@/fetchers/products';
import * as ProfileFetchers from '@/fetchers/profile';
import * as SellerFetchers from '@/fetchers/sellers';
import * as UsersFetchers from '@/fetchers/users';
import { FilterQueryType } from '@/zod-schemas/query';
import { queryOptions, useQuery } from '@tanstack/react-query';

export function useGetProducts(query: Partial<FilterQueryType>) {
  return useQuery({
    queryKey: ['products', { query }],
    queryFn: () => ProductFetchers.getProducts(query),
    // staleTime: 5000,
    // gcTime: Infinity,
    // placeholderData: prev => prev || { data: [], meta: { total: 0 } },
  });
}

export function useGetMyProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: ProductFetchers.getMyProducts,
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

export const useGetUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: UsersFetchers.getUsers,
  });
};

export const getUserById = (id: string) => {
  return queryOptions({
    queryKey: ['users', id],
    queryFn: () => UsersFetchers.getUserById(id),
  });
};

export const useGetUserById = (id: string) => {
  return useQuery(getUserById(id));
};

export const useGetMyProfile = () => {
  return useQuery({
    queryKey: ['profile'],
    queryFn: ProfileFetchers.getProfile,
  });
};

export const useGetMyCart = (id?: User['_id']) => {
  return useQuery({
    queryKey: ['cart', id],
    queryFn: () => CartFetchers.getMyCart(id),
  });
};

export const useGetSellers = () => {
  return useQuery({
    queryKey: ['sellers'],
    queryFn: SellerFetchers.getSellers,
  });
};

export const getSellerById = (id: string) => {
  return queryOptions({
    queryKey: ['sellers', id],
    queryFn: () => SellerFetchers.getSellerById(id),
  });
};

export const useGetSellerById = (id: string) => {
  return useQuery(getSellerById(id));
};
