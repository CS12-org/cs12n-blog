'use client';

import { useState, useRef, useEffect, forwardRef } from 'react';
import ThreeDotts from '@/assets/images/threeDotts.svg';
import Repead from '@/assets/images/repeat-one.svg';
import Trash from '@/assets/images/trash.svg';
import Survey from '@/assets/images/survey.svg';

export default function ThreeDotPopover() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsVisible((prev) => !prev);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setIsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const ThreeDottsButton = forwardRef<HTMLButtonElement, { onClick: () => void }>(({ onClick }, ref) => (
    <button ref={ref} onClick={onClick} className="p-[5px]" aria-haspopup="true">
      <ThreeDotts className="h-[4px] w-[22px]" />
    </button>
  ));
  ThreeDottsButton.displayName = 'ThreeDottsButton';

  return (
    <div className="relative inline-block">
      <ThreeDottsButton onClick={toggleMenu} ref={buttonRef} />

      {isVisible && (
        <section
          ref={menuRef}
          className="text-text absolute bottom-full left-0 z-50 mb-[20px] flex h-auto w-[140px] flex-col justify-start gap-[15px] rounded-[10px] bg-[#101122] px-[10px] py-[12px] text-[12px]"
          role="menu"
        >
          <button className="flex gap-[7px]">
            <Repead className="h-[20px] w-[20px]" fill="#A5ADCB" /> از سرگیری دوره{' '}
          </button>
          <button className="flex items-center gap-[7px]">
            {' '}
            <Trash className="stroke-subtext-0 h-[25px] w-[25px] font-bold" />
            پاک کردن دوره{' '}
          </button>
          <button className="flex gap-[7px]">
            <Survey /> نظرسنجی
          </button>
        </section>
      )}
    </div>
  );
}
