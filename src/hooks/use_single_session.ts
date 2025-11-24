import { get_single_session } from "@/api/single_session_api";
import { useQuery } from "@tanstack/react-query";

export const useSingleSession = (id: string, enabled: boolean = true) => {
  return useQuery({
    queryKey: ["single_session", id],
    queryFn: () => get_single_session(id),
    staleTime: 1000 * 60 * 5,
    enabled: enabled && !!id, // Only fetch when modal is open and id exists
  });
};
