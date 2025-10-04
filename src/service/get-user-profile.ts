import axios from '@/lib/axios';
export type GetUserProfileReq = {};

export type GetUserProfileRes = {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio?: string;          // 👈 null → undefined
  avatarUrl?: string;    // 👈 null → undefined
  coverUrl?: string;     // 👈 null → undefined
  website?: string;      // 👈 null → undefined
  createdAt: string;
  socialUrls?: string[];
  selectedColor?: string; // 👈 اضافه شد
};

// -----------------------------
// API function
// -----------------------------
export const getUserProfile = async (
  params: GetUserProfileReq,
): Promise<GetUserProfileRes> => {
  try {
    const response = await axios.get<GetUserProfileRes>('/api/user-profile', { params });
    const data = response.data;

    // -----------------------------
    // Normalization: null → undefined
    // -----------------------------
    return {
      ...data,
      bio: data.bio ?? undefined,
      avatarUrl: data.avatarUrl ?? undefined,
      coverUrl: data.coverUrl ?? undefined,
      website: data.website ?? undefined,
      selectedColor: data.selectedColor ?? undefined,
    };
  } catch (err: unknown) {
    console.log(err);
    throw new Error('خطا در دریافت پروفایل کاربر');
  }
};
