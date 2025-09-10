import { createStore } from 'zustand/vanilla';

export type MainLayoutState = {
  isSideBarOpen: boolean;
};

export type MainLayoutActions = {
  toggleIsSideBarOpen: VoidFunction;
};

export type MainLayoutStore = MainLayoutState & MainLayoutActions;

export const createLayoutStore = () => {
  return createStore<MainLayoutStore>()((set) => ({
    isSideBarOpen: false,
    toggleIsSideBarOpen: () => set((state) => ({ isSideBarOpen: !state.isSideBarOpen })),
  }));
};
