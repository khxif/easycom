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
import { CategorySchemaType } from '@/zod-schemas/category';
import Link from 'next/link';
import { UseFormReturn } from 'react-hook-form';
import { Textarea } from '../ui/textarea';

interface DepartmentFormProps {
  form: UseFormReturn<CategorySchemaType, unknown, undefined>;
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  isEdit?: boolean;
}

export function CategoriesForm({ form, handleSubmit, isEdit }: DepartmentFormProps) {
  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-8 py-2">
        <div className="grid grid-cols-1 gap-5">
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Description" rows={5} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <CardFooter className="flex justify-end space-x-4">
          <Link href="/admin/categories">
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
