import axios from "~/lib/axios";

/** ----------------------------
 * Types for paginated posts
 * ---------------------------- */
export type GetPostsParams = { page: number; pageSize: number };

export type GetPostsResult = {
  data: {
    id: number;
    description: string;
    title: string;
    content: string;
    clap: number;
    slug: string;
    createdAt: string;
    narrator: { url: string } | null;
    user: { email: string; username: string } | null;
    tags: { id: number; title: string; slug: string }[];
    category: { id: number; slug: string; title: string };
    featured_image: { id: number; width: number; height: number; url: string } | null;
    slide_image: { id: number; width: number; height: number; url: string }[] | null;
  }[];
  meta: {
    pagination: { page: number; pageSize: number; total: number; pageCount: number };
  };
};

/** Fetch paginated posts */
export const getPosts = (params: GetPostsParams) =>
  axios.get<GetPostsResult>("/api/posts/feed", { params });

export type PostItem = GetPostsResult["data"][0];

/** ----------------------------
 * Type for single post (simplified)
 * ---------------------------- */
export type Post = {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  clap: number;
  createdAt: string;
  narrator: string | null;
  featured_image: {
    id: number;
    documentId: string;
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
  tags: { id: number; documentId: string; title: string; slug: string }[];
  category: { id: number; documentId: string; slug: string; title: string };
  slide_image: {
    id: number;
    documentId: string;
    width: number;
    height: number;
    url: string;
  }[] | null;
};


export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const res = await axios.get(`/api/posts/get-by-slug/${slug}`);
    const apiData = res.data;

    if (apiData?.data) return apiData.data as Post;

    return apiData as Post;
  } catch (err: any) {
    console.error(" Error fetching post by slug:", err);
    return null;
  }
};
