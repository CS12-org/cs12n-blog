'use client';
import { useEffect } from 'react';
import { GetUserProfileRes } from '~/service/get-user-profile';
import { useUserStore } from '~/store/user-store';

export function UserInitializer({ userProfile }: { userProfile: GetUserProfileRes | null }) {
  const setUserProfile = useUserStore((s) => s.setUserProfile);

  useEffect(() => {
    if (userProfile) setUserProfile(userProfile);
  }, [userProfile, setUserProfile]);

  return null;
}