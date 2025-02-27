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
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

interface ProfileFormProps {
  form: UseFormReturn<ProfileSchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
}

export function ProfileForm({ form, handleSubmit }: ProfileFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 w-full">
        <div>
          <FormField
            control={form.control}
            name="profile_picture"
            render={({ field }) => (
              <FormItem className="flex space-x-4 items-center">
                <FormControl>
                  <CldUploadButton
                    uploadPreset="cw4upclb"
                    options={{ maxFiles: 1 }}
                    className="size-28 border flex items-center justify-center p-1 
                  rounded-full"
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    onSuccess={(data: any) => field.onChange(data?.info?.secure_url)}
                  >
                    <Image
                      width={50}
                      height={50}
                      src={field.value ? field.value : '/assets/product-placeholder.png'}
                      alt="placeholder"
                      className="w-full h-full object-fill rounded-full"
                    />
                  </CldUploadButton>
                </FormControl>
                {field.value ? (
                  <Button
                    size="sm"
                    variant="outline"
                    type="button"
                    onClick={() => field.onChange('')}
                  >
                    Remove
                  </Button>
                ) : (
                  <div className="flex flex-col space-y-2.5">
                    <FormLabel>Profile Picture</FormLabel>
                    <FormMessage />
                  </div>
                )}
              </FormItem>
            )}
          />
        </div>

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
              <FormDescription>Email cannot be changed.</FormDescription>
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
