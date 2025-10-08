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
import { CommentOptions } from './comment-options';
import { deleteReply } from '@/service/delete-reply';
import { useSidebarStore } from '@/store/sidebar-store';

type ReplyCommentProps = { comment: Comment; isReply: boolean; isPin: boolean };

export function ReplyComment({ comment, isReply, isPin }: ReplyCommentProps) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });
  //   const [replies, setReplies] = useState<Comment[]>([]);
  const [netScore, setNetScore] = useState(comment?.netScore ?? 0);

  const voteMutation = useMutation({
    mutationFn: async (body: PostVoteReq) => postVote(body),
    onSuccess(data) {
      setNetScore(data?.data?.netScore ?? 0);
    },
  });

  const closeSidebar = useSidebarStore((s) => s.closeSidebar);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['comments'],
      });
      closeSidebar();
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
  return (
    <section className={twJoin('rounded-2xl', isPin ? 'bg-surface-1' : '')}>
      {/* comment */}
      <section className={'m-2'}>
        <header className="bg-base rounded-t-lg">
          <div className="flex items-center justify-start gap-1.5 p-2.5">
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

            {/* <ThreeDotts className={'bg - [#fff] ms-auto'} /> */}
            <CommentOptions
              title={deleteMutation.isPending ? '... در حال حذف کامنت' : 'حذف کامنت'}
              onDelete={() => deleteMutation.mutate(comment.id)}
            />
          </div>
        </header>
        <div className="rounded-b-lg bg-[#101122] py-2.5">
          {isReply && (
            <div className="bg-mantle flex py-4">
              <Reply />
              <p className="ms-2">در پاسخ به : {comment?.user?.profile?.fullName ?? comment?.user?.username}</p>
            </div>
          )}
          <div
            className="prose prose-invert max-w-none p-2.5"
            dir="rtl" // Ensure RTL for Persian text
            dangerouslySetInnerHTML={{ __html: comment.content || '' }}
          />
          <section className="flex justify-between p-2.5">
            <Button onClick={() => {}} className="bg- text-text flex items-center gap-[5px]">
              {isPin ? <Pin className="h-[29px] w-[29px]" /> : <CommentsIcon className="h-[29px] w-[29px]" />}
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
        replies?.map((reply) => <ReplyComment key={reply.id} comment={reply} isReply={true} isPin={false} />)}
      <div ref={ref} style={{ height: 1 }} />
      {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
    </section>
  );
}
