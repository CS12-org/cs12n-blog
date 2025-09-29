import axios from '~/lib/axios';

export interface SavedPostItem {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentText: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
    profile: {
      avatarUrl: string | null;
    };
  };
  tags: { id: string; name: string }[];
  isSavedByCurrentUser: boolean;
}

export interface SavedPostsResponse {
  items: SavedPostItem[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
}

export async function fetchSavedPosts(cursor: string | null): Promise<SavedPostsResponse> {
  const res = await axios.get('/api/saved-posts', {
    params: { previousCursor: cursor, pageSize: 5 },
  });
  return res.data;
}
