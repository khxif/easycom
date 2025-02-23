'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetMyCart } from '@/hooks/queries';
import { useAuthStore } from '@/stores/auth-store';
import Image from 'next/image';

export default function CartPage() {
  const user = useAuthStore(state => state.user);
  const { data } = useGetMyCart(user?._id);
  console.log(data?.cart);

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 w-full h-full flex flex-col space-y-6">
      <h1 className="text-2xl font-semibold">My Cart</h1>

      <section className="flex items-center space-x-5">
        <Card className="flex-[2]">
          <CardContent className="p-4 divide-y-2 flex flex-col space-y-4">
            {data?.cart?.map(({ quantity, ...product }: Product & { quantity: number }) => (
              <div className="flex justify-between py-2" key={product._id}>
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
                  <Button size="sm">Remove</Button>
                </div>
              </div>
            ))}
            {data?.cart?.length === 0 && (
              <p className="text-center text-gray-500 text-lg mx-auto">
                You don&apos;t have any favorites yet!
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="flex-[1] h-full">
          <CardContent className="p-4 flex flex-col space-y-6">
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
                }).format(
                  data?.cart?.reduce((acc, { price, quantity }) => acc + price * quantity, 0) || 0
                )}
              </p>
            </div>
            <Button className="mt-auto">
              Buy now
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
