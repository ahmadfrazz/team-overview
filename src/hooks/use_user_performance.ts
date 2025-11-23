import { get_user_performance } from "@/api/user_api";
import { useQuery } from "@tanstack/react-query";

export const useUserPerformance = () => {
  return useQuery({
    queryKey: ["user_performance"],
    queryFn: get_user_performance,
    staleTime: 1000 * 60 * 5,
  });
};
