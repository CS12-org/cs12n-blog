import axios from '~/lib/axios';

export type PostCommentBody = {
  content: string;
  postId: string;
  parentId: string;
  quotedText: string;
  quotedStartIndex: number;
  quotedEndIndex: number;
};
export type PostCommentReq = { body: PostCommentBody };
export type PostCommentRes = {};

export const postComment = (body: PostCommentReq) => axios.post<PostCommentRes>('/comments', body);
