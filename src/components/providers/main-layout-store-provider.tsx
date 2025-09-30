'use client';

import { createContext, type ReactNode, useContext, useRef } from 'react';
import { useStore } from 'zustand';
import { createLayoutStore, type MainLayoutStore } from '@/store/main-layout-store';

type MainLayoutStoreApi = ReturnType<typeof createLayoutStore>;

const MainLayoutStoreContext = createContext<MainLayoutStoreApi | null>(null);

interface MainLayoutStoreProviderProps {
  children: ReactNode;
}

const MainLayoutStoreProvider = (props: MainLayoutStoreProviderProps) => {
  const { children } = props;
  const storeRef = useRef<MainLayoutStoreApi | null>(null);

  if (storeRef.current === null) {
    storeRef.current = createLayoutStore();
  }

  return <MainLayoutStoreContext value={storeRef.current}>{children}</MainLayoutStoreContext>;
};

const useMainLayoutStore = <T,>(selector: (store: MainLayoutStore) => T): T => {
  const layoutStoreContext = useContext(MainLayoutStoreContext);

  if (!layoutStoreContext) {
    throw new Error(`useMainLayoutStore must be used within MainLayoutStoreProvider`);
  }

  return useStore(layoutStoreContext, selector);
};

export { useMainLayoutStore, MainLayoutStoreProvider, MainLayoutStoreContext };
