import { apiClient } from '@/lib/api-client';
import { ProductSchemaType } from '@/zod-schemas/products';

export async function getProducts() {
  const { data } = await apiClient.get('/products');
  return data;
}

export async function createProduct(product: ProductSchemaType) {
  const data = await apiClient.post('/products', product);

  return data;
}
