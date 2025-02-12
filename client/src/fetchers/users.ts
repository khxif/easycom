import { apiClient } from '@/lib/api-client';

export const getUsers = async () => {
  const { data } = await apiClient.get('/users');

  return data;
};

export const getUserById = async (id: string) => {
  const { data } = await apiClient.get(`/users/${id}`);

  return data;
};
