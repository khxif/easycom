import { apiClient } from '@/lib/api-client';
import { ProductSchemaType } from '@/zod-schemas/products';
import { FilterQueryType } from '@/zod-schemas/query';
import qs from 'query-string';

export async function getProducts(query: Partial<FilterQueryType>) {
  const queryString = qs.stringify(query, { skipNull: true, skipEmptyString: true });

  const { data } = await apiClient.get(`/products?${queryString}`);
  return data;
}

export async function getMyProducts() {
  const { data } = await apiClient.get(`/products/my`);
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
