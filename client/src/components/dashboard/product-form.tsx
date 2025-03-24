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
import { Textarea } from '@/components/ui/textarea';
import { ProductSchemaType } from '@/zod-schemas/products';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { MultiSelect } from '../ui/multi-select';

interface ProductFormProps {
  form: UseFormReturn<ProductSchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isEdit?: boolean;
}

export function ProductForm({ form, handleSubmit, isEdit }: ProductFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 py-2">
        <div>
          <FormField
            control={form.control}
            name="image_url"
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
                <FormLabel> Image</FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Nike Air" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="9999.9" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className='flex flex-col w-full'>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  {/* <Input placeholder="shadcn" {...field} /> */}
                  <MultiSelect
                    options={[
                      { label: 'Shoes', id: 'shoes' },
                      { label: 'Clothes', id: 'clothes' },
                      { label: 'Electronics', id: 'electronics' },
                      { label: 'Others', id: 'others' },
                    ]}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input placeholder="100" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea rows={4} placeholder="Description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <CardFooter className="flex justify-end space-x-4">
          <Link href="/admin/products">
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
