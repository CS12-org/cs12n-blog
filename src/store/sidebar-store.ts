import { create } from 'zustand';
import { ReactNode } from 'react';
import { Comment } from '@/service/get-post-by-slug';

type SidebarState = {
  // Sidebar toggle
  isOpen: boolean;
  content: ReactNode | null;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;

  // Comments management
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  removeComment: (id: string) => void;
  updateCommentScore: (id: string, score: number) => void;

  // Pinned comment management
  pinnedComment: Comment | null;
  setPinnedComment: (comment: Comment | null) => void;
  clearPinnedComment: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  // Sidebar toggle
  isOpen: false,
  content: null,
  openSidebar: (content) => set({ isOpen: true, content }),
  closeSidebar: () => set({ isOpen: false, content: null }),

  // Comments management
  comments: [],
  setComments: (comments) => set({ comments }),
  removeComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
      pinnedComment: state.pinnedComment?.id === id ? null : state.pinnedComment,
    })),
  updateCommentScore: (id, score) =>
    set((state) => ({
      comments: state.comments.map((c) => (c.id === id ? { ...c, netScore: score } : c)),
    })),

  // Pinned comment management
  pinnedComment: null,
  setPinnedComment: (comment) => set({ pinnedComment: comment }),
  clearPinnedComment: () => set({ pinnedComment: null }),
}));
