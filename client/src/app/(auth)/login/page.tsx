'use client';

import { LoginForm } from '@/components/layout/auth/login-form';
import { useLoginMutation } from '@/hooks/mutations';
import { useAuthStore } from '@/stores/auth-store';
import { loginSchema, LoginSchemaType } from '@/zod-schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const authenticate = useAuthStore(state => state.authenticate);
  const { mutateAsync } = useLoginMutation();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginSchemaType) => {
    try {
      const { user, token } = await mutateAsync(values);
      authenticate(user, token);

      toast.success('Logged in successfully');
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full flex flex-col space-y-6 font-medium">
      <h1 className="text-2xl">Login</h1>
      <LoginForm form={form} handleSubmit={form.handleSubmit(onSubmit)} />
    </div>
  );
}
