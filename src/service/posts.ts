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
};

/**
 * Fetch a single post by slug
 */
export const getPostBySlug = async (slug: string): Promise<Post> => {
  try {
    const res = await axios.get(`/api/posts/get-by-id/${slug}`);
    return res.data;
  } catch (err: any) {
    console.error("خطا در گرفتن پست:", err.response?.status, err.response?.data);
    throw new Error("خطا در گرفتن پست");
  }
};
