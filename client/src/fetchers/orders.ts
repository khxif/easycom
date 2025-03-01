import { apiClient } from '@/lib/api-client';

export const createOrder = async (amount: number) => {
  const data = await apiClient.post('/orders/create', { amount });

  return data;
};

export const verifyOrder = async (body: {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}) => {
  const data = await apiClient.post('/orders/verify', body);

  return data;
};
