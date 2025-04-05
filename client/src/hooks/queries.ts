import * as AdminFetchers from '@/fetchers/admins';
import * as CartFetchers from '@/fetchers/cart';
import * as FavoriteFetchers from '@/fetchers/favorite';
import * as OrderFetchers from '@/fetchers/orders';
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
  });
}

export function useGetMyProducts(query: Partial<FilterQueryType>) {
  return useQuery({
    queryKey: ['products', { query }],
    queryFn: () => ProductFetchers.getMyProducts(query),
  });
}

export const getProductById = (id: string) => {
  return queryOptions({
    queryKey: ['product', id],
    queryFn: () => ProductFetchers.getProductById(id),
    enabled: Boolean(id),
  });
};

export const useGetProductById = (id: string) => {
  return useQuery(getProductById(id));
};

export const getProductSales = (id: string) => {
  return queryOptions({
    queryKey: ['product', id, 'orders'],
    queryFn: () => ProductFetchers.getProductSales(id),
  });
};

export const useGetProductSales = (id: string) => {
  return useQuery(getProductSales(id));
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

export const useGetAllOrders = () => {
  return useQuery({
    queryKey: ['orders'],
    queryFn: () => OrderFetchers.getAllOrders(),
  });
};
