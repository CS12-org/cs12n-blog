// @/stores/user-store.ts
import { create } from 'zustand';
import { GetUserProfileRes } from '@/service/get-user-profile';

type UserStore = {
  userProfile: GetUserProfileRes | null;
  setUserProfile: (data: GetUserProfileRes | null) => void;
};

export const useUserStore = create<UserStore>((set) => ({
  userProfile: null,
  setUserProfile: (data) => set({ userProfile: data }),
}));
