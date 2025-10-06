'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostCommentsByPostId, GetPostCommentsByPostIdRes } from '@/service/get-comments-by-post-id';

export function useFetchPostComments(postId: string) {
  return useInfiniteQuery({
    queryKey: ['comments', postId],
    queryFn: ({ pageParam }: { pageParam: string | null }) => getPostCommentsByPostId({ cursor: pageParam, postId }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor : null),
  });
}
