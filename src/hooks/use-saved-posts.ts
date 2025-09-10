

import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "~/lib/axios";
import { Post } from "./post";

export type SavedPostsResponse = {
  items: any[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
};

// Mapper: داده‌ی API → Post
const mapSavedPostToPost = (item: any): Post => ({
  id: String(item.id),
  title: item.title ?? "بدون عنوان",
  slug: item.slug,
  description: item.excerpt ?? "",
  clap: item.saveCount ?? 0,
  featured_image: item.featured_image
    ? {
        width: item.featured_image.width,
        height: item.featured_image.height,
        url: item.featured_image.url,
      }
    : null,
  user: item.user
    ? {
        email: item.user.email,
        username: item.user.username,
        avatarUrl: item.user.profile?.avatarUrl ?? undefined,
        bio: item.user.profile?.bio ?? undefined,
      }
    : null,
});

const fetchSavedPosts = async (cursor?: string, pageSize = 10) => {
  const res = await axios.get<SavedPostsResponse>("/api/saved-posts", {
    params: { cursor, pageSize },
  });

  return {
    items: res.data.items.map(mapSavedPostToPost),
    endCursor: res.data.endCursor,
    hasNextPage: res.data.hasNextPage,
  };
};

export function useSavedPosts() {
  return useInfiniteQuery({
    queryKey: ["savedPosts"],
    queryFn: ({ pageParam }: { pageParam?: string | null }) =>
      fetchSavedPosts(pageParam ?? undefined),
    getNextPageParam: (lastPage) => (lastPage.hasNextPage ? lastPage.endCursor : null),
  });
}

