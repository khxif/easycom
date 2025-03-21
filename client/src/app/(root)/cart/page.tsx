'use client';

import { PaymentButton } from '@/components/core/payment-button';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useRemoveFromCartMutation } from '@/hooks/mutations';
import { useGetMyCart } from '@/hooks/queries';
import { useAuthStore } from '@/stores/auth-store';
import { useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { toast } from 'sonner';

export default function CartPage() {
  const queryClient = useQueryClient();
  const user = useAuthStore(state => state.user);
  const { data } = useGetMyCart(user?._id);
  console.log(data?.cart);

  const totalAmount =
    data?.cart &&
    data?.cart?.reduce(
      (acc: number, { quantity, ...product }: Product & { quantity: number }) =>
        acc + product.price * quantity,
      0,
    );

  const { mutateAsync } = useRemoveFromCartMutation();
  const handleRemoveFromCart = async (productId: string) => {
    try {
      const res = await mutateAsync({ userId: user?._id as string, productId });
      if (res.status !== 200) return toast.error('Failed to remove from cart');

      queryClient.invalidateQueries({ queryKey: ['cart', user?._id] });
      toast.success('Removed from cart');
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="max-w-7xl mx-auto py-6 px-4 w-full h-full flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">My Cart</h1>

      <section className="flex flex-col items-center gap-5 md:flex-row w-full">
        <Card className="flex-[2] w-full">
          <CardContent className="p-4 divide-y-2 flex flex-col space-y-4">
            {data?.cart?.map(({ quantity, ...product }: Product & { quantity: number }) => (
              <div
                className="flex flex-col md:flex-row justify-between py-2 gap-y-2 md:gap-y-0"
                key={product._id}
              >
                <div className="flex items-center space-x-4">
                  <Image src={product?.image_url} alt={product?.name} width={150} height={200} />
                  <div className="flex flex-col space-y-4 py-2">
                    <p className="font-medium text-lg">{product?.name}</p>
                    <Select>
                      <SelectTrigger className="max-w-fit">
                        <SelectValue placeholder={`Quantity: ${quantity}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex flex-col justify-center space-y-4">
                  <p className="font-medium text-lg">
                    {new Intl.NumberFormat('en-IN', {
                      style: 'currency',
                      currency: 'INR',
                    }).format(product?.price)}
                  </p>
                  <Button size="sm" onClick={() => handleRemoveFromCart(product?._id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
            {data?.cart?.length === 0 && (
              <p className="text-center text-gray-500 text-lg mx-auto">Add items to cart!</p>
            )}
          </CardContent>
        </Card>

        <Card className="md:flex-[1] h-full w-full">
          <CardContent className="p-4 flex flex-col justify-between h-full space-y-4">
            <div className='flex flex-col space-y-6'>
              <h5 className="font-medium text-lg">Cart Summary</h5>
              <div className="flex justify-between">
                <p className="font-medium">Total Items:</p>
                <p className="font-medium">{data?.cart?.length}</p>
              </div>
              <div className="flex justify-between">
                <p className="font-medium">Total Amount:</p>
                <p className="font-medium">
                  {new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                  }).format(totalAmount)}
                </p>
              </div>
            </div>
            <PaymentButton amount={totalAmount ?? 0} />
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
