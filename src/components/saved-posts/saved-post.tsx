



"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import Close from "~/assets/images/close.svg";
import SavedPostList from "./saved-post-list";
import { useSavedPosts } from "~/hooks/use-saved-posts";

export default function SavedPosts() {
  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: "200px",
  });

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending,
  } = useSavedPosts();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const posts = data?.pages.flatMap((p) => p.items) || [];
  const savedCount = posts.length;

  return (
    <section className="flex flex-col gap-[10px]">
      {/* Intro Section */}
      <section className="p-[10px] w-full gap-[10px] flex justify-between items-start bg-mantle rounded-[10px]">
        <p className="text-body-sm text-subtext-0 w-full">
          در اینجا پست‌های ذخیره شده شما نمایش داده می‌شوند. شما می‌توانید تا سقف ۱۵ پست
          ذخیره کنید تا بعداً مطالعه کنید. هر پست به مدت ۱۰ روز در لیست ذخیره‌های شما باقی می‌ماند و پس از روز دهم حذف می‌شود.
        </p>
        <span className="bg-crust w-[23px] h-[23px] rounded-[5px] flex items-center justify-center">
          <Close />
        </span>
      </section>

      {/* Count */}
      <span className="text-subtext-1 text-[12px]">
        ({savedCount} از ۱۵)
      </span>

      {/* List */}
      <SavedPostList posts={posts} />

      {/* Loader for next page */}
      {isFetchingNextPage && <p className="text-center">در حال بارگذاری...</p>}

      {/* Observer element */}
      {hasNextPage && <div ref={ref} style={{ height: "1px" }} />}
    </section>
  );
}

