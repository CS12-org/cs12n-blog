import axios from "~/lib/axios";

/**
 * Parameters for the getPosts function.
 */
type GetPostsParams = {
  page: number;
  pageSize: number;
};

/**
 * Result of the getPosts function.
 * This response is paginated.
 */
type GetPostsResult = {
  data: {
    id: number;
    documentId: string;
    claps: number;
    content: string;
    title: string;
    tags: {
      id: number;
      documentId: string;
      title: string;
      slug: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
    }[];
    category: null;
    user: {
      id: number;
      documentId: string;
      username: string;
      email: string;
      provider: string;
      password: string;
      resetPasswordToken: string | null;
      confirmationToken: string | null;
      confirmed: true;
      blocked: false;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
    };
    featured_image: {
      id: number;
      documentId: string;
      name: string;
      alternativeText: string | null;
      caption: null;
      width: number;
      height: number;
      formats: unknown;
      hash: string;
      ext: string;
      mime: string;
      size: number;
      url: string;
      previewUrl: string | null;
      provider: string;
      provider_metadata: unknown;
      folderPath: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string | null;
    };
    narrator: unknown;
    slide_image: unknown;
  }[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
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
