'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '~/lib/axios';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';
import { GetPostsResult } from '~/service/posts';

interface PostClapData {
  count: number;
  totalCount: number;
}

interface UseClapProps {
  postId: string;
  maxClicks?: number;
}

export function useClap({ postId, maxClicks = 5 }: UseClapProps) {
  const { status } = useSession();
  const queryClient = useQueryClient();
  const [localClickCount, setLocalClickCount] = useState(0);

  const mutation = useMutation({
    mutationFn: async (value: { count: number }) => {
      const res = await axios.post<PostClapData>(`/clap`, { postId, count: value.count });
      return res.data;
    },
    onMutate: () => {
      if (status !== 'authenticated') return;
      const previous = queryClient.getQueryData<PostClapData>(['post', postId]);
      setLocalClickCount((prev) => prev + 1);
      return previous;
    },
    onError: (_err, _vars, context) => {
      if (context) queryClient.setQueryData(['post', postId], context);
      setLocalClickCount((prev) => Math.max(0, prev - 1));
    },
    onSuccess: (data: PostClapData) => {
      queryClient.setQueriesData<GetPostsResult['items']>({ exact: false, queryKey: ['posts'] }, (old) => {
        return old?.map((post: GetPostsResult['items'][number]) => {
          if (post.id === postId) {
            return { ...post, claps: data.totalCount };
          }
          return post;
        });
      });
      setLocalClickCount(0);
    },
  });

  const handleClap = (count: number) => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }

    // const data = queryClient.getQueryData<PostClapData>(['post', postId]);
    const currentUserClap = (data?.count ?? 0) + localClickCount;

    if (currentUserClap >= maxClicks) return;

    if (!mutation.isPending) mutation.mutate({ count });
  };

  const data = queryClient.getQueryData<PostClapData>(['post', postId]);
  const clap = (data?.count ?? 0) + localClickCount;
  const userClapCount = (data?.count ?? 0) + localClickCount;

  return {
    clap,
    userClapCount,
    maxClicks,
    handleClap,
    isMutating: mutation.isPending,
  };
}
