import { apiClient } from '@/lib/api-client';

export const getCountryCodeByIP = async () => {
  try {
    const { data } = await apiClient.get(
      `https://ipinfo.io/json?token=${process.env.NEXT_PUBLIC_IP_INFO_API_KEY}`,
    );
    return data.country;
  } catch (error) {
    console.log(error);
  }
};
