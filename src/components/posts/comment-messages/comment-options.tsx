'use client';

import { MenuTrigger, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import ThreeDotts from '@/assets/images/dots-horizontal.svg';
import { useState, useEffect, useRef } from 'react';

export type CommentOptionsList = {
  id: number;
  title: string;
  pendingTitle: string;
  action?: () => void;
  pending?: boolean;
};

type CommentOptionsProps = {
  list: CommentOptionsList[];
};

export function CommentOptions({ list }: CommentOptionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);

  // 🔹 بستن مودال با کلیک بیرون از آن
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setConfirmOpen(false);
      }
    };

    if (confirmOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [confirmOpen]);

  return (
    <MenuTrigger>
      <Button className="ms-auto rounded-md transition" aria-label="More options">
        <ThreeDotts className="ms-auto" />
      </Button>

      <Popover className="relative z-50 rounded-lg border border-[#333] bg-[#1a1b2e] p-2 shadow-lg">
        {list.map((l) => (
          <div key={l.id} className="relative">
            <ListBox className="min-w-32 rounded-lg bg-[#101122] px-6 py-3">
              <ListBoxItem className="cursor-pointer text-end" onAction={() => setConfirmOpen(true)}>
                {l.pending ? l.pendingTitle : l.title}
              </ListBoxItem>
            </ListBox>

            {confirmOpen && (
              <div
                ref={modalRef}
                className="absolute top-full right-0 z-[40] mt-2 w-[220px]"
                aria-label="Confirm delete"
              >
                <div className="rounded-lg border border-[#333] bg-[#1a1b2e] p-4 shadow-xl">
                  <p className="mb-3 text-center text-sm text-white">مطمئنی می‌خوای حذف کنی؟</p>
                  <div className="flex justify-between gap-2">
                    <Button
                      className="w-1/2 rounded-md bg-red-800 px-3 py-1 text-sm font-bold text-white hover:bg-red-600"
                      onPress={() => {
                        l.action?.();
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
                </div>
              </div>
            )}
          </div>
        ))}
      </Popover>
    </MenuTrigger>
  );
}
