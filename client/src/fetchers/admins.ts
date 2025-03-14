import { apiClient } from '@/lib/api-client';
import { AdminSchemaType } from '@/zod-schemas/admin';

export const getAdmins = async () => {
  const { data } = await apiClient.get('/admins');

  return data;
};

export const createAdmin = async (admin: AdminSchemaType) => {
  const data = await apiClient.post('/admins', admin);

  return data;
};

export const getAdminById = async (id: string) => {
  const { data } = await apiClient.get(`/admins/${id}`);

  return data;
};

export const updateAdmin = async (options: { id: string; admin: AdminSchemaType }) => {
  const data = await apiClient.put(`/admins/${options?.id}`, options?.admin);

  return data;
};

export const deleteAdmin = async (id: string) => {
  const data = await apiClient.delete(`/admins/${id}`);

  return data;
};