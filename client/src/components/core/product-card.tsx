'use client';

import { useAddFavoritesMutation, useRemoveFavoritesMutation } from '@/hooks/mutations';
import { useQueryClient } from '@tanstack/react-query';
import { ArrowRightIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Heart from 'react-heart';
import { toast } from 'sonner';
import { Card, CardContent, CardFooter } from '../ui/card';

interface ProductCardProps {
  productId: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  isFavorite: boolean;
  userId: string;
}

export function ProductCard({
  name,
  description,
  price,
  image_url,
  isFavorite,
  productId,
  userId,
}: ProductCardProps) {
  const queryClient = useQueryClient();

  const { mutateAsync: addFavoriteMutation } = useAddFavoritesMutation();
  const { mutateAsync: removeFavoriteMutation } = useRemoveFavoritesMutation();

  const addFavorites = async () => {
    try {
      await addFavoriteMutation({ userId, productId });

      queryClient.invalidateQueries({ queryKey: ['favorites'] });
    } catch (error) {
      console.log('Add Favorites error:', (error as Error).message);
      toast.error('Failed to add to favorites');
    }
  };

  const removeFavorites = async () => {
    try {
      await removeFavoriteMutation({ userId, productId });

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
          src={image_url}
          alt={name}
          className="aspect-square size-48 w-full object-contain rounded-t-lg"
          loading="lazy"
          blurDataURL="/assets/product-placeholder.png"
          placeholder="blur"
        />

        <span className="flex items-center justify-between">
          <Link href={`/product/${productId}`}>
            <h4 className="text-lg font-medium">{name}</h4>
          </Link>
          <Heart
            isActive={isFavorite}
            onClick={isFavorite ? removeFavorites : addFavorites}
            className="size-5"
            inactiveColor="rgba(255,125,125,.75)"
            animationTrigger="both"
            animationDuration={0.1}
          />
        </span>
        <p className="truncate text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter>
        <Link
          href={`/product/${productId}`}
          className="flex justify-between items-center mt-2 w-full"
        >
          <p className="font-medium">
            {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(price)}
          </p>

          <ArrowRightIcon className="size-5" />
        </Link>
      </CardFooter>
    </Card>
  );
}
