'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { parseAsInteger, useQueryState } from 'nuqs';
import ReactPaginate from 'react-paginate';
import { Loading } from '../../core/loading';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  meta: Meta;
}

export function ProductsTable<TData, TValue>({
  columns,
  data,
  isLoading,
  meta,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(0));
  return (
    <Card>
      <CardContent className="p-5">
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
                <Loading />
              )}
            </TableBody>
          </Table>
          <div className="flex items-center justify-end border-t px-4">
            <ReactPaginate
              breakLabel="..."
              initialPage={page}
              nextLabel={
                <Button size="sm" disabled={page === meta?.total_pages - 1} variant="outline">
                  <ChevronRightIcon className="size-5" />
                </Button>
              }
              onPageChange={selectedItem => setPage(selectedItem.selected)}
              pageRangeDisplayed={2}
              pageCount={meta?.total_pages}
              previousLabel={
                <Button size="sm" disabled={page === 0} variant="outline">
                  <ChevronLeftIcon className="size-5" />
                </Button>
              }
              renderOnZeroPageCount={null}
              className="flex items-center space-x-4  py-4"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
