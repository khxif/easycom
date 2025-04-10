'use client';

import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useGetCities } from '@/hooks/use-get-cities';
import { getMyLocation } from '@/lib/get-my-location';
import { AdminSchemaType } from '@/zod-schemas/admin';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Combobox } from '../ui/combobox';

interface AdminFormProps {
  form: UseFormReturn<AdminSchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isEdit?: boolean;
}

export default function AdminsForm({ form, handleSubmit, isEdit }: AdminFormProps) {
  const [loading, setLoading] = useState(false);

  const handleGetMyLocation = async () => {
    const data = await getMyLocation(setLoading);
    form.setValue('location', data as string);
  };

  const { cities } = useGetCities();
  console.log(cities);
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 py-2">
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
                      src={field.value || '/assets/product-placeholder.png'}
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Name</FormLabel>
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
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

          {!isEdit ? (
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ) : null}

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="flex items-start  space-y-4 flex-col w-full">
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Combobox
                    value={field.value}
                    onChange={field.onChange}
                    options={cities}
                    placeholder="Select a city..."
                    emptyLabel="No matches found."
                    searchInputPlaceholder="Search for a city..."
                  />
                </FormControl>
                <Button disabled={loading} size="sm" type="button" onClick={handleGetMyLocation}>
                  Get My Location
                </Button>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CardFooter className="flex justify-end space-x-4">
          <Link href="/admin/admins">
            <Button type="submit" variant="ghost">
              Cancel
            </Button>
          </Link>
          <Button type="submit">{isEdit ? 'Update' : 'Create'}</Button>
        </CardFooter>
      </form>
    </Form>
  );
}
