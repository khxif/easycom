'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { searchSchema, SearchSchemaType } from '@/zod-schemas/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useQueryState } from 'nuqs';
import { useForm } from 'react-hook-form';

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export function SearchModal({ isOpen, setIsOpen }: SearchModalProps) {
  const [name, setName] = useQueryState('name');
  const queryClient = useQueryClient();

  const form = useForm<SearchSchemaType>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      name: name || '',
    },
  });

  const handleSearch = async (values: SearchSchemaType) => {
    try {
      setName(values.name as string);
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Search For Products</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6 mt-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Shoes" {...field} />
                  </FormControl>
                  <FormDescription>Search the products you are looking for.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button className="w-full" type="submit" size="sm">
                Search
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
