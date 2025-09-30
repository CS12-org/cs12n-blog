'use client';
import { useEffect, useRef, useState } from 'react';
import CopyLink from '@/assets/images/link-round-angle.svg';
import Linkedin from '@/assets/images/linkedin.svg';
import Share from '@/assets/images/share3circle.svg';
import Telegram from '@/assets/images/telegram.svg';
import Twitter from '@/assets/images/twitterx.svg';

export default function SharePopoverButton() {
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

  return (
    <div className="relative inline-block">
      {/* دکمه trigger */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="border-surface-0 bg-base flex h-[30px] w-[30px] items-center justify-center rounded-[10px] border lg:h-[48px] lg:w-[48px]"
        aria-haspopup="true"
        aria-expanded={isVisible}
      >
        <Share className="text-overlay-1 h-[27px] font-extrabold" />
      </button>

      {/* Popover بالای سمت چپ دکمه بدون فلش */}
      {isVisible && (
        <div
          ref={menuRef}
          className="text-text border-base absolute -right-1/4 bottom-full z-50 mb-2 flex gap-[15px] rounded-[10px] border bg-[#050615] px-[20px] py-[10px] text-[12px] shadow-lg"
          role="menu"
        >
          <button className="flex items-center gap-[3px]" role="menuitem" aria-label="هایلایت متن انتخاب شده">
            <Telegram className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
          </button>

          <button className="flex items-center gap-[3px]" role="menuitem" aria-label="کامنت روی متن انتخاب شده">
            <CopyLink className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
          </button>

          <button
            className="flex items-center gap-[3px]"
            role="menuitem"
            aria-label="گذاشتن یادداشت روی متن انتخاب شده"
          >
            <Linkedin className="h-[24px] w-[24px] lg:h-[28px] lg:w-[28px]" />
          </button>

          <button className="flex" role="menuitem" aria-label="خواندن کامنت‌ها">
            <Twitter />
          </button>
        </div>
      )}
    </div>
  );
}
