import axios from "~/lib/axios";

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

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const res = await axios.get(`/api/posts/get-by-slug/${slug}`);
    return res.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error("خطا در گرفتن پست");
  }
};

// ----------------------------------------------------------------------------

export type GetPostsParams = {
  page: number;
  pageSize: number;
};

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
