'use client';

import { ProductCard } from '@/components/core/product-card';
import { useGetProducts } from '@/hooks/queries';

export default function HomePage() {
  const { data } = useGetProducts();
  const products = data?.data as Product[];
  console.log(products);
  return (
    <main className='max-w-7xl mx-auto py-6 px-4'>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5">
        {products?.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </section>
    </main>
  );
}
