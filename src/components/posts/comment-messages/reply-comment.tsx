'use client';

import Image from 'next/image';
import { Text } from 'react-aria-components';
import Button from '@/components/button';
import CommentsIcon from '@/assets/images/comments.svg';
import Pin from '@/assets/images/pin.svg';
import IncreaseArrow from '@/assets/images/increaseArrow.svg';
import DecreaseArrow from '@/assets/images/decreaseArrow.svg';
import Reply from '@/assets/images/reply.svg';
import Profile from '@/assets/images/user-profile.png';
import { twJoin } from 'tailwind-merge';
import { useState, useMemo } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postVote, PostVoteReq, VoteEnum } from '@/service/post-vote';
import { deleteReply } from '@/service/delete-reply';
import { editComment } from '@/service/edit-comment';
import TextEditorInput from '@/components/shared/text-editor-input/text-editor-input';
import { useSidebarStore } from '@/store/sidebar-store';
import { CommentOptions, CommentOptionsList } from './comment-options';
import { Comment } from '@/service/get-post-by-slug';

type ReplyCommentProps = {
  comment: Comment;
  isReply: boolean;
  isPin: boolean;
  postId: string;
};

export function ReplyComment({ comment, isReply, isPin, postId }: ReplyCommentProps) {
  const [netScore, setNetScore] = useState(comment?.netScore ?? 0);
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);
  const [editError, setEditError] = useState<string | null>(null);

  const { comments, addComment, removeComment, updateComment, updateCommentScore } = useSidebarStore();

  const currentComment = useMemo(() => comments.find((c) => c.id === comment.id) || comment, [comments, comment.id]);

  // Vote mutation
  const voteMutation = useMutation({
    mutationFn: (body: PostVoteReq) => postVote(body),
    onSuccess: (data) => {
      const newScore = data?.data?.netScore ?? 0;
      setNetScore(newScore);
      updateCommentScore(currentComment.id, newScore);
    },
  });

  const handleSubmitVote = (voteType: VoteEnum) => {
    voteMutation.mutate({ commentId: currentComment.id, voteType });
  };

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: () => deleteReply(currentComment.id),
    onSuccess: () => {
      removeComment(currentComment.id);
    },
  });

  // Edit mutation

  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: () => editComment(currentComment.id, { content: editContent }),
    onSuccess: () => {
      updateComment({ ...currentComment, content: editContent });
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setIsEditing(false);
      setEditError(null);
    },
    onError: (err: any) => setEditError(err?.response?.data?.message ?? 'خطایی در ویرایش رخ داده است'),
  });

  const handleEditClick = () => setIsEditing(true);
  const handleSaveEdit = () => {
    if (!editContent.trim()) return setEditError('متن نمی‌تواند خالی باشد');
    editMutation.mutate();
  };

  const options: CommentOptionsList[] = [
    { id: 1, title: 'حذف', action: () => deleteMutation.mutate() },
    { id: 2, title: 'ویرایش', action: handleEditClick },
  ];

  return (
    <section className={twJoin('rounded-2xl', isPin ? 'bg-surface-1' : '')}>
      <section className="m-2">
        {/* Header */}
        <header className="bg-base rounded-t-lg">
          <div className="flex items-center justify-between gap-1.5 p-2.5">
            <div className="flex items-center gap-x-1.5">
              <div className="bg-crust flex items-center gap-1.5 rounded-full p-1.5">
                {isPin && <Pin className="h-[29px] w-[29px]" />}
                <Image
                  width={25}
                  height={25}
                  src={currentComment?.user?.profile?.avatarUrl?.trim() || Profile}
                  alt={currentComment?.user?.username}
                  className="h-[25px] w-[25px] rounded-full"
                />
              </div>
              <Text className="text-subtext-0 text-[14px] font-bold">
                {currentComment?.user?.profile?.fullName ?? currentComment?.user?.username}
              </Text>
              {currentComment?.user?.roles[0] && (
                <span className="bg-crust text-sapphire rounded-md px-4 py-1 text-sm font-bold">
                  {currentComment?.user?.roles[0].name}
                </span>
              )}
            </div>
            <div className="ms-auto">
              <CommentOptions list={options} />
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="rounded-b-lg bg-[#101122] py-2.5">
          {isReply && (
            <div className="bg-mantle flex px-2.5 py-4">
              <Reply />
              <p className="ms-2">
                در پاسخ به :{' '}
                <span className="text-sapphire">
                  {currentComment?.user?.profile?.fullName ?? currentComment?.user?.username}
                </span>
              </p>
            </div>
          )}

          {isEditing ? (
            <div className="p-2.5">
              <TextEditorInput content={editContent} placeHolder="ویرایش کامنت..." onChange={setEditContent} />
              {editError && <p className="text-xs text-red-500">{editError}</p>}
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
            </div>
          ) : (
            <div
              className="prose prose-invert max-w-none p-2.5"
              dir="rtl"
              dangerouslySetInnerHTML={{ __html: currentComment.content || '' }}
            />
          )}

          {/* Footer */}
          <section className="flex justify-between p-2.5">
            <Button className="bg- text-text flex items-center gap-[5px]">
              <CommentsIcon className="h-[29px] w-[29px]" />
              پاسخ دهید
            </Button>
            <div className="flex items-center gap-[10px]">
              {netScore !== 0 && (
                <span className={twJoin(netScore > 0 ? 'text-teal' : 'text-maroon', 'text-[12px]')}>{netScore}</span>
              )}
              <Button
                onClick={() => handleSubmitVote(VoteEnum.UPVOTE)}
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-transparent"
              >
                <IncreaseArrow className="text-teal h-[10px] w-[20px]" />
              </Button>
              <Button
                onClick={() => handleSubmitVote(VoteEnum.DOWNVOTE)}
                className="flex h-[28px] w-[28px] items-center justify-center rounded-[5px] bg-transparent"
              >
                <DecreaseArrow className="text-maroon h-[10px] w-[20px]" />
              </Button>
            </div>
          </section>
        </div>
      </section>

      {/* Replies */}
      {currentComment.replies?.map((reply) => (
        <ReplyComment key={reply.id} comment={reply} postId={postId} isReply={true} isPin={false} />
      ))}
    </section>
  );
}
