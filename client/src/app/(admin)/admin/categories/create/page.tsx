'use client';

import { CategoriesForm } from '@/components/dashboard/categories-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateCategoryMutation } from '@/hooks/mutations';
import { categorySchema, CategorySchemaType } from '@/zod-schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateDepartmentPage() {
  const router = useRouter();
  const { mutateAsync } = useCreateCategoryMutation();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: CategorySchemaType) => {
    try {
      await mutateAsync(values);

      toast.success('Category created successfully');
      router.push('/admin/categories');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/categories" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Add Categories</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          <CategoriesForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
        </CardContent>
      </Card>
    </main>
  );
}
