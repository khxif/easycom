import { apiClient } from '@/lib/api-client';
import { ProfileSchemaType } from '@/zod-schemas/profile';

export const getProfile = async () => {
  const { data } = await apiClient.get('/profile');
  return data;
};

export const updateProfile = async (body: ProfileSchemaType) => {
  const data = await apiClient.put('/profile', body);
  return data;
};
