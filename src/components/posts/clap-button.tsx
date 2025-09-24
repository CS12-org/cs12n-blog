'use client';

import Hands from '~/assets/images/hands-celebrate.svg';
import { useClap } from '~/hooks/use-clap';
import { useDebounce } from 'use-debounce';
import { useEffect, useMemo, useRef, useState } from 'react';

interface ClapButtonProps {
  postId: string;
  maxClicks?: number;
  count: number;
  userClapCount: number;
}

export default function ClapButton({ postId, maxClicks, count, userClapCount: initialUserClap }: ClapButtonProps) {
  const max = maxClicks ?? 5;
  const { handleClap, isMutating } = useClap({ postId, maxClicks: max });

  const [userClap, setUserClap] = useState(initialUserClap);
  const [debouncedUserClap] = useDebounce(userClap, 800);

  const lastSentRef = useRef(initialUserClap);

  useEffect(() => {
    setUserClap(initialUserClap);
    lastSentRef.current = initialUserClap;
  }, [initialUserClap]);

  useEffect(() => {
    const delta = debouncedUserClap - lastSentRef.current;
    if (delta > 0) {
      handleClap(delta);
      lastSentRef.current = debouncedUserClap;
    }
  }, [debouncedUserClap, handleClap]);

  const onClick = () => {
    if (isMutating) return;
    setUserClap((v) => Math.min(v + 1, max));
  };

  const displayedTotal = useMemo(() => count + (userClap - lastSentRef.current), [count, userClap]);

  const disabled = userClap >= max || isMutating;

  return (
    <div className="flex gap-[6px]">
      <span className="text-subtext-1 self-center text-[12px]">{displayedTotal}</span>
      <button
        onClick={onClick}
        disabled={disabled}
        className="disabled:opacity-50"
        aria-label="Clap"
        title={disabled ? 'به سقف کلپ رسیدی' : 'کلپ کن'}
      >
        <Hands className="h-[21px] w-[18px] lg:h-[28px] lg:w-[25px]" />
      </button>
    </div>
  );
}
