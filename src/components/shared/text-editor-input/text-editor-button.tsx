import React, { FC, ReactNode } from 'react';
import { twJoin } from 'tailwind-merge';
type TextEditorButtonProps = { onClick: () => void; className: string; children: ReactNode };
export const TextEditorButton: FC<TextEditorButtonProps> = ({ onClick, className, children }) => {
  return (
    <button
      onClick={onClick}
      className={twJoin(className, 'bg-surface-0 m-auto flex h-7 w-7 items-center justify-center rounded-lg')}
    >
      {children}
    </button>
  );
};
