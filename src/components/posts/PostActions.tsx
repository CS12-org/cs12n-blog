'use client';

import ClapButton from './clap-button';

type Props = {
  postId: string;
};

export default function PostActions({ postId }: Props) {
  return (
    <div className="flex justify-between px-[10px] py-[10px] lg:px-[30px]">
      <ClapButton postId={postId} userClapCount={0} count={0} />
    </div>
  );
}
