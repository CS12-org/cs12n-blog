import { QueryClient } from "@tanstack/react-query";

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 2 * 1000,
      },
    },
  });

export default createQueryClient;
