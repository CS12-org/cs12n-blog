import axios from '~/lib/axios';

export type Post = {
  id: number;
  title: string;
  clap: number;
  slug: string;
  description: string;
  narrator: string | null;
  featured_image: {
    width: number;
    height: number;
    url: string;
  } | null;
  user: {
    email: string;
    username: string;
    avatarUrl?: string; // اختیاری
    bio?: string; // اختیاری
  } | null;
};
export type SavedPostsResponse = {
  items: any[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string | null;
};

/**
 * Mapper: داده‌ی API → Post
 */
export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const res = await axios.get(`/api/posts/get-by-slug/${slug}`);
    return res.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error('خطا در گرفتن پست');
  }
};
const mapSavedPostToPost = (item: any): Post => ({
  id: item.id,
  title: item.title ?? 'بدون عنوان',
  slug: item.slug,
  description: item.excerpt ?? '',
  clap: item.saveCount ?? 0,
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

export type GetPostsParams = {
  page: number;
  pageSize: number;
};

export type GetPostsResult = {
  endCursor: string;
  hasNextPage: boolean;
  totalCount: number;
  data: {
    id: number;
    description: string;
    title: string;
    content: string;
    clap: number;
    slug: string;
    createdAt: string;
    narrator: {
      url: string;
    } | null;
    user: {
      email: string;
      username: string;
    } | null;
    tags: {
      id: number;
      title: string;
      slug: string;
    }[];
    category: {
      id: number;
      slug: string;
      title: string;
    };
    featured_image: {
      id: number;
      width: number;
      height: number;
      url: string;
    };
    slide_image:
      | {
          id: number;
          width: number;
          height: number;
          url: string;
        }[]
      | null;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      total: number;
      pageCount: number;
    };
  };
};

/**
 * Fetches posts from the API.
 *
 * @param params - Parameters for the request.
 * @returns A promise that resolves to the posts data.
 */
export const getPosts = async (params: GetPostsParams) => {
  const res = await axios.get<GetPostsResult>('/api/posts/feed', { params });
  return {
    items: res.data.data.map(mapSavedPostToPost),
    hasNextPage: res.data.hasNextPage,
    endCursor: res.data.endCursor,
    totalCount: res.data.totalCount,
  };
};
