'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import ReactPaginate from 'react-paginate';

interface TablePaginationProps {
  page: number;
  setPage: (page: number) => void;
  meta: Meta;
}

export function TablePagination({ page, setPage, meta }: TablePaginationProps) {
  return (
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
  );
}
