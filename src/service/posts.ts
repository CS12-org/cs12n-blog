import axios from '~/lib/axios';

export type Post = {
  id: number;
  title: string;
  clap: number;
    userClapCount: number;
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
  clap: item.claps ?? 0,            
  userClapCount: item.userClapCount ?? 0,
  narrator: null,
  featured_image: item.featuredImage
    ? {
        width: item.featuredImage.width,
        height: item.featuredImage.height,
        url: item.featuredImage.url,
      }
    : null,
  user: item.user
    ? {
        email: item.user.email ?? '',
        username: item.user.username ?? '',
        avatarUrl: item.user.profile?.avatarUrl ?? undefined,
        bio: item.user.profile?.bio ?? undefined,
      }
    : null,
});

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
    userClaps?: number;
    contentText: string;
    status: string;
    user: {
      id: string;
      profile: {
        user: string;
        fullName: null | string;
        bio: null | string;
        avatarUrl: null | string;
        coverUrl: null | string;
        website: null | string;
      };
    };
    tags: { id: string; name: string; slug: string }[];
    isSavedByCurrentUser: boolean;
    averageRating: unknown;
  }[];
  total: number;
}

/**
 * Fetches posts from the API.
 *
 * @param params - Parameters for the request.
 * @returns A promise that resolves to the posts data.
 */
export const getPosts = (params: GetPostsParams) => {
  return axios.get<GetPostsResult>('/posts/feed', { params });
};
