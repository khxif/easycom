'use client';

import DepartmentsForm from '@/components/dashboard/departments-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateDepartmentMutation } from '@/hooks/mutations';
import { departmentSchema, DepartmentSchemaType } from '@/zod-schemas/department';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateDepartmentPage() {
  const router = useRouter();
  const { mutateAsync } = useCreateDepartmentMutation();

  const form = useForm<DepartmentSchemaType>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      name: '',
      description: '',
    },
  });

  const onSubmit = async (values: DepartmentSchemaType) => {
    try {
      await mutateAsync(values);

      toast.success('Department created successfully');
      router.push('/admin/departments');
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/departments" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Add Departments</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Details</CardTitle>
        </CardHeader>
        <CardContent>
          <DepartmentsForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
        </CardContent>
      </Card>
    </main>
  );
}
