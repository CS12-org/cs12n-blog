import axios from '@/lib/axios';
export type PostUploadAvatarReq = {
  image: File;
};
export type PostUploadAvatarRes = { message: string };
export const postUploadAvatar = async (req: PostUploadAvatarReq): Promise<PostUploadAvatarRes> => {
  const formData = new FormData();
  formData.append('image', req.image);
  try {
    const response = await axios.post<PostUploadAvatarRes>('/user-profile/upload-avatar', formData);
    return response.data;
  } catch (err: unknown) {
    throw new Error('خطا در آپلود پروفایل');
  }
};
