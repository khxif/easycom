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
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useGetCategories } from '@/hooks/queries';
import { searchSchema, SearchSchemaType } from '@/zod-schemas/search';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { MapPinHouseIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';
import { FormEvent, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loading } from '../core/loading';

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
      <DialogContent className="max-w-sm w-full md:max-w-xl">
        <DialogHeader>
          <DialogTitle>Search For Products</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSearch)} className="space-y-6 mt-2 w-full">
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
          </form>
          <div className="flex items-center space-x-5">
            <FilterButton />
            <DropdownFilter />
          </div>
          <DialogFooter>
            <Button onClick={() => handleSearch(form.getValues())} className="w-full" size="sm">
              Search
            </Button>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function FilterButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [location, setLocation] = useQueryState('location');
  const [tempLocation, setTempLocation] = useState(location ?? '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocation(tempLocation);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 max-w-fit">
          <MapPinHouseIcon className="size-5" />
          {location ? <>{location}</> : <>Filter by Location</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" sideOffset={10}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <FormLabel>Filter By Location</FormLabel>
          <Input
            value={tempLocation}
            onChange={e => setTempLocation(e.target.value)}
            placeholder="City, State"
            className="w-full"
          />
          <Button type="submit" size="sm" className="w-full">
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

function DropdownFilter() {
  const { data, isLoading } = useGetCategories();

  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useQueryState('category');
  const [tempCategory, setTempSetCategory] = useState(category ?? '');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCategory(tempCategory);
    setIsOpen(false);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 max-w-fit">
          <MapPinHouseIcon className="size-5" />
          {category ? <>{category}</> : <>Filter by Category</>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-4" align="start" sideOffset={10}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <FormLabel>Filter By Category</FormLabel>
          <Select
            onValueChange={(value: string) => setTempSetCategory(value)}
            defaultValue={tempCategory}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {!isLoading ? (
                data?.data.map((category: Category) => (
                  <SelectItem key={category?._id} value={category?.name}>
                    {category?.name}
                  </SelectItem>
                ))
              ) : (
                <Loading />
              )}
            </SelectContent>
          </Select>

          <Button type="submit" size="sm" className="w-full">
            Apply
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
