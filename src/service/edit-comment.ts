import axios from '@/lib/axios';

export type EditCommentBody = {
  content: string;
  parentId?: string | null;
  quotedText?: string | null;
  quotedStartIndex?: number;
  quotedEndIndex?: number;
};
export type EditCommentReq = EditCommentBody;
export type EditCommentRes = {};

export const editComment = async (editId: string, body: EditCommentReq): Promise<any> => {
  try {
    const res = await axios.put<EditCommentRes>(`/api/comments/${editId}`, body);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
