import { useSearchParams } from 'next/navigation';

export function useExtractSearchParams() {
  const searchParams = useSearchParams();
  const searchParamsEntries = Object.fromEntries(searchParams.entries());

  return { searchParams: searchParamsEntries };
}
