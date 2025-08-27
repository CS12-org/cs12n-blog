"use client";

import Hands from "~/assets/images/hands-celebrate.svg";
import { useClap } from "~/hooks/use-clap";

type Props = {
  postId: number;
  initialClap?: number;
};

export default function ClapButton({ postId, slug }: { postId: number; slug: string }) {
  const { clap, handleClap, clickCount, maxClicks } = useClap({ postId, slug });

  return (
    <div className="flex gap-[6px]">
      <span className="self-center text-[12px] text-subtext-1">{clap}</span>
      <button
        onClick={handleClap}
        disabled={clickCount >= maxClicks}
        className="disabled:opacity-50"
      >
        <Hands className="lg:w-[25px] lg:h-[28px] w-[18px] h-[21px]" />
      </button>
    </div>
  );
}
