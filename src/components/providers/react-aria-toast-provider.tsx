'use client';
import { Button, Text } from 'react-aria-components';
import {
  UNSTABLE_Toast as Toast,
  UNSTABLE_ToastContent as ToastContent,
  UNSTABLE_ToastQueue as ToastQueue,
  UNSTABLE_ToastRegion as ToastRegion,
} from '../react-aria-components';
interface MyToastContent {
  title: string;
  description?: string;
}
export const queue = new ToastQueue<MyToastContent>();

const ReactAriaToastProvider = () => {
  return (
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
  );
};

export default ReactAriaToastProvider;
