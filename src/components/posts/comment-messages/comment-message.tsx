'use client';

import Image from 'next/image';
import { Text } from '@/components/react-aria-components';
import CommentsIcon from '@/assets/images/comments.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import ThreeDotts from '@/assets/images/threeDotts.svg';
import Highlighter from '@/assets/images/highlighter.svg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import Button from '@/components/button';
import { Comment } from '@/service/get-post-by-slug';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVote, PostVoteReq, VoteEnum } from '@/service/post-vote';
import { useEffect, useState } from 'react';
import { twJoin } from 'tailwind-merge';
import { useSidebarStore } from '@/store/sidebar-store';
import { CommentSidebarContent } from '@/components/posts/comment-messages/comment-sidebar-content';
import { CommentOptions, CommentOptionsList } from './comment-options';
import { deleteReply } from '@/service/delete-reply';
import { useLoginModalContext } from '@/components/providers/login-modal-provider';
import { editComment } from '@/service/edit-comment';
import TextEditorInput from '@/components/shared/text-editor-input/text-editor-input';

type CommentMessegeProps = { comment: Comment; postId: string };

function CommentMessege({ comment, postId }: CommentMessegeProps) {
  const openSidebar = useSidebarStore((s) => s.openSidebar);
  const setPinnedComment = useSidebarStore((s) => s.setPinnedComment);
  const [pinnedCommentId, _] = useState<string | undefined>(comment.id);

  const { openLoginModalIfUnauthenticated } = useLoginModalContext();
  const queryClient = useQueryClient();

  const [netScore, setNetScore] = useState(comment?.netScore ?? 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setEditContent(comment.content);
  }, [comment.content]);

  const voteMutation = useMutation({
    mutationFn: async (body: PostVoteReq) => postVote(body),
    onSuccess(data) {
      setNetScore(data?.data?.netScore ?? 0);
    },
  });

  const handleSubmitVote = (voteType: VoteEnum) => {
    openLoginModalIfUnauthenticated(() => {
      voteMutation.mutate({ commentId: comment?.id, voteType });
    });
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => deleteReply(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      useSidebarStore.getState().removeComment(comment.id);
      setPinnedComment(null);
    },
  });

  const editMutation = useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) => editComment(id, { content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setIsEditing(false);
      setError(null);
    },
    onError: (err: any) => setError(err?.response?.data?.message ?? 'خطایی در ویرایش رخ داده است'),
  });

  const handleReadAnswers = () => {
    openLoginModalIfUnauthenticated(() => {
      setPinnedComment(comment);
      openSidebar(<CommentSidebarContent pinCommentId={comment.id} postId={postId} />);
    });
  };

  const handleEditClick = () => setIsEditing(true);

  const handleSaveEdit = () => {
    const plainText = editContent.trim();
    if (!plainText) return setError('متن نمی‌تواند خالی باشد');
    editMutation.mutate({ id: comment.id, content: editContent });
  };

  const list: CommentOptionsList[] = [
    {
      id: 1,
      title: 'حذف',
      action: () => deleteMutation.mutate(comment.id),
    },
    {
      id: 2,
      title: 'ویرایش',
      action: handleEditClick,
    },
  ];

  return (
    <article className="flex w-full flex-col px-[20px]">
      <header className="bg-crust flex justify-between rounded-tl-[10px] rounded-tr-[10px] p-[10px] lg:rounded-tr-full lg:rounded-br-full">
        <div className="flex items-center justify-center gap-[10px]">
          <Image
            width={25}
            height={25}
            src={comment?.user?.profile?.avatarUrl || '/default-avatar.png'}
            alt={comment?.user?.username}
            className="h-[25px] w-[25px] rounded-full"
          />
          <Text className="text-subtext-0 text-[14px] font-bold">
            {comment?.user?.profile?.fullName ?? comment?.user?.username}
          </Text>
          {comment?.user?.roles[0] && (
            <span className="bg-base text-sapphire rounded-md px-4 py-1 text-sm font-bold">
              {comment?.user?.roles[0].name}
            </span>
          )}
        </div>
        <div className="flex items-center gap-[10px]">
          {netScore !== 0 && (
            <span className={twJoin(netScore > 0 ? 'text-teal' : 'text-maroon', 'text-[12px]')}>{netScore}</span>
          )}
          <Button
            onClick={() => handleSubmitVote(VoteEnum.UPVOTE)}
            className="bg-teal flex h-[28px] w-[28px] items-center justify-center rounded-[5px]"
          >
            <IncreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button
            onClick={() => handleSubmitVote(VoteEnum.DOWNVOTE)}
            className="bg-maroon flex h-[28px] w-[28px] items-center justify-center rounded-[5px]"
          >
            <DecreaseArrow className="h-[10px] w-[20px]" />
          </Button>
          <Button className="bg- text-subtext-0">
            <CommentOptions list={list} />
          </Button>
        </div>
      </header>

      <section className="text-text flex flex-col gap-y-[15px] rounded-b-[10px] bg-[#101122] p-[10px] text-[12px] lg:mx-[20px]">
        {comment.quotedText && (
          <div className="bg-mantle -mx-2.5 flex justify-between py-3 pl-3">
            <div className="flex gap-x-3">
              <span className="border-sapphire border-r-4"></span>
              <p className="text-sm font-normal">{comment.quotedText}</p>
            </div>
            <Highlighter className="size-[24.5px]" />
          </div>
        )}

        {isEditing ? (
          <>
            <TextEditorInput content={editContent} placeHolder="ویرایش کامنت..." onChange={setEditContent} />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <div className="mt-3 flex justify-end gap-3">
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-maroon rounded-lg px-4 py-1.5 text-sm text-black"
              >
                انصراف
              </Button>
              <Button
                onClick={handleSaveEdit}
                className="bg-sapphire rounded-lg px-4 py-1.5 text-sm text-black"
                isDisabled={editMutation.isPending}
              >
                {editMutation.isPending ? 'در حال ذخیره...' : 'ذخیره ویرایش'}
              </Button>
            </div>
          </>
        ) : (
          <div
            className="prose prose-invert max-w-none"
            dir="rtl"
            dangerouslySetInnerHTML={{ __html: comment.content || '' }}
          />
        )}

        <section className="flex justify-between">
          <Button onClick={handleReadAnswers} className="bg- text-text flex items-center gap-[5px]">
            <CommentsIcon className="h-[29px] w-[29px]" />
            پاسخ‌ها ( 2 )
          </Button>
        </section>
      </section>
    </article>
  );
}

export default CommentMessege;
