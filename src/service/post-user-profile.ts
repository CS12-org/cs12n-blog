import axios from '~/lib/axios';
export type PostUserProfileReq = {
  username: string;
  fullName: string;
  bio: string;
  website: string;
};
export type PostUserProfileRes = {};
export const postUserProfile = (body: PostUserProfileReq) => axios.post<PostUserProfileRes>('/api/user-profile', body);
