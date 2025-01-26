import * as ProductFetchers from "@/fetchers/products";
import { useQuery } from "@tanstack/react-query";

export function useGetProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: ProductFetchers.getProducts,
  });
}
