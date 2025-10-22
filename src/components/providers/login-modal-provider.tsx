'use client';

import { useSession } from 'next-auth/react';
import { createContext, ReactNode, useCallback, useContext, useState } from 'react';
import { LoginModal } from '../auth/login-modal';

type ContextType = {
  openLoginModal: () => void;
  closeLoginModal: () => void;
  openLoginModalIfUnauthenticated: (action: () => void | Promise<void>) => void;
};

const LoginModalContext = createContext<ContextType | null>(null);

export function LoginModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  const openLoginModal = useCallback(() => setIsOpen(true), []);
  const closeLoginModal = useCallback(() => setIsOpen(false), []);

  const openLoginModalIfUnauthenticated = useCallback(
    async (action: () => void | Promise<void>) => {
      if (status === 'loading') return;

      if (!session) {
        setIsOpen(true);
        return;
      }

      await action();
    },

    [status, session],
  );

  return (
    <LoginModalContext.Provider value={{ openLoginModal, closeLoginModal, openLoginModalIfUnauthenticated }}>
      {children}
      <LoginModal isOpen={isOpen} onClose={closeLoginModal} />
    </LoginModalContext.Provider>
  );
}

export const useLoginModalContext = () => {
  const ctx = useContext(LoginModalContext);

  if (!ctx) throw new Error('useLoginModalContext must be withing LoginModalProvider');

  return ctx;
};
