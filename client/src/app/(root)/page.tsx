'use client';

import { Loading } from '@/components/core/loading';
import { ProductCard } from '@/components/core/product-card';
import { useGetMyFavorites, useGetProducts } from '@/hooks/queries';
import { useExtractSearchParams } from '@/hooks/use-extract-search-params';
import { useAuthStore } from '@/stores/auth-store';
import { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
  const [limit, setLimit] = useState(10);
  const user = useAuthStore(state => state.user);
  const { searchParams } = useExtractSearchParams();

  const { data, isLoading } = useGetProducts({ ...searchParams, limit });
  const { data: favorites } = useGetMyFavorites(user?._id as string);
  const products = data?.data as Product[];

  return (
    <main className="max-w-7xl mx-auto py-4 px-4 w-full h-full">
      <section>
        {!isLoading ? (
          <InfiniteScroll
            dataLength={data?.meta}
            hasMore={data?.meta?.total > limit}
            next={() => setLimit(prev => prev + 10)}
            loader={<h4>Loading...</h4>}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 h-full w-full pb-5"
          >
            {products?.map(product => (
              <ProductCard
                key={product._id}
                productId={product._id}
                name={product?.name}
                description={product?.description}
                price={product?.price}
                image_url={product?.image_url}
                isFavorite={favorites?.favorites
                  ?.map((fav: Product) => fav._id)
                  .includes(product._id)}
                userId={user?._id as string}
              />
            ))}
          </InfiniteScroll>
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
}
