'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { RouterProvider } from '@/components/react-aria-components';

declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>;
  }
}

type Props = { children: ReactNode };

function ReactAriaClientProvider(props: Props) {
  const { children } = props;
  const router = useRouter();
  return <RouterProvider navigate={router.push}>{children}</RouterProvider>;
}

export default ReactAriaClientProvider;
