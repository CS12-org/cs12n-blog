import axios from '@/lib/axios';
export type PutUserProfileReq = {
  username: string;
  fullName: string;
  bio: string;
  selectedColor?: string;
  skills?: string[];
  socialUrls?: string[];
};
export type PutUserProfileRes = object;
export const putUserProfile = (body: Partial<PutUserProfileReq>) =>
  axios.put<PutUserProfileRes>('/api/user-profile', body);
