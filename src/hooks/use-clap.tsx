import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from '~/lib/axios';
import { Post } from '~/service/posts';
import { useState } from 'react';

type Props = {
  postId: number;
  slug: string;
  data: Post;
};

export function useClap({ postId, slug, data }: Props) {
  const queryClient = useQueryClient();
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 5;

  const { data: post, isLoading } = useQuery({
    initialData: data,
    queryKey: ['post', slug],
    queryFn: () => axios.get<Post>(`/api/posts/get-by-slug/${slug}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (postId: number) => axios.post(`/api/posts/add-clap/${postId}`, {}).then((res) => res.data),
    onMutate: async () => {
      setClickCount((prev) => prev + 1);

      return queryClient.setQueryData<Post>(['post', slug], (old) => {
        if (!old) return old;
        return { ...old, clap: old.clap + 1 };
      });
    },
    onError: (_1, _2, ctx) => {
      setClickCount((prev) => prev - 1);
      queryClient.setQueryData(['post', slug], ctx);
    },
  });

  const handleClap = () => {
    if (clickCount < maxClicks) {
      mutation.mutate(postId);
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
