import { apiClient } from '@/lib/api-client';

export const getOverview = async () => {
  const { data } = await apiClient.get('/overview');

  return data;
};
