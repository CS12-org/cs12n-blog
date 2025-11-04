'use client';

import Comments from '@/assets/images/comments.svg';
import Button from '@/components/button';
import { Link } from '@/components/react-aria-components';
import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import ClapButton from '../posts/clap-button';
import SaveButton from '../saved-posts/save-button';
import { PostOptions } from '../posts/post-options';
import { useLoginModalContext } from '../providers/login-modal-provider';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePost } from '@/service/delete-post';
import { useUserStore } from '@/store/user-store';
const colors = ['text-peach', 'text-mauve', 'text-yellow'];

export type PostOptionsList = {
  id: number;
  title: string;
  action?: () => void;
};

type Props = {
  id: string;
  slug: string;
  claps: number;
  title: string;
  image?: string;
  description: string;
  tags: { id: string; title: string; slug: string }[];
  isSavedByCurrentUser: boolean;
  clapUserCount: number;
};

export default function Post(props: Props) {
  const { id: postId, title, tags, description, image, slug, isSavedByCurrentUser, claps } = props;

  const { openLoginModalIfUnauthenticated } = useLoginModalContext();

  const { userProfile } = useUserStore();

  const userRole = userProfile?.roles[0];

  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: deletePost,
    onMutate: async (postId) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const prevPosts = queryClient.getQueryData(['posts']);

      queryClient.setQueryData(['posts'], (old: any) =>
        old ? old.filter((post: any) => post.id !== postId) : undefined,
      );

      return { prevPosts };
    },
    onError: (_err, _postId, context) => {
      queryClient.setQueryData(['posts'], context?.prevPosts);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });

  const handleBeforeOpenOptions = () => {
    let allowed = false;
    openLoginModalIfUnauthenticated(() => {
      allowed = true;
    });
    return allowed;
  };

  const list: PostOptionsList[] = [
    {
      id: 1,
      title: 'حذف',
      action: () => deleteMutation.mutate(postId),
    },
  ];

  return (
    <article className="bg-crust overflow-hidden rounded-xl">
      {image && (
        <header>
          <Link href={`/post/${slug}`} className="block w-full">
            <Image alt={title} src={image} width={660} height={276} className="h-auto w-full" />
          </Link>
        </header>
      )}
      <main>
        <div className="flex items-center justify-between px-2.5 pt-4 pb-2.5">
          <Link href={`/post/${slug}`}>
            <h3 className="text-headline-md lg:text-headline-lg truncate">{title}</h3>
          </Link>
          {(userRole === 'superadmin' || userRole === 'admin') && (
            <PostOptions list={list} onBeforeOpen={handleBeforeOpenOptions} />
          )}
        </div>

        <div className="bg-mantle flex items-stretch py-2.5">
          <div aria-hidden className="bg-teal w-[5px] shrink-0 rounded-full" />
          <p className="text-subtext-0 grow truncate px-2.5">{description}</p>
        </div>
      </main>
      <footer className="text-body-xs px-[10px] pt-7 pb-5">
        <ul className="mb-4 flex items-baseline gap-2.5">
          {tags.map((item, index) => (
            <li
              key={item.id}
              className={twMerge(
                colors[(index - 1) % colors.length],
                'first-of-type:bg-surface-2 first-of-type:text-text',
                'first-of-type:rounded first-of-type:px-2.5',
                'first-of-type:py-0.5 hover:brightness-110',
                'transition-[filter] active:brightness-90',
              )}
            >
              <Link href={`/tags/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Button className="flex items-center gap-1.5" variant="none">
            <Comments className="text-overlay-1 h-[29px] w-[29px]" />
            <span className="text-white">نظرات</span>
          </Button>

          <ClapButton postId={postId} maxClicks={5} count={claps} userClapCount={props.clapUserCount} />

          <p className="mr-auto text-white">3 دقیقه</p>
          <SaveButton postId={postId} isSavedByCurrentUser={isSavedByCurrentUser} />
        </div>
      </footer>
    </article>
  );
}
