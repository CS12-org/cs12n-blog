import axios from '~/lib/axios';

export type PostCommentBody = {
  content: string;
  postId: string;
  parentId?: string | null;
  quotedText?: string | null;
  quotedStartIndex?: number;
  quotedEndIndex?: number;
};
export type PostCommentReq = PostCommentBody;
export type PostCommentRes = {};

export const postComment = (body: PostCommentReq) => axios.post<PostCommentRes>('/comments', body);
