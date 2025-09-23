import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "~/lib/axios";
import { useState } from "react";

export type Post = {
  id: number;
  title: string;
  slug: string;
  description: string;
  clap: number;           // مجموع کل کلب
  userClapCount: number;  // کلب‌های زده شده توسط کاربر
  user?: {
    username: string;
    email: string;
    avatarUrl?: string;
  };
};

type Props = {
  postId: number;
  slug: string;
  data?: Post;
};

export function useClap({ postId, slug, data }: Props) {
  const queryClient = useQueryClient();
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 5;

  // گرفتن اطلاعات پست
  const { data: post, isLoading } = useQuery<Post>({
    queryKey: ["post", slug],
    initialData: data,
    queryFn: async () => {
      const res = await axios.get<Post>(`/api/posts/get-by-slug/${slug}`);
      return {
        ...res.data,
        clap: res.data.clap ?? 0,
        userClapCount: res.data.userClapCount ?? 0,
      };
    },
  });

  // mutation برای ثبت کلب
  const mutation = useMutation({
    mutationFn: async (count: number) => {
      const res = await axios.post("/api/posts/clap", {
        postId,
        count,
      });
      return res.data;
    },
    onMutate: async () => {
      setClickCount((prev) => prev + 1);

      // optimistic update
      const prevData = queryClient.getQueryData<Post>(["post", slug]);
      queryClient.setQueryData<Post>(["post", slug], (old) => {
        if (!old) return old;
        if (old.userClapCount >= maxClicks) return old;
        return {
          ...old,
          clap: old.clap + 1,
          userClapCount: old.userClapCount + 1,
        };
      });

      return prevData;
    },
    onError: (_err, _vars, context) => {
      setClickCount((prev) => prev - 1);
      if (context) queryClient.setQueryData(["post", slug], context);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["post", slug], newData);
    },
  });

  const handleClap = () => {
    if ((post?.userClapCount ?? 0) < maxClicks) {
      mutation.mutate(1);
    }
  };

  return {
    clap: post?.clap ?? 0,
    userClapCount: post?.userClapCount ?? 0,
    handleClap,
    isLoading,
    maxClicks,
    clickCount,
  };
}
