import { create } from 'zustand';
import { ReactNode } from 'react';
import { Comment } from '@/service/get-post-by-slug';

type SidebarState = {
  isOpen: boolean;
  content: ReactNode | null;
  openSidebar: (content: ReactNode) => void;
  closeSidebar: () => void;

  comments: Comment[];
  setComments: (comments: Comment[]) => void;
  addComment: (comment: Comment) => void;
  removeComment: (id: string) => void;
  updateComment: (comment: Comment) => void;
  updateCommentScore: (id: string, score: number) => void;

  pinnedComment: Comment | null;
  setPinnedComment: (comment: Comment | null) => void;
  clearPinnedComment: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  isOpen: false,
  content: null,
  openSidebar: (content) => set({ isOpen: true, content }),
  closeSidebar: () => set({ isOpen: false, content: null }),

  comments: [],
  setComments: (comments) => set({ comments }),
  addComment: (newComment) => set((state) => ({ comments: [newComment, ...state.comments] })),
  removeComment: (id) =>
    set((state) => ({
      comments: state.comments.filter((c) => c.id !== id),
      pinnedComment: state.pinnedComment?.id === id ? null : state.pinnedComment,
    })),
  updateCommentScore: (id, score) =>
    set((state) => ({
      comments: state.comments.map((c) => (c.id === id ? { ...c, netScore: score } : c)),
    })),
  updateComment: (updatedComment) =>
    set((state) => ({
      comments: state.comments.map((c) => (c.id === updatedComment.id ? updatedComment : c)),
      pinnedComment: state.pinnedComment?.id === updatedComment.id ? updatedComment : state.pinnedComment,
    })),

  pinnedComment: null,
  setPinnedComment: (comment) => set({ pinnedComment: comment }),
  clearPinnedComment: () => set({ pinnedComment: null }),
}));
