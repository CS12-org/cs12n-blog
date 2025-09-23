"use client";

import Hands from "~/assets/images/hands-celebrate.svg";
import { useClap } from "~/hooks/use-clap";

type Props = {
  postId: number;
  slug: string;
};

export default function ClapButton({ postId, slug }: Props) {
  const { clap, handleClap, userClapCount, maxClicks } = useClap({
    postId,
    slug,
  });

  return (
    <div className="flex gap-[6px]">
      <span className="self-center text-[12px] text-subtext-1">{clap}</span>
      <button
        onClick={handleClap}
        disabled={userClapCount >= maxClicks}
        className="disabled:opacity-50"
      >
        <Hands className="lg:w-[25px] lg:h-[28px] w-[18px] h-[21px]" />
      </button>
    </div>
  );
}
