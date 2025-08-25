import Image from "next/image";
import Hands from "~/assets/images/hands-celebrate.svg";
import PostSideBar from "~/components/posts/side-bar";
import HighlightMenu from "~/components/posts/highlight-menu";
import AudioPlayer from "~/components/audio-player";
import ShareHighlightsPrompt from "~/components/free-sections/share-highlights-prompt";
import SharingSuccessPrompt from "~/components/free-sections/sharing-success-prompt";
import ResumeSharingNotice from "~/components/free-sections/resume-sharing-notice";
import CommitMessegeInput from "~/components/free-sections/commit-message-input";
import ChangeCommitMessege from "~/components/free-sections/change-commit-message";
import SharePopoverButton from "../../../../components/posts/share-button";
import PostAuthor from "~/components/posts/post-author";
import PostNavigation from "~/components/posts/post-navigation";
import PostTabs from "~/components/posts/post-tabs";
import { getPostBySlug } from "~/service/posts";

type Props = {
  params: {
    slug: string;
  };
};

export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  return (
    <section className="flex items-start gap-[15px]">
      <PostSideBar className="hidden lg:flex" />

      <section className="text-white z-10 w-full flex flex-col gap-[10px]">
        <HighlightMenu containerId="highlight-area" />

        <section className="bg-crust mb-[20px] rounded-[10px]">
          <header className="flex flex-col w-full">
            {post.featured_image && (
              <Image
                alt={post.title}
                src={post.featured_image.url.startsWith("http") ? post.featured_image.url : `https://cms.cs12.ir${post.featured_image.url}`}
                width={post.featured_image.width}
                height={post.featured_image.height}
                className="rounded-tl-[10px] rounded-tr-[10px] w-full h-auto"
              />
            )}

            <h1 className="font-extrabold text-[18px] lg:text-5xl px-[10px] py-[5px] lg:px-[30px] lg:py-[25px] lg:pt-[15px] h-auto">
              {post.title}
            </h1>
          </header>

          {post.narrator && <AudioPlayer audioSrc={post.narrator} />}

          <article
            id="highlight-area"
            className="gap-[20px] flex flex-col lg:px-[30px] p-[10px] lg:py-[20px] lg:text-[16px] text-[14px]"
          >
            <p>{post.description}</p>
          </article>

          {post.featured_image && (
            <Image
              src={post.featured_image.url.startsWith("http") ? post.featured_image.url : `https://cms.cs12.ir${post.featured_image.url}`}
              alt={post.title}
              width={post.featured_image.width}
              height={post.featured_image.height}
              className="w-full"
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
            <div className="lg:px-[30px] px-[10px] py-[10px] flex justify-between">
              <SharePopoverButton />
              <div className="flex gap-[6px]">
                <span className="self-center text-[12px] text-subtext-1">
                  {post.clap}
                </span>
                <button>
                  <Hands className="lg:w-[25px] lg:h-[28px] w-[18px] h-[21px]" />
                </button>
              </div>
            </div>
          </section>
        </section>

    <PostAuthor user={post.user} />
        <PostNavigation />
        <PostTabs />
      </section>
    </section>
  );
}
