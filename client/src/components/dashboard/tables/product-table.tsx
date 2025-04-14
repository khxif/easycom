'use client';

import { Loading } from '@/components/core/loading';
import { TablePagination } from '@/components/core/table-pagination';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useGetCategories } from '@/hooks/queries';
import { useDebounce } from '@/hooks/use-debounce';
import { useExtractSearchParams } from '@/hooks/use-extract-search-params';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { parseAsInteger, useQueryState } from 'nuqs';
import { useEffect, useState } from 'react';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading: boolean;
  meta: Meta;
}

export function ProductsTable<TData, TValue>({
  columns,
  data,
  isLoading,
  meta,
}: DataTableProps<TData, TValue>) {
  const { data: categories } = useGetCategories();
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [tempName, setTempName] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [name, setName] = useQueryState('name', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
  const [category, setCategory] = useQueryState('category', { defaultValue: '' });

  const debouncedValue = useDebounce(tempName, 300);
  const { searchParams, clearSearchParams } = useExtractSearchParams();

  useEffect(() => {
    setName(debouncedValue);
  }, [debouncedValue, setName]);
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex flex-col space-y-4 pb-4">
          <div className="flex items-center justify-between flex-col md:flex-row gap-4 ">
            <Input
              value={tempName}
              onChange={e => setTempName(e.target.value)}
              placeholder="Search Products by name"
              className="flex-[2] py-2.5"
            />

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-[0.5]">
                <SelectValue placeholder="categories" />
              </SelectTrigger>
              <SelectContent>
                {categories?.data?.map((category: Category) => (
                  <SelectItem key={category?._id} value={category?.name}>
                    {category?.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {searchParams.name || searchParams.category ? (
            <div className="flex w-full justify-end">
              <Button variant="outline" onClick={() => clearSearchParams()}>
                Clear Filters
              </Button>
            </div>
          ) : null}
        </div>
        <div className="rounded-md border w-full">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map(headerGroup => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map(header => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            <TableBody className="w-full">
              {!isLoading ? (
                table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map(row => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                      {row.getVisibleCells().map(cell => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No Products Found.
                    </TableCell>
                  </TableRow>
                )
              ) : (
                <TableRow className="h-24" key={0}>
                  <TableCell colSpan={columns.length} className="text-center">
                    <Loading />
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end border-t px-4">
            <TablePagination page={page} setPage={setPage} meta={meta} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
