import { toast } from 'sonner';

export const getMyLocation = async (
  setLoading: (loading: boolean) => void,
): Promise<string | undefined> => {
  if (!navigator.geolocation) {
    toast.error('Geolocation is not supported by your browser.');
    return;
  }

  try {
    setLoading(true);
    const position = await new Promise<GeolocationPosition>((resolve, reject) =>
      navigator.geolocation.getCurrentPosition(resolve, reject),
    );
    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );
    if (!response.ok) {
      toast.error('Failed to fetch location details.');
      return;
    }

    const data = await response.json();
    console.log(data);
    const city =
      data.address.city ||
      data.address.town ||
      data.address.village ||
      data.address.county ||
      'Unknown City';
    const district = data.address.state_district || data.address.county || 'Unknown District';

    setLoading(false);
    return `${city} ${district} [${latitude},${longitude}]`;
  } catch (error) {
    setLoading(false);
    toast.error(error instanceof Error ? error.message : 'An unknown error occurred.');
    return;
  }
};
