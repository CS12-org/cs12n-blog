import axios from '~/lib/axios';

// ------------------ Types ------------------

export type Post = {
  id: number;
  title: string;
  clap: number;
  slug: string;
  description: string;
  narrator: string | null;
  featuredImage: {
    width: number;
    height: number;
    url: string;
  } | null;
  user: {
    email: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
  } | null;
};

export type SavedPostsResponse = {
  items: any[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
};

export interface GetPostsParams {
  page: number;
  pageSize: number;
}

export interface GetPostsResult {
  items: {
    id: string;
    createdAt: string;
    featuredImage?: string;
    title: string;
    slug: string;
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
  }[];
}

// ------------------ API Functions ------------------

export const getPosts = (params: GetPostsParams) => {
  return axios.get<GetPostsResult>('/posts/feed', { params });
};

export const searchPosts = async (query: string): Promise<SearchPostsResult> => {
  try {
    const res = await axios.get<SearchPostsResult>('/api/posts/search', {
      params: { query },
    });
    return res.data;
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

const mapSavedPostToPost = (item: any): Post => ({
  id: item.id,
  title: item.title ?? 'بدون عنوان',
  slug: item.slug,
  description: item.excerpt ?? '',
  clap: item.saveCount ?? 0,
  narrator: null,
  featuredImage: item.featured_image
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

/**
 * Mapper: SearchPostsResult item → GetPostsResult item
 * برای همخوانی تایپ‌ها با Posts
 */
export const mapSearchItemToPostItem = (
  item: SearchPostsResult['items'][number]
): GetPostsResult['items'][number] => ({
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
  tags: item.tags,
  isSavedByCurrentUser: item.isSavedByCurrentUser,
  averageRating: null,
});
