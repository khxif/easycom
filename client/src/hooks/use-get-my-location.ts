import { getMyLocation } from '@/lib/get-my-location';
import { useEffect, useState } from 'react';

export default function useGetMyLocation() {
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<string | undefined>('');

  useEffect(() => {
    async function fetchLocation() {
      const location = await getMyLocation(setLoading);
      setLocation(location);
    }
    fetchLocation();
  }, []);

  return { location, loading };
}
