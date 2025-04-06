'use client';

import { Loading } from '@/components/core/loading';
import { CategoriesForm } from '@/components/dashboard/categories-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateCategoryMutation } from '@/hooks/mutations';
import { useGetCategoryById } from '@/hooks/queries';
import { categorySchema, CategorySchemaType } from '@/zod-schemas/category';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function EditDepartmentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data, isLoading, isError } = useGetCategoryById(id);
  console.log(data);
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/categories" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Edit Category</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Category Details</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && !isError ? <CategoryFormWrapper category={data?.data} /> : <Loading />}
        </CardContent>
      </Card>
    </main>
  );
}

const CategoryFormWrapper = ({ category }: { category: Category }) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateCategoryMutation();

  const form = useForm<CategorySchemaType>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name ?? '',
      description: category?.description ?? '',
    },
  });

  const onSubmit = async (values: CategorySchemaType) => {
    try {
      await mutateAsync({ id: category?._id, category: values });

      toast.success('Category updated successfully');
      router.push('/admin/categories');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return <CategoriesForm form={form} handleSubmit={form.handleSubmit(onSubmit)} isEdit />;
};
