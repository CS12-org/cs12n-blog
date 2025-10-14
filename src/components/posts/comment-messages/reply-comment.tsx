import Image from 'next/image';
import { Text } from 'react-aria-components';
import { Comment } from '@/service/get-post-by-slug';
import Button from '@/components/button';
import CommentsIcon from '@/assets/images/comments.svg';
import Pin from '@/assets/images/pin.svg';
import { useEffect, useState } from 'react';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import { twJoin } from 'tailwind-merge';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
// import ThreeDotts from '@/assets/images/dots-horizontal.svg';
import Reply from '@/assets/images/reply.svg';

import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { postVote, PostVoteReq, VoteEnum } from '@/service/post-vote';
import Profile from '@/assets/images/user-profile.png';
import { useFetchCommentByParentId } from '@/hooks/use-get-comment-by-parent-id';
import { GetCommentByParentIdRes } from '@/service/get-comment-by-parent-id';
import { useInView } from 'react-intersection-observer';
import { CommentOptions, CommentOptionsList } from './comment-options';
import { deleteReply } from '@/service/delete-reply';
import { useSidebarStore } from '@/store/sidebar-store';

type ReplyCommentProps = { comment: Comment; isReply: boolean; isPin: boolean; postId: string };

export function ReplyComment({ comment, isReply, isPin, postId }: ReplyCommentProps) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });
  //   const [replies, setReplies] = useState<Comment[]>([]);
  const [netScore, setNetScore] = useState(comment?.netScore ?? 0);

  const voteMutation = useMutation({
    mutationFn: async (body: PostVoteReq) => postVote(body),
    onSuccess(data) {
      setNetScore(data?.data?.netScore ?? 0);
    },
  });

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments', postId],
      });
      useSidebarStore.getState().removeComment(comment.id);
    },
    onError: (error) => {
      console.error('خطا در حذف کامنت', error);
    },
  });

  const handleSubmitVoute = (voteType: VoteEnum) => {
    voteMutation.mutate({ commentId: comment?.id, voteType: voteType });
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } = useFetchCommentByParentId(
    comment?.id,
  );

  // Flatten all Comments
  const seenIds = new Set();
  const replies =
    (data as InfiniteData<GetCommentByParentIdRes>)?.pages
      .flatMap((page) => page.items)
      .filter((comment) => {
        if (seenIds.has(comment.id)) {
          return false;
        }
        seenIds.add(comment.id);
        return true;
      }) || [];

  // Trigger fetch next page
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const list: CommentOptionsList[] = [
    {
      id: 1,
      title: 'حذف',
      action: () => deleteMutation.mutate(comment.id),
    },
  ];

  return (
    <section className={twJoin('rounded-2xl', isPin ? 'bg-surface-1' : '')}>
      {/* comment */}
      <section className={'m-2'}>
        <header className="bg-base rounded-t-lg">
          <div className="flex items-center justify-between gap-1.5 p-2.5">
            <div className="flex items-center gap-x-1.5">
              <div className="bg-crust flex items-center gap-1.5 rounded-full p-1.5">
                <Pin className="h-[29px] w-[29px]" />
                <Image
                  width={25}
                  height={25}
                  src={comment?.user?.profile?.avatarUrl?.trim() !== '' ? comment?.user?.profile?.avatarUrl : Profile}
                  alt={comment?.user?.username}
                  className="h-[25px] w-[25px] rounded-full"
                />
              </div>
              <Text className="text-subtext-0 text-[14px] font-bold">
                {comment?.user?.profile?.fullName ?? comment?.user?.username}
              </Text>
              {comment?.user?.roles[0] && (
                <span className="bg-crust text-sapphire rounded-md px-4 py-1 text-sm font-bold">
                  {comment?.user?.roles[0].name}
                </span>
              )}
            </div>

            {/* <ThreeDotts className={'bg - [#fff] ms-auto'} /> */}
            <CommentOptions list={list} />
          </div>
        </header>
        <div className="rounded-b-lg bg-[#101122] py-2.5">
          {isReply && (
            <div className="bg-mantle flex py-4">
              <Reply />
              <p className="ms-2">
                در پاسخ به :{' '}
                <span className="text-sapphire">{comment?.user?.profile?.fullName ?? comment?.user?.username}</span>
              </p>
            </div>
          )}
          <div
            className="prose prose-invert max-w-none p-2.5"
            dir="rtl" // Ensure RTL for Persian text
            dangerouslySetInnerHTML={{ __html: comment.content || '' }}
          />
          <section className="flex justify-between p-2.5">
            <Button onClick={() => {}} className="bg- text-text flex items-center gap-[5px]">
              <CommentsIcon className="h-[29px] w-[29px]" />
              پاسخ دهید
            </Button>
            <div className="flex items-center gap-[10px]">
              {netScore !== 0 && (
                <span className={twJoin(netScore > 0 ? 'text-teal' : 'text-maroon', 'text-[12px]')}>{netScore}</span>
              )}
              <Button
                onClick={() => handleSubmitVoute(VoteEnum?.UPVOTE)}
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-transparent"
              >
                <IncreaseArrow className="text-teal h-[10px] w-[20px]" />
              </Button>
              <Button
                onClick={() => handleSubmitVoute(VoteEnum?.DOWNVOTE)}
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-transparent"
              >
                <DecreaseArrow className="text-maroon h-[10px] w-[20px]" />
              </Button>
            </div>
          </section>
        </div>
      </section>
      {/* replys */}
      {replies.length > 0 &&
        replies?.map((reply) => (
          <ReplyComment postId={postId} key={reply.id} comment={reply} isReply={true} isPin={false} />
        ))}
      <div ref={ref} style={{ height: 1 }} />
      {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
    </section>
  );
}
