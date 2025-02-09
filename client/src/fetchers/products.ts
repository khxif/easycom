import { apiClient } from '@/lib/api-client';
import { ProductSchemaType } from '@/zod-schemas/products';

export async function getProducts(limit?: number) {
  const { data } = await apiClient.get(`/products?limit=${limit}`);
  return data;
}

export async function createProduct(product: ProductSchemaType) {
  const data = await apiClient.post('/products', product);

  return data;
}
