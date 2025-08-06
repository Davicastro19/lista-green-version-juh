import useFetch from "@/shared/api/swrfetcher";
import { IBanner } from "@/shared/interfaces/IBanner";

const useFetchBanners = () => {


    const { data, error, isLoading, mutate } = useFetch<IBanner[]>(`/banners`, {}, { revalidateOnFocus: true }  );

    return {
      banners: data || [],

      isLoading,
      error,
      mutate,
    };
  };

  export default useFetchBanners;
