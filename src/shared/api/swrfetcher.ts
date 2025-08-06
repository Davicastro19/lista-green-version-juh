import useSWR, { SWRConfiguration } from 'swr';
import httpService from './fetcher';



const useFetch = <T>(endpoint: string, queryParams?: Record<string, string | number | boolean>, config?: SWRConfiguration) => {
  const fetcher = async () => {
    return httpService.get<T>(endpoint, queryParams);
  };

  return useSWR<T>(endpoint, fetcher, config);
};

export default useFetch;
