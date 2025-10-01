'use client';

import { queue } from '@/components/providers/react-aria-toast-provider';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

type Action<T, U> = (...args: U[]) => PromiseLike<T> | T;

function useProtectedAction<T, U>(action: Action<T, U>) {
  const session = useSession();
  const router = useRouter();

  const callback = useCallback(
    async (...args: U[]) => {
      if (session.status === 'authenticated') return await action(...args);
      if (session.status === 'loading') return null;

      queue.add({
        title: 'ورود به حساب',
        description: 'این قابلیت فقط بعد از ورود به حساب در دسترسه.',
      });
      router.push('/login');

      return null;
    },
    [action, session],
  );

  return callback;
}

export default useProtectedAction;
