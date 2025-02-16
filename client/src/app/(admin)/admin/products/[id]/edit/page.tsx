'use client';

import { Loading } from '@/components/core/loading';
import { ProductForm } from '@/components/dashboard/product-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateProductMutation } from '@/hooks/mutations';
import { useGetProductById } from '@/hooks/queries';
import { productSchema, ProductSchemaType } from '@/zod-schemas/products';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: product, isLoading, isError } = useGetProductById(id);
  console.log(product);

  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/products" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Edit Products</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Product Details</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && !isError ? <ProductFormWrapper product={product} /> : <Loading />}
        </CardContent>
      </Card>
    </main>
  );
}

function ProductFormWrapper({ product }: { product: Product }) {
  const router = useRouter();
  const { mutateAsync } = useUpdateProductMutation();

  const form = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name ?? '',
      category: product?.category ?? '',
      description: product?.description ?? '',
      image_url: product?.image_url ?? '',
      price: product?.price ? String(product?.price) : '',
      stock: product?.stock ? String(product?.stock) : '',
    },
  });

  const onSubmit = async (values: ProductSchemaType) => {
    try {
      const data = await mutateAsync({ product: values, id: product?._id });
      if (data.statusText !== 'OK') return toast.error('Failed to update product');

      toast.success('Product updated successfully');
      router.push('/admin/products');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to update product');
    }
  };
  return <ProductForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />;
}
