'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Comments from '~/assets/images/comments.svg';
import Highlighter from '~/assets/images/highlighter.svg';
import Notes from '~/assets/images/notes.svg';

interface HighlightMenuProps {
  containerId: string;
}

export default function HighlightMenu({ containerId }: HighlightMenuProps) {
  const [selectedText, setSelectedText] = useState('');
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const getFirstLineRect = (sel: Selection) => {
    const range = sel.getRangeAt(0);
    const rects = range.getClientRects();
    return rects.length ? rects[0] : range.getBoundingClientRect();
  };

  const updatePosition = () => {
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;

    const container = document.getElementById(containerId);
    if (!container) return;

    const firstRect = getFirstLineRect(sel);

    const dir = getComputedStyle(container).direction || 'ltr';

    const margin = 8;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    const menuBox = menuRef.current?.getBoundingClientRect();
    const menuW = menuBox?.width ?? 0;

    let x: number;
    if (dir === 'rtl') {
      x = firstRect.right + scrollX - menuW;
    } else {
      x = firstRect.left + scrollX;
    }

    const y = firstRect.top + scrollY - margin;

    const minX = scrollX + 4;
    const maxX = scrollX + window.innerWidth - (menuW || 0) - 4;
    x = Math.max(minX, Math.min(x, maxX));

    setCoords({ x, y });
  };

  useLayoutEffect(() => {
    if (isVisible) updatePosition();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isVisible, selectedText]);

  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const handleSelectionChange = () => {
      const sel = window.getSelection();
      const hasText = !!sel && !!sel.toString().trim();
      const inContainer = !!sel && (container.contains(sel.anchorNode) || container.contains(sel.focusNode));

      if (hasText && inContainer) {
        setSelectedText(sel!.toString());
        setIsVisible(true);
        updatePosition();
      } else {
        setIsVisible(false);
        setSelectedText('');
      }
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    document.addEventListener('touchend', handleSelectionChange, {
      passive: true,
    });
    window.addEventListener('scroll', updatePosition, { passive: true });
    window.addEventListener('resize', updatePosition);

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      document.removeEventListener('touchend', handleSelectionChange);
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [containerId]);

  if (!isVisible || !coords) return null;

  return (
    <div
      ref={menuRef}
      className="text-text border-base absolute z-50 flex gap-[15px] rounded-[10px] border border-[1px] bg-[#050615] p-[10px] text-[12px] shadow-lg"
      style={{
        left: coords.x,
        top: coords.y,
        transform: 'translateY(-100%)',
      }}
    >
      <button aria-label="هایلایت متن انتخاب شده" className="flex items-center gap-[3px]">
        <Highlighter className="h-[13px] w-[13px]" />
        هایلایت
      </button>

      <button aria-label="کامنت روی متن انتخاب شده" className="flex items-center gap-[3px]">
        <Comments className="h-[15px] w-[15px]" />
        کامنت
      </button>

      <button aria-label="گذاشتن یادداشت روی متن انتخاب شده" className="flex items-center gap-[3px]">
        <Notes className="h-[13px] w-[13px]" />
        یادداشت
      </button>

      <button aria-label="خواندن کامنت‌ها" className="flex">
        <Comments />
      </button>
    </div>
  );
}
