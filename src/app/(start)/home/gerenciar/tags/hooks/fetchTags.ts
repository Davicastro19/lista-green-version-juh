import useFetch from "@/shared/api/swrfetcher";
import { Option } from "@/shared/interfaces/IFilter";
import { ITags } from "@/shared/interfaces/ITag";

const useFetchTags = (
    page: number,
    limit: number,
    area: Option[],
    theme: Option[],
    name: string
  ) => {
    const queryParams = new URLSearchParams({
      page: String(page),
      limit: String(limit),
    });

    if (area.length > 0) queryParams.append("area", area.map(a => a.value).join(","));
    if (theme.length > 0) queryParams.append("theme", theme.map(t => t.value).join(","));
    if (name) queryParams.append("name", name);

    const { data, error, isLoading, mutate } = useFetch<{
      data: ITags[],
      page: number,
      limit: number,
      totalPages: number
    }>(`/tags/getAll?${queryParams.toString()}`);

    return {
      tags: data?.data || [],
      page: data?.page || 1,
      totalPages: data?.totalPages || 1,
      isLoading,
      error,
      mutate,
    };
  };

  export default useFetchTags;
