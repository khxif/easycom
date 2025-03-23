import { apiClient } from '@/lib/api-client';

export const getAllOrders = async () => {
  const { data } = await apiClient.get('/orders');

  return data;
};

export const createOrder = async (body: { amount: number; user_id: User['_id'] }) => {
  const data = await apiClient.post('/orders/create', body);

  return data;
};

export const verifyOrder = async (body: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  user_id: User['_id'];
}) => {
  const data = await apiClient.post('/orders/verify', body);
  console.log(data);
  return data;
};
