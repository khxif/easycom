import { apiClient } from "@/lib/api-client";

export async function getProducts() {
  const data = await apiClient.get("/products");

  return data
}
