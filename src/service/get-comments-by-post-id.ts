import axios from '~/lib/axios';

type PostQueryParams = {};
type GetPostCommentsByPostIdReq = {
  postId: string;
  params?: PostQueryParams;
};
type GetPostCommentsByPostIdRes = Comment[];

export const getPostCommentsByPostId = async ({
  postId,
  params,
}: GetPostCommentsByPostIdReq): Promise<GetPostCommentsByPostIdRes> => {
  if (!postId || typeof postId !== 'string') {
    throw new Error('Invalid postId: postId must be a non-empty string');
  }
  try {
    const response = await axios.get<GetPostCommentsByPostIdRes>(`/comments/post/${postId}`, {
      params,
    });
    return response.data;
  } catch (err: any) {
    console.error('Unexpected error:', err);
    throw new Error(`Failed to fetch post with slug ${postId}`);
  }
};
