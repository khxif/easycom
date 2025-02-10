import { apiClient } from '@/lib/api-client';

export const addFavorites = async (body: { userId: string; productId: string }) => {
  const data = await apiClient.post('/favorites/add', body);
  console.log(data.data);

  return data.data;
};

export const getMyFavorites = async (id: string) => {
  const data = await apiClient.get(`/favorites/${id}`);
  console.log(data.data);

  return data.data;
};

export const removeFavorites = async (body: { userId: string; productId: string }) => {
  const data = await apiClient.delete('/favorites/remove', { data: body });
  console.log(data.data);

  return data.data;
};
