'use client';

import Profile from '@/assets/images/user-profile.png';
import TextEditorInput from '@/components/shared/text-editor-input/text-editor-input';
import { useFetchPostComments } from '@/hooks/use-get-comments-by-id';
import { postComment, PostCommentBody } from '@/service/post-comment';
import { InfiniteData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import Button from '@/components/button';
import { getPostCommentsByPostId, GetPostCommentsByPostIdRes } from '@/service/get-comments-by-post-id';
import CommentMessege from '../comment-messages/comment-message';
import ExclamationMark from '@/assets/images/excalamation.svg';

type CommentSectionProps = { postId: string; postUserRole: string };
export default function CommentSection({ postId, postUserRole }: CommentSectionProps) {
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });

  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);
  const [commentModel, setCommentModel] = useState<PostCommentBody>({
    content: '',
    postId,
    parentId: null,
    quotedText: null,
    quotedStartIndex: NaN,
    quotedEndIndex: NaN,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError, error } =
    useFetchPostComments(postId);

  // Flatten all Comments

  const seenIds = new Set();
  const comments =
    (data as InfiniteData<GetPostCommentsByPostIdRes>)?.pages
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

  const postCommentMutation = useMutation({
    mutationFn: async (body: PostCommentBody) => {
      return await postComment(body);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setCommentModel({
        content: '',
        postId,
        parentId: null,
        quotedText: null,
        quotedStartIndex: NaN,
        quotedEndIndex: NaN,
      });
      setErrorMessage(null);
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message ?? 'خطایی رخ داده است');
    },
  });

  // Handle content changes from TextEditorInput
  const handleEditorChange = (content: string) => {
    setCommentModel((prev) => ({ ...prev, content }));
  };

  const handleSubmitComment = () => {
    if (!commentModel.content.trim()) {
      setErrorMessage('لطفاً متن نظر خود را وارد کنید');
      return;
    }
    postCommentMutation.mutate(commentModel);
  };

  // Use session data for profile image and username, fallback to defaults
  const profileImageUrl = '/default-profile.jpg';
  const userName = session?.user?.username || 'کاربر مهمان';
  const hasComments = Array.isArray(comments) && comments?.length > 0;
  const numberOfComments = data?.pages[0]?.totalCount ?? 0;

  // Move early returns after all hooks
  if (isLoading) return <p>در حال بارگذاری کامنت ها...</p>;
  if (isError) return <p>خطا در دریافت پست‌ها: {error?.message}</p>;

  return (
    <section className="realtive flex flex-col gap-[25px]">
      <section className="bg-crust flex flex-col justify-start gap-[10px] rounded-[10px] px-[10px] py-[30px] text-[14px] lg:px-[60px]">
        <header className="text-subtext-0 text-[20px] font-extrabold">نظرات ({numberOfComments})</header>

        <section className="flex items-center gap-[10px] pb-[5px]">
          <section className="flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-inner shadow-[#24273A]">
            <img
              src={profileImageUrl ?? Profile}
              alt="Profile picture"
              className="bg-crust h-[25px] w-[25px] rounded-full object-cover"
            />
          </section>
          <span className="text-subtext-0 font-bold">{userName}</span>
        </section>
        <TextEditorInput
          content={commentModel.content}
          placeHolder="کامنت خود رو بنویسید ..."
          onChange={handleEditorChange}
        />
        {errorMessage && <p className="mt-[5px] text-[12px] text-red-500">{errorMessage}</p>}
        <Button
          onClick={handleSubmitComment}
          className="bg-blue text-crust h-[35px] w-full rounded-[10px] font-bold lg:h-[52px]"
          isDisabled={postCommentMutation.isPending}
        >
          {postCommentMutation.isPending ? 'در حال ارسال...' : 'ارسال نظر'}
        </Button>
      </section>

      <section className="bg-crust rounded-[10px] p-[10px] lg:px-[60px] lg:py-[30px]">
        <div className="bg-base flex items-center gap-[10px] rounded-[10px] px-[10px] py-[15px] text-[12px] lg:p-[15px] lg:text-[14px]">
          <div className="bg-crust flex h-[38px] !w-[40px] items-center justify-center justify-self-start rounded-[10px] lg:h-[48px] lg:w-[48px]">
            <ExclamationMark fill="#91D7E3" className="lg:[26px] lg:[26px] h-[20px] w-[20px]" />
          </div>
          <p className="font-bold">
            برای کامنت گذاشتن باید در سایت
            <span className="text-teal"> ورود </span>
            یا
            <span className="text-teal"> ثبت نام </span>
            کنید.
          </p>
        </div>
      </section>

      <section className="flex flex-col gap-[40px]">
        {hasComments ? (
          comments.map((comment) => <CommentMessege key={comment.id} comment={comment} postId={postId} />)
        ) : (
          <p>نظری موجود نیست</p>
        )}
        {hasNextPage && <div ref={ref} style={{ height: 1 }} />}
        {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
      </section>
    </section>
  );
}
