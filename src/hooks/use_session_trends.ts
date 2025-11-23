import { get_session_trends } from "@/api/session_trends_api";
import { useQuery } from "@tanstack/react-query";

export const useSessionTrends = (days: number) => {
  return useQuery({
    queryKey: ["user_performance", days],
    queryFn: () => get_session_trends(days),
    staleTime: 1000 * 60 * 5,
  });
};
