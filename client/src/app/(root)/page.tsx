'use client';

import { Loading } from '@/components/core/loading';
import { ProductCard } from '@/components/core/product-card';
import { useGetProducts } from '@/hooks/queries';
import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

export default function HomePage() {
  const [limit, setLimit] = useState(10);
  const { data, isLoading } = useGetProducts(limit);
  console.log(data);
  const products = data?.data as Product[];

  const scrollRef = useRef<number>(0);
  useEffect(() => {
    window.scrollTo(0, scrollRef.current);
  }, [data]);

  const handleNext = () => {
    scrollRef.current = window.scrollY;
    setLimit(prev => prev + 10);
  };
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 w-full h-full">
      <section>
        {!isLoading ? (
          <InfiniteScroll
            dataLength={data?.meta}
            hasMore={data?.meta?.total > limit}
            next={handleNext}
            loader={<h4>Loading...</h4>}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 h-full w-full"
          >
            {products?.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </InfiniteScroll>
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
}
