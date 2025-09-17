import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from '~/lib/axios';

interface SavePostBody {
  postId: string;
}

export function useSavePost(postId: string) {
  const queryClient = useQueryClient();

  const saveMutation = useMutation<void, unknown, SavePostBody>({
    mutationFn: async () => {
      await axios.post(`/saved-posts`, { postId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  const unsaveMutation = useMutation<void, unknown, SavePostBody>({
    mutationFn: async () => {
      await axios.delete(`/saved-posts/${postId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['saved-posts'] });
      queryClient.invalidateQueries({ queryKey: ['post', postId] });
    },
  });

  return { saveMutation, unsaveMutation };
}
