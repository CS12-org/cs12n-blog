'use client';

import { createPortal } from 'react-dom';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { useSidebarStore } from '@/store/sidebar-store';

export function Sidebar() {
  const { isOpen, content, closeSidebar } = useSidebarStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return createPortal(
    <>
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50" onClick={closeSidebar} />}
      <div
        className={twJoin(
          'bg-base fixed top-0 right-0 z-50 h-full w-full px-2.5 py-8 shadow-lg transition-transform duration-300 ease-in-out lg:w-1/3',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        {content}
      </div>
    </>,
    document.body,
  );
}
