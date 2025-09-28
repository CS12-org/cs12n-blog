import Image from 'next/image';
import { twMerge } from 'tailwind-merge';
import Comments from '~/assets/images/comments.svg';
import SaveButton from '../saved-posts/save-button';
import Button from '~/components/button';
import { Link } from '~/components/react-aria-components';
import { FaHandsClapping } from 'react-icons/fa6';
import ClapButton from '../posts/clap-button';

const colors = ['text-peach', 'text-mauve', 'text-yellow'];

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
  const { id, title, tags, description, image, slug, isSavedByCurrentUser, claps } = props;
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
        <Link href={`/post/${slug}`}>
          <h3 className="text-headline-md lg:text-headline-lg truncate px-2.5 pt-4 pb-2.5">{title}</h3>
        </Link>

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
          <ClapButton postId={id} maxClicks={5} count={claps} userClapCount={props.clapUserCount} />
          <p className="mr-auto text-white">3 دقیقه</p>
          <SaveButton postId={id} isSavedByCurrentUser={isSavedByCurrentUser} />
        </div>
      </footer>
    </article>
  );
}
