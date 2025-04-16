'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LoginSchemaType } from '@/zod-schemas/auth';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';

interface LoginFormProps {
  form: UseFormReturn<LoginSchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function LoginForm({ form, handleSubmit }: LoginFormProps) {
  return (
    <>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="space-y-8 w-full">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="user@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="password123" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            Submit
          </Button>
        </form>
      </Form>
      <Label className="flex space-x-1 text-primary/75">
        <p> Don&apos;t have an account?</p>
        <Link href="/signup" className="text-primary">
          Signup Here.
        </Link>
      </Label>
    </>
  );
}
