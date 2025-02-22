import * as AdminFetchers from '@/fetchers/admins';
import * as AuthFetchers from '@/fetchers/auth';
import * as FavoriteFetchers from '@/fetchers/favorite';
import * as CartFetchers from '@/fetchers/cart';
import * as ProductFetchers from '@/fetchers/products';
import * as ProfileFetchers from '@/fetchers/profile';
import { useMutation } from '@tanstack/react-query';

export const useLoginMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.login });
};

export const useSignupMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.signup });
};

export const useCreateProductMutation = () => {
  return useMutation({ mutationFn: ProductFetchers.createProduct });
};

export const useUpdateProductMutation = () => {
  return useMutation({ mutationFn: ProductFetchers.updateProduct });
};

export const useDeleteProductMutation = () => {
  return useMutation({ mutationFn: ProductFetchers.deleteProduct });
};

export const useCreateAdminMutation = () => {
  return useMutation({ mutationFn: AdminFetchers.createAdmin });
};

export const useUpdateAdminMutation = () => {
  return useMutation({ mutationFn: AdminFetchers.updateAdmin });
};

export const useAddFavoritesMutation = () => {
  return useMutation({ mutationFn: FavoriteFetchers.addFavorites });
};

export const useRemoveFavoritesMutation = () => {
  return useMutation({ mutationFn: FavoriteFetchers.removeFavorites });
};

export const useUpdateProfileMutation = () => {
  return useMutation({ mutationFn: ProfileFetchers.updateProfile });
};

export const useAddToCartMutation = () => {
  return useMutation({ mutationFn: CartFetchers.addToCart });
}
