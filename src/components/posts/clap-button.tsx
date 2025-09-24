'use client';

import Hands from '~/assets/images/hands-celebrate.svg';
import { useClap } from '~/hooks/use-clap';

interface ClapButtonProps {
  postId: string;
  maxClicks?: number;
}

export default function ClapButton({ postId, maxClicks }: ClapButtonProps) {
  const { clap, userClapCount, handleClap, isMutating } = useClap({ postId, maxClicks });

  return (
    <div className="flex gap-[6px]">
      <span className="self-center text-[12px] text-subtext-1">{clap}</span>
      <button
        onClick={handleClap}
        disabled={userClapCount >= (maxClicks ?? 5) || isMutating}
        className="disabled:opacity-50"
      >
        <Hands className="lg:w-[25px] lg:h-[28px] w-[18px] h-[21px]" />
      </button>
    </div>
  );
}
