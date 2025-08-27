import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "~/lib/axios";
import { Post } from "~/service/posts";
import { useState } from "react";

export function useClap({ postId, slug }: { postId: number; slug: string }) {
  const queryClient = useQueryClient();
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 5;

 
  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", slug],
    queryFn: async () => {
      const res = await axios.get(`/api/posts/get-by-slug/${slug}`);
      return res.data.data;
    },
  });


  const mutation = useMutation({
    mutationFn: async () => {
      const res = await axios.post(`/api/posts/add-clap/${postId}`, {});
      return res.data;
    },
    onMutate: async () => {
      setClickCount((prev) => prev + 1);

    
      queryClient.setQueryData<Post>(["post", slug], (old) => {
        if (!old) return old as Post;
        return { ...old, clap: old.clap + 1 };
      });
    },
    onError: () => {
      setClickCount((prev) => prev - 1);
      queryClient.invalidateQueries({ queryKey: ["post", slug] });
    },
    onSuccess: (newData) => {
      queryClient.setQueryData<Post>(["post", slug], newData);
    },
  });

  const handleClap = () => {
    if (clickCount < maxClicks) {
      mutation.mutate();
    }
  };

  return {
    clap: post?.clap ?? 0,
    isLoading,
    handleClap,
    clickCount,
    maxClicks,
  };
}
