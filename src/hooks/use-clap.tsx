'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '~/lib/axios';
import { useState } from 'react';
import { useSession, signIn } from 'next-auth/react';

interface PostClapData {
  claps: number;
  userClapCount: number;
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
    mutationFn: async () => {
      const res = await axios.post<PostClapData>(`/clap`);
      return res.data;
    },
    onMutate: () => {
      if (status !== 'authenticated') return;

      const previous = queryClient.getQueryData<PostClapData>(['post', postId]);

      queryClient.setQueryData<PostClapData>(['post', postId], (old) => {
        if (!old) return { claps: 1, userClapCount: 1 };
        return {
          claps: (old.claps ?? 0) + 1,
          userClapCount: (old.userClapCount ?? 0) + 1,
        };
      });

      setLocalClickCount((prev) => prev + 1);
      return previous;
    },
    onError: (_err, _vars, context) => {
      if (context) queryClient.setQueryData(['post', postId], context);
      setLocalClickCount((prev) => Math.max(0, prev - 1));
    },
    onSuccess: (data) => {
      queryClient.setQueryData<PostClapData>(['post', postId], data);
      setLocalClickCount(0);
    },
  });

  const handleClap = () => {
    if (status !== 'authenticated') {
      signIn();
      return;
    }

    const data = queryClient.getQueryData<PostClapData>(['post', postId]);
    const currentUserClap = (data?.userClapCount ?? 0) + localClickCount;

    if (currentUserClap >= maxClicks) return;

    if (!mutation.isPending) mutation.mutate();
  };

  const data = queryClient.getQueryData<PostClapData>(['post', postId]);
  const clap = (data?.claps ?? 0) + localClickCount;
  const userClapCount = (data?.userClapCount ?? 0) + localClickCount;

  return {
    clap,
    userClapCount,
    maxClicks,
    handleClap,
    isMutating: mutation.isPending,
  };
}
