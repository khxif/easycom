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
