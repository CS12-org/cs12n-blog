'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchSavedPosts } from '~/service/saved-posts';

export function useFetchSavedPosts() {
  return useInfiniteQuery({
    queryKey: ['saved-posts'],
    queryFn: ({ pageParam }: { pageParam: string | null }) => fetchSavedPosts(pageParam),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor : null),
  });
}
