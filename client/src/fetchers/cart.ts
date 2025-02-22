import { apiClient } from '@/lib/api-client';

export const addToCart = async (body: {
  userId: User['_id'];
  productId: Product['_id'];
  quantity: number;
}) => {
  const data = await apiClient.post('/cart/add', body);
  console.log(data.data);

  return data.data;
};

export const getMyCart = async (id: User['_id']) => {
  const data = await apiClient.get(`/cart/${id}`);
  console.log(data.data);

  return data.data;
};
