import axios from '@/lib/axios';
export type PutUserProfileReq = {
  username: string;
  fullName: string;
  bio: string;
  selectedColor?: string;
  skills?: string[];
};
export type PutUserProfileRes = object;
export const putUserProfile = (body: PutUserProfileReq) => axios.put<PutUserProfileRes>('/api/user-profile', body);
