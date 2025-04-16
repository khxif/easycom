'use client';

import { SignupForm } from '@/components/layout/auth/signup-form';
import { useSignupMutation } from '@/hooks/mutations';
import { useAuthStore } from '@/stores/auth-store';
import { signupSchema, SignupSchemaType } from '@/zod-schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const authenticate = useAuthStore(state => state.authenticate);
  const { mutateAsync } = useSignupMutation();

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      phone_number: '',
    },
  });

  const onSubmit = async (values: SignupSchemaType) => {
    try {
      const { user, token } = await mutateAsync(values);
      authenticate(user, token);

      toast.success('Logged in successfully');
      router.push('/');
    } catch (error) {
      const axiosError = error as AxiosError<{ message: string }>;

      if (axiosError.response) toast.error(axiosError.response?.data?.message || 'Unknown error');
      else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    }
  };
  return (
    <div className="w-full flex flex-col space-y-6 font-medium">
      <h1 className="text-2xl">Signup</h1>
      <SignupForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
    </div>
  );
}
