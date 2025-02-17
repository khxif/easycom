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

export async function getProductById(id?: string) {
  const { data } = await apiClient.get(`/products/${id}`);
  return data;
}

export async function updateProduct(options: { product: ProductSchemaType; id?: string }) {
  const data = await apiClient.put(`/products/${options?.id}`, options?.product);

  return data;
}

export async function deleteProduct(id?: string) {
  const data = await apiClient.delete(`/products/${id}`);
  return data;
}
