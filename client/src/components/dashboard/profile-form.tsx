'use client';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ProfileSchemaType } from '@/zod-schemas/profile';
import { UseFormReturn } from 'react-hook-form';

interface ProfileFormProps {
  form: UseFormReturn<ProfileSchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function ProfileForm({ form, handleSubmit }: ProfileFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          disabled
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormDescription>Contact admin to change email.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="Phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CardFooter className="flex justify-end space-x-3">
          <Button type="button" onClick={() => form.reset()} variant="ghost">
            Cancel
          </Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
