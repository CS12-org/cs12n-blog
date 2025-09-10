"use client";

import Hands from "~/assets/images/hands-celebrate.svg";
import { useClap } from "~/hooks/use-clap";
import type { Post } from "~/service/posts";

type Props = {
  postId: number;
  slug: string;
  data: Post;
};

export default function ClapButton({ postId, slug, data }: Props) {
  const { clap, handleClap, clickCount, maxClicks } = useClap({
    postId,
    slug,
    data,
  });

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
