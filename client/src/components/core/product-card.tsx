'use client';

import { useAddFavoritesMutation, useRemoveFavoritesMutation } from '@/hooks/mutations';
import { useGetMyFavorites } from '@/hooks/queries';
import { useAuthStore } from '@/stores/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import { ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import Heart from 'react-heart';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter } from '../ui/card';

export function ProductCard({ product }: { product: Product }) {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);

  const { data: favorites } = useGetMyFavorites(user?._id as string);
  const isFavorite = favorites?.favorites?.map((fav: Product) => fav._id).includes(product._id);

  const { mutateAsync: addFavoriteMutation } = useAddFavoritesMutation();
  const { mutateAsync: removeFavoriteMutation } = useRemoveFavoritesMutation();

  const addFavorites = async () => {
    try {
      await addFavoriteMutation({ userId: user?._id as string, productId: product._id });

      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.log('Add Favorites error:', (error as Error).message);
      toast.error('Failed to add to favorites');
    }
  };

  const removeFavorites = async () => {
    try {
      await removeFavoriteMutation({ userId: user?._id as string, productId: product._id });

      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.log('Remove Favorites error:', (error as Error).message);
      toast.error('Failed to remove from favorites');
    }
  };
  return (
    <Card>
      <CardContent className="p-4 flex flex-col space-y-4">
        <Image
          width={140}
          height={140}
          src={product?.image_url}
          alt={product?.name}
          className="aspect-square size-48 w-full object-cover rounded-t-lg"
          loading="lazy"
        />

        <div className="flex flex-col space-y-0.5">
          <span className="flex items-center justify-between">
            <h4 className="text-lg font-medium">{product?.name}</h4>
            <Heart
              isActive={isFavorite}
              onClick={isFavorite ? removeFavorites : addFavorites}
              className="size-5"
              inactiveColor="rgba(255,125,125,.75)"
              animationTrigger="both"
              animationDuration={0.1}
            />
          </span>
          <p className="truncate text-muted-foreground">{product?.description}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between items-center mt-2">
        <p className="font-medium">
          {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
            product?.price,
          )}
        </p>

        <Button className="flex space-x-2" size="sm">
          Add to
          <ShoppingCartIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
