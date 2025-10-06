import { create } from 'zustand';
import { ReactNode } from 'react';

type SidebarState = {
  isOpen: boolean;
  content: ReactNode | null;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  content: null,
  openSidebar: (content) => set({ isOpen: true, content }),
  closeSidebar: () => set({ isOpen: false, content: null }),
}));
