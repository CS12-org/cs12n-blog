import axios from '~/lib/axios';
export type PutUserProfileReq = {
  username: string;
  fullName: string;
  bio: string;
  website: string;
};
export type PutUserProfileRes = {};
export const putUserProfile = (body: PutUserProfileReq) =>
  axios.put<PutUserProfileRes>('/api/user-profile', body);
