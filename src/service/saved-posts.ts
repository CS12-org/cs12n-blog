import axios from "~/lib/axios";

export async function fetchSavedPosts(pageParam: number | null) {
  const page = pageParam ?? 1;
  const res = await axios.get(`/api/saved-posts?page=${page}&limit=10`);
  
  return {
    items: res.data.items,      
    hasNextPage: res.data.hasNextPage, 
    endCursor: page + 1,
  };
}
