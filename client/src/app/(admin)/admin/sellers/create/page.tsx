'use client';

import AdminsForm from '@/components/dashboard/admins-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCreateSellerMutation } from '@/hooks/mutations';
import { adminSchema, AdminSchemaType } from '@/zod-schemas/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function CreateSellerPage() {
  const router = useRouter();
  const { mutateAsync } = useCreateSellerMutation();

  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone_number: '',
      profile_picture: '',
      location: '',
    },
  });

  const onSubmit = async (values: AdminSchemaType) => {
    try {
      const data = await mutateAsync(values);
      if (data.status !== 200) return toast.error('Failed to create seller');

      toast.success('Seller created successfully');
      router.push('/admin/sellers');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create seller');
    }
  };
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/admins" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Add Sellers</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seller Details</CardTitle>
        </CardHeader>
        <CardContent>
          <AdminsForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
        </CardContent>
      </Card>
    </main>
  );
}
