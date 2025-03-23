'use client';

import { Loading } from '@/components/core/loading';
import AdminsForm from '@/components/dashboard/admins-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useUpdateSellerMutation } from '@/hooks/mutations';
import { useGetSellerById } from '@/hooks/queries';
import { adminSchema, AdminSchemaType } from '@/zod-schemas/admin';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft as ArrowLeftIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SellerEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: seller, isLoading, isError } = useGetSellerById(id);
  console.log(seller)
  return (
    <main className="p-5 flex flex-col space-y-8 pb-24">
      <div className="flex flex-col space-y-5">
        <Link href="/admin/sellers" className="flex items-center space-x-2 text-sm">
          <ArrowLeftIcon size={16} />
          <p>Back</p>
        </Link>
        <h1 className="text-2xl font-semibold md:text-3xl">Edit Seller</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Seller Details</CardTitle>
        </CardHeader>
        <CardContent>
          {!isLoading && !isError ? <SellerFormWrapper seller={seller} /> : <Loading />}
        </CardContent>
      </Card>
    </main>
  );
}

const SellerFormWrapper = ({ seller }: { seller: User }) => {
  const router = useRouter();
  const { mutateAsync } = useUpdateSellerMutation();

  const form = useForm<AdminSchemaType>({
    resolver: zodResolver(adminSchema.omit({ password: true })),
    defaultValues: {
      name: seller?.name ?? '',
      email: seller?.email ?? '',
      password: '',
      phone_number: seller?.phone_number ?? '',
      profile_picture: seller?.profile_picture ?? '',
      location: seller?.location ?? '',
    },
  });

  const onSubmit = async (values: AdminSchemaType) => {
    try {
      const data = await mutateAsync({ admin: values, id: seller?._id });
      if (data.status !== 200) return toast.error('Failed to update seller');

      toast.success('seller updated successfully');
      router.push('/admin/sellers');
      form.reset();
    } catch (error) {
      console.log(error);
      toast.error('Failed to create seller');
    }
  };
  return <AdminsForm form={form} handleSubmit={form.handleSubmit(onSubmit)} isEdit />;
};
