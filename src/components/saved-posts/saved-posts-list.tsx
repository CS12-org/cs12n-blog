'use client';

import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { useFetchSavedPosts } from '~/hooks/use-saved-posts';
import Save from '~/assets/images/save.svg';
import Close from '~/assets/images/close.svg';
import Stopwatch from '~/assets/images/stopwatch.svg';
import { InfiniteData } from '@tanstack/react-query';
import { SavedPostsResponse, SavedPostItem } from '~/service/saved-posts';

export default function SavedPost() {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useFetchSavedPosts();

  // Trigger fetch next page
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Flatten all pages
const posts = (data as InfiniteData<SavedPostsResponse>)?.pages.flatMap((page) => page.items) || [];  const totalSaved = data?.pages?.[0]?.totalCount ?? 0;

  if (isLoading) return <p>در حال بارگذاری پست‌ها...</p>;
  if (isError) return <p>خطا در دریافت پست‌ها: {error?.message}</p>;

  return (
    <section className="flex flex-col gap-2">
      <section className="p-2 w-full gap-2 flex justify-between items-start bg-mantle rounded-lg">
        <p className="text-body-sm text-subtext-0 w-full">
          در اینجا پست‌های ذخیره شده شما نمایش داده می‌شوند. می‌توانید تا سقف ۱۵ پست ذخیره کنید...
        </p>
        <span className="bg-crust w-6 h-6 rounded-md flex items-center justify-center">
          <Close />
        </span>
      </section>

      <span className="text-subtext-1 text-xs">
        ({posts.length} از {totalSaved})
      </span>

      {posts.map(post => (
        <section
          key={post.id}
          className="px-5 py-2.5 bg-crust text-white flex justify-between rounded-lg items-center"
        >
          <h2>{post.title}</h2>
          <section className="flex gap-2.5">
            <button className="bg-base rounded-full flex items-center justify-center w-9 h-9">
              <Stopwatch />
            </button>
            <button className="bg-base rounded-md flex items-center justify-center w-9 h-9">
              <Save stroke="#8AADF4" fill="#8AADF4" className="h-7 w-7" />
            </button>
          </section>
        </section>
      ))}

      {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
      {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
    </section>
  );
}
