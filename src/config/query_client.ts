import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    // auto refetch options
    queries: {
      retry: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
