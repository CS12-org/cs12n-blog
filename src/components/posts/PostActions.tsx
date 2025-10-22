'use client';

import { LoginModal } from '@/components/auth/login-modal';
import { useLoginModal } from '@/hooks/use-login-modal';
import ClapButton from './clap-button';

type Props = {
  postId: string;
};

export default function PostActions({ postId }: Props) {
  const { isOpen, openModal, closeModal } = useLoginModal();

  return (
    <div className="flex justify-between px-[10px] py-[10px] lg:px-[30px]">
      <ClapButton
        postId={postId}
        userClapCount={0}
        count={0}
        isOpen={isOpen}
        openLoginModal={openModal}
        closeLoginModal={closeModal}
      />
      <LoginModal isOpen={isOpen} onClose={closeModal} />
    </div>
  );
}
