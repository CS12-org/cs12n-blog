








"use client";
import { SlSocialLinkedin } from "react-icons/sl";
import { PiTelegramLogoDuotone } from "react-icons/pi";
import { FaXTwitter } from "react-icons/fa6";
import { useRef, useState, useEffect } from "react";
import { IoShareSocialOutline } from "react-icons/io5";
import Highlighter from "~/assets/images/highlighter.svg";
import Comments from "~/assets/images/comments.svg";
import Notes from "~/assets/images/notes.svg";
import Share from "~/assets/images/share3circle.svg"
import Telegram from "~/assets/images/telegram.svg"
import CopyLink from "~/assets/images/link-round-angle.svg"
import Linkedin from "~/assets/images/linkedin.svg"
import Twitter from "~/assets/images/twitterx.svg"


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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block">
      {/* دکمه trigger */}
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className="lg:h-[48px] lg:w-[48px] h-[30px] w-[30px] border border-surface-0 bg-base rounded-[10px] flex justify-center items-center"
        aria-haspopup="true"
        aria-expanded={isVisible}
      >
        <Share className="text-overlay-1 h-[27px] font-extrabold" />
      </button>

      {/* Popover بالای سمت چپ دکمه بدون فلش */}
      {isVisible && (
        <div
          ref={menuRef}
          className="absolute bottom-full -right-1/4 mb-2 bg-[#050615] shadow-lg rounded-[10px] py-[10px] px-[20px] text-[12px] text-text flex gap-[15px] z-50 border border-base"
          role="menu"
        >
          <button className="flex items-center gap-[3px]" role="menuitem" aria-label="هایلایت متن انتخاب شده">
         
 <Telegram className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
          </button>

          <button className="flex items-center gap-[3px]" role="menuitem" aria-label="کامنت روی متن انتخاب شده">
      <CopyLink className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
          </button>

          <button className="flex items-center gap-[3px]" role="menuitem" aria-label="گذاشتن یادداشت روی متن انتخاب شده">
              <Linkedin className="lg:h-[28px] lg:w-[28px] w-[24px] h-[24px]" />
          </button>

          <button className="flex" role="menuitem" aria-label="خواندن کامنت‌ها">
            <Twitter />
          </button>
        </div>
      )}
    </div>
  );
}

