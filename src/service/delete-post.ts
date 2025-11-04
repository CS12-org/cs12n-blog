import axios from '@/lib/axios';

export interface DeletePostResponse {
  success: boolean;
  message?: string;
}

export async function deletePost(postId: string) {
  try {
    const res = await axios.delete(`/api/posts/${postId}`);
    return res.data;
  } catch (error: any) {
    console.error('Error deleting post:', error);
    throw new Error(error?.response?.data?.message || 'خطا در حذف پست');
  }
}
