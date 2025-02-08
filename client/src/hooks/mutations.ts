import { useMutation } from '@tanstack/react-query';
import * as AdminFetchers from '../fetchers/admins';
import * as AuthFetchers from '../fetchers/auth';
import * as ProductFetchers from '../fetchers/products';

export const useLoginMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.login });
};

export const useSignupMutation = () => {
  return useMutation({ mutationFn: AuthFetchers.signup });
};

export const useCreateProductMutation = () => {
  return useMutation({ mutationFn: ProductFetchers.createProduct });
};

export const useCreateAdminMutation = () => {
  return useMutation({ mutationFn: AdminFetchers.createAdmin });
};
