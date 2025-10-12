import axios from '@/lib/axios';

export interface DeleteReplayResponse {
  success: boolean;
  message?: string;
}

export async function deleteReply(commentId: string) {
  try {
    const res = await axios.delete(`/api/comments/${commentId}`);
    return res.data;
  } catch (error: any) {
    console.error('Error deleting reply:', error);
    throw new Error(error?.response?.data?.message || 'خطا در حذف کامنت');
  }
}
