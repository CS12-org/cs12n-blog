

import axios from "~/lib/axios";
import { Post } from "~/types/post";

export type SavedPostsResponse = {
  items: any[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
};

export const mapSavedPostToPost = (item: any): Post => ({
  id: item.id,
  title: item.title,
  slug: item.slug,
  description: item.excerpt ?? "",
  clap: item.clap ?? 0,
  narrator: null,
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

export const fetchSavedPosts = async (cursor: string | null = null, pageSize = 10) => {
  const res = await axios.get<SavedPostsResponse>("/api/saved-posts", {
    params: { cursor, pageSize },
  });

  const items = res.data.items.map(mapSavedPostToPost);

  return {
    items,
    endCursor: res.data.endCursor,
    hasNextPage: res.data.hasNextPage,
    totalCount: res.data.totalCount,
  };
};

