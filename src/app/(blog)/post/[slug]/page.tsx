import Image from 'next/image';
import { notFound } from 'next/navigation';
import AudioPlayer from '@/components/audio-player';
import ChangeCommitMessege from '@/components/free-sections/change-commit-message';
import CommitMessegeInput from '@/components/free-sections/commit-message-input';
import ResumeSharingNotice from '@/components/free-sections/resume-sharing-notice';
import ShareHighlightsPrompt from '@/components/free-sections/share-highlights-prompt';
import SharingSuccessPrompt from '@/components/free-sections/sharing-success-prompt';
import HighlightMenu from '@/components/posts/highlight-menu';
import PostAuthor from '@/components/posts/post-author';
import PostNavigation from '@/components/posts/post-navigation';
import PostTabs from '@/components/posts/post-tabs';
import PostSideBar from '@/components/posts/side-bar';
import { getPostBySlug } from '@/service/posts';
import SharePopoverButton from '@/components/posts/share-button';
import ClapButton from '@/components/posts/clap-button';
import Highlights from '@/components/posts/sections/highlight-section';
import { ReactNode } from 'react';

type Props = {
  params: Promise<{
    slug: string;
  }>;
};
export type postTabItems = { id: string; title: string; component: ReactNode };

export default async function PostPage({ params }: Props) {
  const { slug: postId } = await params;
  let post;
  try {
    post = await getPostBySlug({ postId });
  } catch (error) {
    console.error(`Error fetching post with slug ${postId}:`, error);
    return notFound();
  }
  if (!post) return notFound();
  
  const postTabsData: postTabItems[] = [
    { id: 'highlights', title: 'هایلایت ها', component: <Highlights /> },
    { id: 'comments', title: 'نظرات', component: <CommentSection postId={post?.id} /> },
    { id: 'review', title: 'نقد و بررسی', component: <ReviewSection /> },
  ];

  return (
    <section className="flex items-start gap-[15px]">
      <PostSideBar className="hidden lg:flex" />
      <section className="z-10 flex w-full flex-col gap-[10px] text-white">
        <HighlightMenu containerId="highlight-area" />

        <section className="bg-crust mb-[20px] rounded-[10px]">
          <header className="flex w-full flex-col">
            {post.featuredImage && (
              <Image
                alt={post.title}
                src={post.featuredImage.url}
                width={post.featuredImage.width}
                height={post.featuredImage.height}
                className="h-auto w-full rounded-tl-[10px] rounded-tr-[10px]"
              />
            )}

            <h1 className="h-auto px-[10px] py-[5px] text-[18px] font-extrabold lg:px-[30px] lg:py-[25px] lg:pt-[15px] lg:text-5xl">
              {post.title}
            </h1>
          </header>

          {/* {post.narrator && <AudioPlayer audioSrc={post.narrator} />} */}

          <article
            id="highlight-area"
            className="flex flex-col gap-[20px] p-[10px] text-[14px] lg:px-[30px] lg:py-[20px] lg:text-[16px]"
          >
            {/* <p>{post.description}</p> */}
          </article>

          {post.featuredImage && (
            <Image
              alt={post.title}
              className="w-full"
              src={post.featuredImage.url}
              width={post.featuredImage.width}
              height={post.featuredImage.height}
            />
          )}

          <section className="flex flex-col gap-[10px] pt-[10px]">
            <ShareHighlightsPrompt />
            <SharingSuccessPrompt />
            <ResumeSharingNotice />
            <CommitMessegeInput />
            <ChangeCommitMessege />
          </section>

          <section className="pt-[10px]">
            <div className="flex justify-between px-[10px] py-[10px] lg:px-[30px]">
              <SharePopoverButton />
              <ClapButton postId={post.id} userClapCount={0} count={0} />
            </div>
          </section>
        </section>

        <PostAuthor user={post.user} />
        <PostNavigation />
        <PostTabs postTabsData={postTabsData} />
      </section>
    </section>
  );
}
