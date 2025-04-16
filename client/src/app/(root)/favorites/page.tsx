'use client';

import { Loading } from '@/components/core/loading';
import { ProductCard } from '@/components/core/product-card';
import { useGetMyFavorites } from '@/hooks/queries';
import { useAuthStore } from '@/stores/auth-store';

export default function FavoritesPage() {
  const user = useAuthStore(state => state.user);
  const { data: favorites, isLoading } = useGetMyFavorites(user?._id as string);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 w-full h-full flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">My Favorites</h1>

      <section
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
       gap-4 md:gap-5 w-full pb-5"
      >
        {!isLoading ? (
          favorites?.favorites?.map((favorite: Product) => (
            <ProductCard
              key={favorite._id}
              productId={favorite._id}
              name={favorite?.name}
              description={favorite?.description}
              price={favorite?.price}
              image_url={favorite?.image_url}
              isFavorite={true}
              userId={user?._id as string}
            />
          ))
        ) : (
          <Loading />
        )}
      </section>
      {favorites?.favorites?.length === 0 && (
        <p className="text-center text-gray-500 text-lg mx-auto">
          You don&apos;t have any favorites yet!
        </p>
      )}
    </main>
  );
}
