'use client';

import { ProductForm } from '@/components/dashboard/product-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateProductMutation } from '@/hooks/mutations';
import { useAuthStore } from '@/stores/auth-store';
import { productSchema, ProductSchemaType } from '@/zod-schemas/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateProductPage() {
  const user = useAuthStore(state => state.user);
  const router = useRouter();
  const { mutateAsync } = useCreateProductMutation();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      category: '',
      description: '',
      image_url: '',
      price: '',
      stock: '',
      location: user?.location,
      created_by: user?._id,
    },
  });

  const onSubmit = async (values: ProductSchemaType) => {
    try {
      console.log(values);
      const data = await mutateAsync(values);
      if (data.status !== 200) return toast.error('Failed to create product');

      toast.success('Product created successfully');
      router.push('/admin/products');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create product');
    }
  };
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/products" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Add Products</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
        </CardContent>
      </Card>
    </main>
  );
}
