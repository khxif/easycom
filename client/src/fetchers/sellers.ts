import { apiClient } from '@/lib/api-client';
import { AdminSchemaType } from '@/zod-schemas/admin';

export const getSellers = async () => {
  const { data } = await apiClient.get('/sellers');

  return data;
};

export const createSeller = async (admin: AdminSchemaType) => {
  const data = await apiClient.post('/sellers', admin);

  return data;
};

export const getSellerById = async (id: string) => {
  const { data } = await apiClient.get(`/sellers/${id}`);

  return data;
};

export const updateSeller = async (options: { id: string; admin: AdminSchemaType }) => {
  const data = await apiClient.put(`/sellers/${options?.id}`, options?.admin);

  return data;
};

export const deleteSeller = async (id: string) => {
  const data = await apiClient.delete(`/sellers/${id}`);

  return data;
};