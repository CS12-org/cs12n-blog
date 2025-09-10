import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchSavedPosts } from "~/service/saved-posts";

export function useSavedPosts() {
  return useInfiniteQuery({
    queryKey: ["savedPosts"],
    queryFn: ({ pageParam }: { pageParam: number | null }) =>
      fetchSavedPosts(pageParam),
    initialPageParam: null as number | null,
    getNextPageParam: (lastPage) =>
      lastPage.hasNextPage ? lastPage.endCursor : null,
  });
}
