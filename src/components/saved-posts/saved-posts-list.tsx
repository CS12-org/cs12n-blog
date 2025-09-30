'use client';

import { InfiniteData } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import Close from '@/assets/images/close.svg';
import Save from '@/assets/images/save.svg';
import Stopwatch from '@/assets/images/stopwatch.svg';
import { useFetchSavedPosts } from '@/hooks/use-saved-posts';
import { SavedPostsResponse } from '@/service/saved-posts';
import SaveButton from './save-button';

export default function SavedPost() {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useFetchSavedPosts();

  // Trigger fetch next page
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages
  const posts = (data as InfiniteData<SavedPostsResponse>)?.pages.flatMap((page) => page.items) || [];
  const totalSaved = data?.pages?.[0]?.totalCount ?? 0;

  if (isLoading) return <p>در حال بارگذاری پست‌ها...</p>;
  if (isError) return <p>خطا در دریافت پست‌ها: {error?.message}</p>;

  return (
    <section className="flex flex-col gap-2">
      <section className="bg-mantle flex w-full items-start justify-between gap-2 rounded-lg p-2">
        <p className="text-body-sm text-subtext-0 w-full">
          در اینجا پست‌های ذخیره شده شما نمایش داده می‌شوند. می‌توانید تا سقف ۱۵ پست ذخیره کنید...
        </p>
        <span className="bg-crust flex h-6 w-6 items-center justify-center rounded-md">
          <Close />
        </span>
      </section>

      <span className="text-subtext-1 text-xs">
        ({posts.length} از {totalSaved})
      </span>

      {posts.map((post) => (
        <section key={post.id} className="bg-crust flex items-center justify-between rounded-lg px-5 py-2.5 text-white">
          <h2>{post.title}</h2>
          <section className="flex gap-2.5">
            <button className="bg-base flex h-9 w-9 items-center justify-center rounded-full">
              <Stopwatch />
            </button>
            <SaveButton postId={post.id} isSavedByCurrentUser={post.isSavedByCurrentUser} />
          </section>
        </section>
      ))}

      {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
      {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
    </section>
  );
}
