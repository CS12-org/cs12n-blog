import { twMerge } from "tailwind-merge";
import Button from "~/components/button";
import { Link } from "~/components/react-aria-components";
import Image from "next/image";
import Comments from "~/assets/images/comments.svg";
import Save from "~/assets/images/save.svg"
const colors = ["text-peach", "text-mauve", "text-yellow"];

type Props = {
  title: string;
  claps: number;
  description: string;
  slug: string;
  tags: { id: number; title: string; slug: string }[];
  image: { url: string; width: number; height: number };
};

function Post(props: Props) {
  const { title, tags, description, claps, image, slug } = props;

  return (
    <article className="rounded-xl overflow-hidden bg-crust">
      <header>
        <Link href={`/post/${slug}`} className="block w-full">
          <Image
            alt={title}
            src={image.url}
            width={image.width}
            height={image.height}
            className="w-full h-auto"
          />
        </Link>
      </header>
      <main>
        <Link href={`/post/${slug}`}>
          <h3 className="text-headline-md lg:text-headline-lg px-2.5 pt-4 pb-2.5 truncate">
            {title}
          </h3>
        </Link>

        <div className="bg-mantle py-2.5 flex items-stretch">
          <div aria-hidden className="w-[5px] shrink-0 bg-teal rounded-full" />
          <p className="truncate text-subtext-0 grow px-2.5">{description}</p>
        </div>
      </main>
      <footer className="pt-7 px-[10px] pb-5 text-body-xs">
        <ul className="flex items-baseline gap-2.5 mb-4">
          {tags.map((item, index) => (
            <li
              key={item.id}
              className={twMerge(
                colors[(index - 1) % colors.length],
                "first-of-type:bg-surface-2 first-of-type:text-text",
                "first-of-type:rounded first-of-type:px-2.5",
                "first-of-type:py-0.5 hover:brightness-110",
                "active:brightness-90 transition-[filter]"
              )}
            >
              <Link href={`/tags/${item.slug}`}>{item.title}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Button className="flex items-center gap-1.5" variant="none">
            <Comments  className="text-overlay-1 w-[29px] h-[29px]" />
            <span className="pt-1.5 text-white">نظرات</span>
          </Button>
{/* 
          <Button className="flex items-center gap-1.5" variant="none">
            <FaHandsClapping size={20} className="text-overlay-1" />
            <span className="pt-1.5 text-white">{claps}</span>
          </Button> */}

          <p className="pt-1.5 text-white mr-auto">3 دقیقه</p>
          <Button variant="none">
            <Save className="text-overlay-1 w-[27px] h-[27px]" />
          </Button>
        </div>
      </footer>
    </article>
  );
}

export default Post;
