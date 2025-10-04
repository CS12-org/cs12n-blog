import axios from '@/lib/axios';
export type GetUserProfileReq = {};
export type GetUserProfileRes = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio: string | null;
  avatarUrl: string | null;
  coverUrl: string | null;
  website: string;
  createdAt: string;
};
export const getUserProfile = async (params: GetUserProfileReq): Promise<GetUserProfileRes> => {
  try {
    const response = await axios.get<GetUserProfileRes>('/api/user-profile', { params });
    return response.data;
  } catch (err: unknown) {
    console.log(err);
    throw new Error('خطا در دریافت پروفایل کاربر');
  }
};
