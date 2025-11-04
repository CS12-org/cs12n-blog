'use client';

import { MenuTrigger, Button, Popover, ListBox, ListBoxItem } from 'react-aria-components';
import ThreeDotts from '@/assets/images/dots-horizontal.svg';
import { useState, useEffect, useRef } from 'react';
import ExclamationMark from '@/assets/images/excalamation.svg';
import { useLoginModalContext } from '../providers/login-modal-provider';

export type PostOptionsList = {
  id: number;
  title: string;
  action?: () => void;
};

type PostOptionsProps = {
  list: PostOptionsList[];
  onBeforeOpen?: () => boolean | void;
};

export function PostOptions({ list, onBeforeOpen }: PostOptionsProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PostOptionsList | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { openLoginModalIfUnauthenticated } = useLoginModalContext();

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

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [confirmOpen]);

  return (
    <div className="relative">
      <MenuTrigger
        isOpen={menuOpen}
        onOpenChange={(open) => {
          openLoginModalIfUnauthenticated(() => {
            setMenuOpen(open);
          });
        }}
      >
        <Button className="ms-auto rounded-md transition" aria-label="More options">
          <ThreeDotts className="ms-auto" />
        </Button>

        <Popover className="relative z-50 -mx-3 mt-3 rounded-lg border border-[#333] bg-[#1a1b2e] shadow-lg md:mx-2">
          {list.map((l) => (
            <div key={l.id} className="relative">
              <ListBox className="text-maroon w-fit px-6 py-2">
                <ListBoxItem
                  className="cursor-pointer text-end"
                  onAction={() => {
                    setSelectedItem(l);
                    setConfirmOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  {l.title}
                </ListBoxItem>
              </ListBox>
            </div>
          ))}
        </Popover>
      </MenuTrigger>

      {confirmOpen && (
        <div
          ref={modalRef}
          className="absolute top-full left-0 z-[40] -mx-3 w-fit md:-mx-0"
          aria-label="Confirm delete"
        >
          <div className="w-86 shadow-2xl">
            <div className="bg-mantle flex items-center justify-between rounded-t-2xl p-3">
              <p className="text-sm">مطمئنی می‌خوای حذف کنی؟</p>

              <div className="bg-base rounded-md p-2 shadow-2xl">
                <ExclamationMark fill="#EE99A0" className="size-4" />
              </div>
            </div>

            <div className="bg-base flex justify-start gap-x-3 rounded-b-2xl p-3 text-[16px] font-bold text-black">
              <Button className="bg-maroon rounded-md px-7 py-1.5" onPress={() => setConfirmOpen(false)}>
                نه
              </Button>

              <Button
                className="bg-sapphire rounded-md px-7 py-1.5"
                onPress={() => {
                  selectedItem?.action?.();
                  setConfirmOpen(false);
                }}
              >
                آره
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
