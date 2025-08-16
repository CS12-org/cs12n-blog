
"use client";
import { useEffect, useState } from "react";
import Comments from "~/assets/images/comments.svg"
import Notes from "~/assets/images/notes.svg"
import Highlighter from "~/assets/images/highlighter.svg"
interface HighlightMenuProps {
  containerId: string;
}

export default function HighlightMenu({ containerId }: HighlightMenuProps) {
  const [selectedText, setSelectedText] = useState("");
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const rect = sel.getRangeAt(0).getBoundingClientRect();
    setCoords({
      x: rect.right + window.scrollX,
      y: rect.top + window.scrollY - 8, 
    });
  };

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      if (
        sel &&
        sel.toString().trim() &&
        container.contains(sel.anchorNode)
      ) {
        setSelectedText(sel.toString());
        updatePosition();
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setSelectedText("");
      }
    };

    document.addEventListener("selectionchange", handleSelectionChange);
    document.addEventListener("touchend", handleSelectionChange);
    window.addEventListener("scroll", updatePosition, { passive: true });
    window.addEventListener("resize", updatePosition);

    return () => {
      document.removeEventListener("selectionchange", handleSelectionChange);
      document.removeEventListener("touchend", handleSelectionChange);
      window.removeEventListener("scroll", updatePosition);
      window.removeEventListener("resize", updatePosition);
    };
  }, [containerId]);

  if (!isVisible || !coords) return null;

  return (
    <div
      className="absolute bg-[#050615] shadow-lg rounded-[10px] p-[10px] text-[12px] text-text flex gap-[15px] z-50 border border-base borser-[1px]"
      style={{
        left: coords.x + 1,
        top: coords.y,
        transform: "translate(0, -100%)",
      }}
    >
      <button
        aria-label="هایلایت متن انتخاب شده"
        onClick={() => navigator.clipboard.writeText(selectedText)}
        className="flex items-center gap-[3px]"
      >
        <Highlighter className="h-[13px] w-[13px]" />

        هایلایت
      </button>
      <button
        aria-label="  کامنت روی متن انتخاب شده"
        className="flex items-center gap-[3px] "
      >
        <Comments  className="h-[15px] w-[15px]" />
        کامنت
      </button>
      <button
        aria-label="گذاشتن یادداشت روی متن انتخاب شده"
        className="flex items-center gap-[3px]"
      >
        <Notes className="h-[13px] w-[13px]" />
        یادداشت
      </button>

      <button aria-label="خواندن کامنت ها"
      className="flex">
        <Comments/> </button>
    </div>
  );
}
