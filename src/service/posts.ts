import axios from "~/lib/axios";

/**
 * Parameters for the getPosts function.
 */
export type GetPostsParams = {
  page: number;
  pageSize: number;
};

/**
 * Result of the getPosts function.
 * This response is paginated.
 */
export type GetPostsResult = {
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
export const getPosts = (params: GetPostsParams) =>
  axios.get<GetPostsResult>("/api/posts/feed", { params });
