'use client';
import Button from '@/components/button';
import { TextInput } from '@/components/user-panel/text-field';
import { getPostCommentsByPostId } from '@/service/get-comments-by-post-id';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { postComment, PostCommentBody } from '@/service/post-comment';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import TextEditorInput from '@/components/shared/text-editor-input/text-editor-input';
type CommentSectionProps = { postId: string };
export default function CommentSection({ postId }: CommentSectionProps) {
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const [commentModel, setCommentModel] = useState<PostCommentBody>({
    content: '',
    postId,
    parentId: '',
    quotedText: '',
    quotedStartIndex: NaN,
    quotedEndIndex: NaN,
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { data: comments, error: queryError } = useQuery<Comment[]>({
    queryKey: ['comments', postId],
    queryFn: () => getPostCommentsByPostId({ postId }),
    enabled: !!postId, // Only run when postId is available
  });

  const postCommentMutation = useMutation({
    mutationFn: async (body: PostCommentBody) => {
      return await postComment({ body });
    },
    onSuccess: () => {
      // Invalidate comments query to refresh the list
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setCommentModel({
        content: '',
        postId,
        parentId: '',
        quotedText: '',
        quotedStartIndex: NaN,
        quotedEndIndex: NaN,
      });
      setErrorMessage(null);
    },
    onError: (error: any) => {
      setErrorMessage(error?.response?.data?.message ?? 'خطایی رخ داده است');
    },
  });

  const handleSubmitComment = () => {
    if (!commentModel.content.trim()) {
      setErrorMessage('لطفاً متن نظر خود را وارد کنید');
      return;
    }
    postCommentMutation.mutate(commentModel);
  };

  // Use session data for profile image and username, fallback to defaults
  const profileImageUrl = session?.user?.username || '/default-profile.jpg';
  const userName = session?.user?.username || 'کاربر مهمان';
  return (
    <section className="flex flex-col gap-[25px]">
      <section className="bg-crust flex flex-col justify-start gap-[10px] rounded-[10px] px-[10px] py-[30px] text-[14px] lg:px-[60px]">
        <header className="text-subtext-0 text-[20px] font-extrabold">نظرات ({comments?.length || 0})</header>

        <section className="flex items-center gap-[10px] pb-[5px]">
          <section className="flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-inner shadow-[#24273A]">
            <img
              src={profileImageUrl}
              alt="Profile picture"
              className="bg-crust h-[25px] w-[25px] rounded-full object-cover"
            />
          </section>
          <span className="text-subtext-0 font-bold">{userName}</span>
        </section>

        <div>
          <TextInput
            className="border-surface-0 placeholder:text-text text-text h-[35px] w-full border-b-[1px] p-[5px] text-[12px] lg:h-auto lg:!p-[15px] lg:text-[14px]"
            name="نقد و نکات"
            aria-label="کامنت خود را بنویسید"
            placeholder="کامنت خود رو بنویسید ..."
          />
          {errorMessage && <p className="mt-[5px] text-[12px] text-red-500">{errorMessage}</p>}
        </div>
        <TextEditorInput />
        <Button
          onClick={handleSubmitComment}
          className="bg-blue text-crust h-[35px] w-full rounded-[10px] font-bold lg:h-[52px]"
          isDisabled={postCommentMutation.isPending}
        >
          {postCommentMutation.isPending ? 'در حال ارسال...' : 'ارسال نظر'}
        </Button>
      </section>

      {/* <section className="bg-crust rounded-[10px] p-[10px] lg:px-[60px] lg:py-[30px]">
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
        <CommentMessege />
        <HighlightCommentMessege />
      </section> */}
    </section>
  );
}
