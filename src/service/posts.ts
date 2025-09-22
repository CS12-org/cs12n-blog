import axios from '~/lib/axios';
export type FeaturedImage = {
  width: number;
  height: number;
  url: string;
};
export type Post = {
  id: number;
  title: string;
  clap: number;
  slug: string;
  description: string;
  narrator: string | null;
  featured_image: FeaturedImage | null;
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
