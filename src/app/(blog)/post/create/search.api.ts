import axios from '@/lib/axios';

export const searchTags = async (q: string) => {
  try {
    const response = await axios.get(`/api/tags/search?q=${encodeURIComponent(q)}`);
    return response.data;
  } catch {
    return { items: [] };
  }
};
