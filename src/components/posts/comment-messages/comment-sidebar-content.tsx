import { Button } from 'react-aria-components';
import { DeleteButton } from '~/components/shared/delete-button';
import { SelectBox } from '~/components/shared/select-box';
import TextEditorInput from '~/components/shared/text-editor-input/text-editor-input';
import { useSidebarStore } from '~/store/sidebar-store';
import { useUserStore } from '~/store/user-store';
import Profile from '~/assets/images/user-profile.png';
import { useEffect, useState } from 'react';
import { postComment, PostCommentBody } from '~/service/post-comment';
import Anonymous from '~/assets/images/anonymous.svg';
import { InfiniteData, useMutation, useQueryClient } from '@tanstack/react-query';
import { useFetchPostComments } from '~/hooks/use-get-comments-by-id';
import { GetPostCommentsByPostIdRes } from '~/service/get-comments-by-post-id';
import { useInView } from 'react-intersection-observer';
import CommentMessege from '~/components/posts/comment-messages/comment-message';

type CommentSidebarContentProps = { postId: string };
export function CommentSidebarContent({ postId }: CommentSidebarContentProps) {
  const queryClient = useQueryClient();
  const { ref, inView } = useInView({ threshold: 0, rootMargin: '300px' });

  const closeSidebar = useSidebarStore((s) => s.closeSidebar);
  const userProfile = useUserStore((state) => state.userProfile);
  // Use session data for profile image and username, fallback to defaults
  const profileImageUrl = userProfile?.avatarUrl ?? Profile;
  const userName = userProfile?.fullName ?? userProfile?.username ?? 'کاربر مهمان';

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [commentModel, setCommentModel] = useState<PostCommentBody>({
    content: '',
    postId,
    parentId: null,
    quotedText: null,
    quotedStartIndex: NaN,
    quotedEndIndex: NaN,
  });

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
  const hasComments = Array.isArray(comments) && comments.length > 0;
  const numberOfComments = data?.pages[0]?.totalCount ?? 0;
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
  if (isLoading) return <p>در حال بارگذاری کامنت ها...</p>;
  if (isError) return <p>خطا در دریافت پست‌ها: {error?.message}</p>;

  return (
    <div className="bg-crust flex h-full flex-col rounded-2xl">
      {/* Header */}
      <div className="border-subtext-0 flex items-center justify-between p-2.5">
        <header className="text-subtext-0 text-[20px] font-extrabold">نظرات ({numberOfComments})</header>
        <DeleteButton onClick={closeSidebar} />
      </div>

      {/* Scrollable content without visible scrollbar */}
      <div className="scrollbar-hidden flex flex-1 flex-col gap-4 overflow-y-auto p-2.5">
        <SelectBox
          lists={[
            { id: '1', label: 'نظرات اخیر' },
            { id: '2', label: 'همه نظرات' },
            { id: '3', label: 'نقد و بررسی ها' },
          ]}
        />

        <section className="flex flex-col gap-[10px]">
          <section className="flex items-center gap-[10px] pb-[5px]">
            <section className="flex h-[35px] w-[35px] items-center justify-center rounded-full shadow-inner shadow-[#24273A]">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl as string}
                  alt="Profile picture"
                  className="bg-crust h-[25px] w-[25px] rounded-full object-cover"
                />
              ) : (
                <Anonymous aria-label="آیکون فرد" className="bg-crust h-[25px] w-[25px] rounded-full" />
              )}
            </section>
            <span className="text-subtext-0 font-bold">{userName}</span>
          </section>
          <TextEditorInput
            content={commentModel.content}
            placeHolder="کامنت خود رو بنویسید ..."
            onChange={handleEditorChange}
          />
          <Button
            onClick={handleSubmitComment}
            className="bg-blue text-crust h-[35px] w-full rounded-[10px] font-bold lg:h-[52px]"
            isDisabled={postCommentMutation.isPending}
          >
            {postCommentMutation.isPending ? 'در حال ارسال...' : 'ارسال نظر'}
          </Button>
        </section>

        <section id="comment-scroll-container" className="flex flex-col gap-[40px]">
          {hasComments ? (
            comments.map((comment) => (
              <CommentMessege key={comment.id} comment={comment} postId={postId} onReplyClick={() => {}} />
            ))
          ) : (
            <p>نظری موجود نیست</p>
          )}
          <div ref={ref} style={{ height: 1 }} />
          {isFetchingNextPage && <p>در حال بارگذاری پست‌های بعدی...</p>}
        </section>
      </div>
    </div>
  );
}
