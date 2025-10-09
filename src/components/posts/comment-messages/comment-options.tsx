'use client';

import { MenuTrigger, Button, Popover, ListBox, ListBoxItem, Dialog, DialogTrigger } from 'react-aria-components';
import ThreeDotts from '@/assets/images/dots-horizontal.svg';
import { useState } from 'react';
import { createPortal } from 'react-dom';

type CommentOptionsList = {
  id: number;
  title: string;
  pendingTitle: string;
  action?: () => void;
};

type CommentOptionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  pending: boolean;
  // other actions
};

export function CommentOptions({ onDelete, pending }: CommentOptionsProps) {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const list: CommentOptionsList[] = [
    {
      id: 1,
      title: 'حذف کامنت',
      pendingTitle: '... در حال حذف کامنت',
      action: onDelete,
    },
  ];

  return (
    <>
      <MenuTrigger>
        <Button className="ms-auto rounded-md transition" aria-label="More options">
          <ThreeDotts className="ms-auto" />
        </Button>

        <Popover className="z-50 rounded-lg border border-[#333] bg-[#1a1b2e] p-2 shadow-lg">
          <ListBox className="min-w-32 rounded-2xl bg-[#101122] px-6 py-3">
            {list.map((l) => (
              <ListBoxItem className="cursor-pointer text-end" key={l.id} onAction={() => setConfirmOpen(true)}>
                {pending ? l.pendingTitle : l.title}
              </ListBoxItem>
            ))}
          </ListBox>
        </Popover>
      </MenuTrigger>

      <DialogTrigger isOpen={confirmOpen} onOpenChange={setConfirmOpen}>
        <Button className="hidden" />
        <Popover placement="top" className="z-[9999] rounded-lg border border-[#333] bg-[#1a1b2e] p-4 shadow-xl">
          <Dialog>
            <p className="mb-3 text-center text-sm text-white">مطمئنی می‌خوای حذف کنی؟</p>
            <div className="flex justify-between gap-2">
              <Button
                className="w-1/2 rounded-md bg-red-500 px-3 py-1 text-sm font-bold text-white hover:bg-red-600"
                onPress={() => {
                  onDelete?.();
                  setConfirmOpen(false);
                }}
              >
                بله
              </Button>
              <Button
                className="w-1/2 rounded-md bg-gray-700 px-3 py-1 text-sm font-bold text-white hover:bg-gray-600"
                onPress={() => setConfirmOpen(false)}
              >
                خیر
              </Button>
            </div>
          </Dialog>
        </Popover>
      </DialogTrigger>
    </>
  );
}
