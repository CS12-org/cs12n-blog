'use client';

import { getCommentByParentId } from '@/service/get-comment-by-parent-id';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useFetchCommentByParentId(parentId: string) {
  return useInfiniteQuery({
    queryKey: ['comments-reply', parentId],
    queryFn: ({ pageParam }: { pageParam: string | null }) => getCommentByParentId({ cursor: pageParam, parentId }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor : null),
  });
}
