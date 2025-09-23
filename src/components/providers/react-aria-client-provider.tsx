'use client';

import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';
import { RouterProvider } from '~/components/react-aria-components';
import {
  Button,
  Text,
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from 'react-aria-components';
declare module 'react-aria-components' {
  interface RouterConfig {
    routerOptions: NonNullable<Parameters<ReturnType<typeof useRouter>['push']>[1]>;
  }
}
interface MyToastContent {
  title: string;
  description?: string;
}
export const queue = new ToastQueue<MyToastContent>();

type Props = { children: ReactNode };

function ReactAriaClientProvider(props: Props) {
  const { children } = props;
  const router = useRouter();
  return (
    <RouterProvider navigate={router.push}>
      <ToastRegion queue={queue}>
        {({ toast }) => (
          <Toast toast={toast} className="gap-1np absolute bottom-3.5 left-3.5 flex">
            <Button slot="close">X</Button>
            <ToastContent>
              <Text slot="title" className="text-label-sm">
                {toast.content.title}
              </Text>
            </ToastContent>
          </Toast>
        )}
      </ToastRegion>
      {children}
    </RouterProvider>
  );
}

export default ReactAriaClientProvider;
