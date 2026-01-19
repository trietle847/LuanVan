import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 phút coi là fresh
      gcTime: 30 * 60 * 1000, // giữ cache 30 phút
      refetchOnWindowFocus: false, // không refetch khi quay lại tab
      retry: 1, // retry 1 lần khi lỗi
    },
  },
});
