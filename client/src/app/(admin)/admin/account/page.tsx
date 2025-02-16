'use client';

import { Loading } from '@/components/core/loading';
import { ProfileForm } from '@/components/dashboard/profile-form';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useUpdateProfileMutation } from '@/hooks/mutations';
import { useGetMyProfile } from '@/hooks/queries';
import { profileSchema, ProfileSchemaType } from '@/zod-schemas/profile';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function AccountPage() {
  const { data, isLoading } = useGetMyProfile();

  return (
    <main className="p-5 flex flex-col space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold md:text-3xl">Account</h1>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <div className="bg-secondary p-4 rounded-full">
              <UserIcon className="size-4" />
            </div>
            <h2 className="text-xl font-semibold">Account Details</h2>
          </div>
        </CardHeader>
        <CardContent className="py-5 flex items-center space-x-5">
          {!isLoading ? <ProfileFormWrapper data={data} /> : <Loading />}
        </CardContent>
      </Card>
    </main>
  );
}

function ProfileFormWrapper({ data }: { data: User }) {
  const { mutateAsync } = useUpdateProfileMutation();

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: data?.name ?? '',
      email: data?.email ?? '',
      phone_number: data?.phone_number ?? '',
    },
  });

  const handleSubmit = async (values: ProfileSchemaType) => {
    try {
      const data = await mutateAsync(values);
      if (data.statusText !== 'OK') return toast.error('Failed to update profile');

      toast.success('Profile updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update profile');
    }
  };
  return <ProfileForm form={form} handleSubmit={form.handleSubmit(handleSubmit)} />;
}
