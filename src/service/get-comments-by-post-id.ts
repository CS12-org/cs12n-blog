import axios from '@/lib/axios';
import { Comment } from '@/service/get-post-by-slug';

type PostQueryParams = {};
type GetPostCommentsByPostIdReq = {
  postId: string;
  params?: PostQueryParams;
  cursor?: string | null;
};
export type GetPostCommentsByPostIdRes = {
  items: Comment[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string;
};

export const getPostCommentsByPostId = async ({
  postId,
  params,
  cursor,
}: GetPostCommentsByPostIdReq): Promise<GetPostCommentsByPostIdRes> => {
  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid postId: postId must be a non-empty string');
  }
  try {
    const response = await axios.get<GetPostCommentsByPostIdRes>(`/api/comments/by-post/${postId}`, {
      params: { previousCursor: cursor, pageSize: 10, ...params },
    });
    return response.data;
  } catch (err: any) {
    console.error('Unexpected error:', err);
    throw new Error(`Failed to fetch post with slug ${postId}`);
  }
};
