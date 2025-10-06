import Image from 'next/image';
import { Text } from '@/components/react-aria-components';
import CommentsIcon from '@/assets/images/comments.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import ThreeDotts from '@/assets/images/threeDotts.svg';
import Profile from '@/assets/images/farhan.jpg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import Button from '@/components/button';
import { Comment } from '@/service/get-post-by-slug';
import { useMutation } from '@tanstack/react-query';
import { postVote, PostVoteReq, VoteEnum } from '@/service/post-vote';
import { useState } from 'react';
import { twJoin } from 'tailwind-merge';

type CommentMessegeProps = { comment: Comment };
function CommentMessege({ comment }: CommentMessegeProps) {
  const [netScore, setNetScore] = useState(comment?.netScore ?? 0);
  const voteMutation = useMutation({
    mutationFn: async (body: PostVoteReq) => postVote(body),
    onSuccess(data) {
      setNetScore(data?.data?.netScore ?? 0);
    },
  });
  const handleSubmitVoute = (voteType: VoteEnum) => {
    voteMutation.mutate({ commentId: comment?.id, voteType: voteType });
  };

  return (
    <article className="flex w-full flex-col px-[20px]">
      <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px] lg:rounded-tr-full lg:rounded-br-full">
        <div className="flex items-center justify-center gap-[10px]">
          <Image
            width={25}
            height={25}
            src={comment?.user?.profile?.avatarUrl?.trim() !== '' ? comment?.user?.profile?.avatarUrl : Profile}
            alt={comment?.user?.username}
            className="h-[25px] w-[25px] rounded-full"
          />
          <Text className="text-subtext-0 text-[14px] font-bold">
            {comment?.user?.profile?.fullName ?? comment?.user?.username}
          </Text>
        </div>
        <div className="flex items-center gap-[10px]">
          {netScore !== 0 && (
            <span className={twJoin(netScore > 0 ? 'text-teal' : 'text-maroon', 'text-[12px]')}>{netScore}</span>
          )}
          <Button
            onClick={() => handleSubmitVoute(VoteEnum?.UPVOTE)}
            className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]"
          >
            <IncreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button
            onClick={() => handleSubmitVoute(VoteEnum?.DOWNVOTE)}
            className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]"
          >
            <DecreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg- text-subtext-0">
            <ThreeDotts />
          </Button>
        </div>
      </header>
      <section className="text-text flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px] lg:mx-[20px]">
        <div
          className="prose prose-invert max-w-none"
          dir="rtl" // Ensure RTL for Persian text
          dangerouslySetInnerHTML={{ __html: comment.content || '' }}
        />
        <section className="flex justify-between">
          <Button className="bg- text-text flex items-center gap-[5px]">
            <CommentsIcon className="h-[29px] w-[29px]" />
            پاسخ ها
          </Button>
        </section>
      </section>
    </article>
  );
}

export default CommentMessege;
