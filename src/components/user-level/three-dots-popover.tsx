"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import ThreeDotts from "~/assets/images/threeDotts.svg";
import Repead from "~/assets/images/repeat-one.svg";
import Trash from "~/assets/images/trash.svg";
import Survey from "~/assets/images/survey.svg";

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
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const ThreeDottsButton = forwardRef<
    HTMLButtonElement,
    { onClick: () => void }
  >(({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={onClick}
      className="p-[5px]"
      aria-haspopup="true"
    >
      <ThreeDotts className="w-[22px] h-[4px]" />
    </button>
  ));
  ThreeDottsButton.displayName = "ThreeDottsButton";

  return (
    <div className="relative inline-block">
      <ThreeDottsButton onClick={toggleMenu} ref={buttonRef} />

      {isVisible && (
        <section
          ref={menuRef}
          className="absolute bottom-full left-0 mb-[20px] bg-[#101122] w-[140px] h-auto rounded-[10px] py-[12px] px-[10px] text-[12px] text-text flex flex-col gap-[15px] z-50  justify-start "
          role="menu"
        >
          <button className="flex gap-[7px]">
            <Repead className="w-[20px] h-[20px] " fill="#A5ADCB" /> از سرگیری
            دوره{" "}
          </button>
          <button className="flex gap-[7px] items-center">
            {" "}
            <Trash className="w-[25px] h-[25px] stroke-subtext-0 font-bold" />
            پاک کردن دوره{" "}
          </button>
          <button className="flex gap-[7px]">
            <Survey /> نظرسنجی
          </button>
        </section>
      )}
    </div>
  );
}
