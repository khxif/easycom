import { getCountryCodeByIP } from '@/fetchers/location';
import { City, State } from 'country-state-city';
import { useEffect, useState } from 'react';

export interface City {
  label: string;
  value: string;
  lat?: string;
  lng?: string;
}

export function useGetCities() {
  const [cities, setCities] = useState<City[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    async function getCities() {
      setIsLoading(true);

      const countryCode = await getCountryCodeByIP();
      const allCities = City.getCitiesOfCountry(countryCode);
      const allStates = State.getStatesOfCountry(countryCode);

      const formattedCities = allCities?.map(city => {
        const state = allStates.find(s => s.isoCode === city.stateCode);

        const value = `${city.name}, ${state?.name ?? 'Unknown'} [${city.latitude},${
          city.longitude
        }]`;
        const label = `${city.name}, ${state?.name ?? 'Unknown'}`;

        return {
          label,
          value,
          lat: city.latitude,
          lng: city.longitude,
        };
      });

      setCities(formattedCities as City[]);
      setIsLoading(false);
    }

    getCities();
  }, []);

  return { cities, isLoading };
}
