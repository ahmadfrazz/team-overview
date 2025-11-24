import { useInfiniteQuery } from "@tanstack/react-query";
import { get_sessions_data } from "@/api/sessions_data_api";

export const useSessionsData = () => {
  return useInfiniteQuery({
    queryKey: ["sessions_data"],
    queryFn: ({ pageParam = 1 }) => get_sessions_data(pageParam, 100),
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.total / lastPage.pageSize);
      return lastPage.page < totalPages ? lastPage.page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5,
    initialPageParam: 1,
  });
};
