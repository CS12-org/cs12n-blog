import axios from '@/lib/axios';
import { Comment } from '@/service/get-post-by-slug';

type PostQueryParams = {};
type GetCommentByParentIdReq = {
  parentId: string;
  params?: PostQueryParams;
  cursor?: string | null;
};
export type GetCommentByParentIdRes = {
  items: Comment[];
  totalCount: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  endCursor: string;
};

export const getCommentByParentId = async ({
  parentId,
  params,
  cursor,
}: GetCommentByParentIdReq): Promise<GetCommentByParentIdRes> => {
  if (!parentId || typeof parentId !== 'string') {
    throw new Error('Invalid parentId: parentId must be a non-empty string');
  }
  try {
    const response = await axios.get<GetCommentByParentIdRes>(`/comments/parent/${parentId}`, {
      params: { previousCursor: cursor, pageSize: 10, ...params },
    });
    return response.data;
  } catch (err: any) {
    console.error('Unexpected error:', err);
    throw new Error(`Failed to fetch comment with id: ${parentId}`);
  }
};
