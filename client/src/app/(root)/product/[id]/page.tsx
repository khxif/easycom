'use client';

import { Loading } from '@/components/core/loading';
import { Button } from '@/components/ui/button';
import { useAddToCartMutation } from '@/hooks/mutations';
import { useGetProductById } from '@/hooks/queries';
import { useAuthStore } from '@/stores/auth-store';
import { MinusIcon, PlusIcon, ShoppingCartIcon } from 'lucide-react';
import Image from 'next/image';
import { use, useState } from 'react';
import { toast } from 'sonner';

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [quantity, setQuantity] = useState(1);
  const user = useAuthStore(state => state.user);

  const { id } = use(params);
  const { data: product, isLoading } = useGetProductById(id);
  console.log(product);

  const { mutateAsync } = useAddToCartMutation();

  const handleAddToCart = async () => {
    try {
      const res = await mutateAsync({ userId: user?._id as string, productId: id, quantity });
      console.log(res)
      if (res.statusText !== 'OK') return toast.error('Failed to add to cart');
      toast.success('Added to cart');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="max-w-7xl mx-auto py-5 px-4 md:px-0 pb-40">
      {!isLoading ? (
        <section className="flex md:space-x-6 flex-col md:flex-row space-y-5 md:space-y-0">
          <div className="flex-1">
            <Image
              src={product?.image_url}
              alt={product?.name}
              width={1500}
              height={500}
              className="w-full object-fill h-96"
            />
          </div>

          <div className="flex-1 flex flex-col space-y-5">
            <h1 className="text-lg font-medium">{product?.name}</h1>
            <p className="text-muted-foreground">{product?.description}</p>

            <span className="flex w-full items-center space-x-8">
              <h1 className="text-base font-normal">Quantity</h1>
              <span className="flex w-full items-center justify-between border-b-2 border-primary py-2 ">
                <button
                  className="disabled:text-muted"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity === 1}
                >
                  <MinusIcon className="h-6 w-6 cursor-pointer " />
                </button>
                <p className="text-sm font-bold">{quantity}</p>
                <button
                  className="disabled:text-muted"
                  onClick={() => setQuantity(quantity + 1)}
                  disabled={quantity === product?.stock}
                >
                  <PlusIcon className="h-6 w-6 cursor-pointer" />
                </button>
              </span>
            </span>

            <h1 className="text-xl font-medium py-2">
              {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(
                product?.price * quantity,
              )}
            </h1>

            <span>
              <Button className="flex space-x-2 w-full" size="lg" onClick={handleAddToCart}>
                Add to
                <ShoppingCartIcon className="size-6" />
              </Button>
            </span>
          </div>
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
}
