'use client';

import { useEffect } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';
import axios from '@/lib/axios';
import CommentMessege from '@/components/posts/comment-messages/comment-message';

export default function UserCommentsPage() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '300px',
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['user-comments'],
    queryFn: async ({ pageParam }) => {
      const params = {
        previousCursor: pageParam || undefined,
        pageSize: 10,
      };
      const { data } = await axios.get('/api/comments/by-user', { params });
      return data;
    },
    getNextPageParam: (lastPage) =>
      lastPage?.hasNextPage ? lastPage?.endCursor : undefined,
    initialPageParam: null,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const comments = data?.pages.flatMap((page) => page.items) || [];
  const totalCount = data?.pages?.[0]?.totalCount ?? 0;
  const hasComments = comments.length > 0;

  if (isLoading) {
    return <p>در حال بارگذاری کامنت‌ها...</p>;
  }

  if (isError) {
    return <p>خطا در دریافت داده‌ها: {error?.message}</p>;
  }

  return (
    <section className="flex flex-col gap-[40px] px-[20px] py-[30px]">
      <header className="text-subtext-0 text-[20px] font-extrabold">
        کامنت‌های من ({totalCount})
      </header>

      {hasComments ? (
        comments.map((comment) => (
          <CommentMessege key={comment.id} comment={comment} postId={comment.id} />
        ))
      ) : (
        <p>هیچ نظری ثبت نکردی.</p>
      )}

      {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
      {isFetchingNextPage && <p>در حال بارگذاری موارد بعدی...</p>}
    </section>
  );
}
