import { useRouter, useSearchParams } from 'next/navigation';

export function useExtractSearchParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchParamsEntries = Object.fromEntries(searchParams.entries());

  const clearSearchParams = () => {
    router.push(window.location.pathname);
  };

  return { searchParams: searchParamsEntries, clearSearchParams };
}
