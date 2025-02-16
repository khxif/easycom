'use client';

import { Loading } from '@/components/core/loading';
import AdminsForm from '@/components/dashboard/admins-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateAdminMutation } from '@/hooks/mutations';
import { useGetAdminById } from '@/hooks/queries';
import { adminSchema, AdminSchemaType } from '@/zod-schemas/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function AdminEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: admin, isLoading, isError } = useGetAdminById(id);
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/admins" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Add Admins</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Admin Details</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && !isError ? <AdminFormWrapper admin={admin} /> : <Loading />}
        </CardContent>
      </Card>
    </main>
  );
}

const AdminFormWrapper = ({ admin }: { admin: User }) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateAdminMutation();

  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(adminSchema.omit({ password: true })),
    defaultValues: {
      name: admin?.name ?? '',
      email: admin?.email ?? '',
      password: '',
      phone_number: admin?.phone_number ?? '',
      role: admin?.role as 'super-admin' | 'admin',
    },
  });

  const onSubmit = async (values: AdminSchemaType) => {
    try {
      const data = await mutateAsync({ admin: values, id: admin?._id });
      if (data.statusText !== 'OK') return toast.error('Failed to update admin');

      toast.success('Admin updated successfully');
      router.push('/admin/admins');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create admin');
    }
  };
  return <AdminsForm form={form} handleSubmit={form.handleSubmit(onSubmit)} isEdit />;
};
