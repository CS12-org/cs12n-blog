import axios from '@/lib/axios';

export type FeaturedImage = {
  width: number;
  height: number;
  url: string;
};
export type Post = {
  id: string;
  title: string;
  clap: number;
  userClapCount: number;
  slug: string;
  description: string;
  narrator: string | null;
  featuredImage: FeaturedImage | null;
  user: {
    email: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
  } | null;
};

export type SavedPostsResponse = {
  items: unknown[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
};

export type GetPostsParams = {
  page: number;
  pageSize: number;
};

export interface GetPostsResult {
  items: {
    id: string;
    createdAt: string;
    featuredImage?: string;
    title: string;
    slug: string;
    claps: number;
    userClapCount?: number;
    contentText: string;
    status: string;
    user: {
      id: string;
      profile: {
        user: string;
        fullName: string | null;
        bio: string | null;
        avatarUrl: string | null;
        coverUrl: string | null;
        website: string | null;
      };
    };
    tags: { id: string; name: string; slug: string }[];
    isSavedByCurrentUser: boolean;
    averageRating: unknown;
  }[];
  total: number;
}

export interface SearchPostsResult {
  items: {
    id: string;
    title: string;
    slug: string;
    contentText: string;
    featuredImage?: string;
    isSavedByCurrentUser: boolean;
    tags: { id: string; name: string; slug: string }[];
    clap: number;
    userClapCount: number;
  }[];
}

// ------------------ API Functions ------------------

export const getPosts = async (params: GetPostsParams) => {
  return (await axios.get<GetPostsResult>('/api/posts/feed', { params })).data.items;
};

type SearchParams = {
  query: string;
  page: number;
  pageSize: number;
};
export const searchPosts = async (params: SearchParams) => {
  const { query, page, pageSize } = params;

  try {
    const res = await axios.get<SearchPostsResult>('/api/posts/search', {
      params: { query },
    });

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    return res.data.items.slice(start, end).map(mapSearchItemToPostItem);
  } catch (err: unknown) {
    console.error(err);
    throw new Error('خطا در جست‌وجوی پست‌ها');
  }
};

export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const res = await axios.get(`/api/posts/get-by-slug/${slug}`);
    return res.data;
  } catch (err: unknown) {
    console.error(err);
    throw new Error('خطا در گرفتن پست');
  }
};

// ------------------ Mappers ------------------

/**
 * Mapper: SearchPostsResult item → GetPostsResult item
 * برای همخوانی تایپ‌ها با Posts
 */
export const mapSearchItemToPostItem = (item: SearchPostsResult['items'][number]): GetPostsResult['items'][number] => ({
  id: item.id,
  createdAt: new Date().toISOString(),
  featuredImage: item.featuredImage ?? undefined,
  title: item.title,
  slug: item.slug,
  contentText: item.contentText,
  status: 'published',
  user: {
    id: '0',
    profile: {
      user: 'unknown',
      fullName: null,
      bio: null,
      avatarUrl: null,
      coverUrl: null,
      website: null,
    },
  },
  claps: item.clap ?? 0,
  userClapCount: item.userClapCount ?? 0,
  tags: item.tags,
  isSavedByCurrentUser: item.isSavedByCurrentUser,
  averageRating: null,
});
