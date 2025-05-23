import * as AdminFetchers from '@/fetchers/admins';
import * as AuthFetchers from '@/fetchers/auth';
import * as CartFetchers from '@/fetchers/cart';
import * as CategoriesFetchers from '@/fetchers/categories';
import * as FavoriteFetchers from '@/fetchers/favorite';
import * as OrderFetchers from '@/fetchers/orders';
import * as ProductFetchers from '@/fetchers/products';
import * as ProfileFetchers from '@/fetchers/profile';
import * as SellerFetchers from '@/fetchers/sellers';
import * as UserFetchers from '@/fetchers/users';
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

export const useDeleteAdminMutation = () => {
  return useMutation({ mutationFn: AdminFetchers.deleteAdmin });
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
};

export const useRemoveFromCartMutation = () => {
  return useMutation({ mutationFn: CartFetchers.removeFromCart });
};

export const useCreateOrderMutation = () => {
  return useMutation({ mutationFn: OrderFetchers.createOrder });
};

export const useVerifyOrderMutation = () => {
  return useMutation({ mutationFn: OrderFetchers.verifyOrder });
};

export const useDeleteUserMutation = () => {
  return useMutation({ mutationFn: UserFetchers.deleteUser });
};

export const useCreateSellerMutation = () => {
  return useMutation({ mutationFn: SellerFetchers.createSeller });
};

export const useUpdateSellerMutation = () => {
  return useMutation({ mutationFn: SellerFetchers.updateSeller });
};

export const useDeleteSellerMutation = () => {
  return useMutation({ mutationFn: SellerFetchers.deleteSeller });
};

export const useCreateCategoryMutation = () => {
  return useMutation({ mutationFn: CategoriesFetchers.createCategories });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({ mutationFn: CategoriesFetchers.updateCategories });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({ mutationFn: CategoriesFetchers.deleteCategories });
};
