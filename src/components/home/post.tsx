import { FaComments, FaHandsClapping, FaRegBookmark } from "react-icons/fa6";
import { twMerge } from "tailwind-merge";
import PostExampleImg from "~/assets/images/post-example.png";
import Button from "~/components/button";
import { Link } from "~/components/react-aria-components";
import Image from "next/image";

const items = ["#بش", "#اسکریپت", "#شل_اسکریپت", "#ترمینال"];
const colors = ["text-peach", "text-mauve", "text-yellow"];

function Post() {
  return (
    <article className="rounded-xl overflow-hidden bg-crust">
      <header>
        <Link href="#" className="block w-full">
          <Image className="w-full" src={PostExampleImg} alt="post" />
        </Link>
      </header>
      <main>
        <Link href="#">
          <h3 className="text-headline-md lg:text-headline-lg px-2.5 pt-4 pb-2.5 truncate">
            یادگیری بش اسکریپت قسمت اول
          </h3>
        </Link>

        <div className="bg-mantle py-2.5 flex items-stretch">
          <div aria-hidden className="w-[5px] shrink-0 bg-teal rounded-full" />
          <p className="truncate text-subtext-0 grow px-2.5">
            در این قسمت ما در مورد ترمینال ها و اطلاعات این چنینی یاد میگیریم،
            مطالبی که به ما کمک میکند و این یک متن بلند است برای تست
          </p>
        </div>
      </main>
      <footer className="pt-7 px-2.5 pb-5 text-body-xs">
        <ul className="flex items-baseline gap-2.5 mb-4">
          {items.map((item, index) => (
            <li
              key={item}
              className={twMerge(
                colors[(index - 1) % colors.length],
                "first-of-type:bg-surface-2 first-of-type:text-text",
                "first-of-type:rounded first-of-type:px-2.5",
                "first-of-type:py-0.5 hover:brightness-110",
                "active:brightness-90 transition-[filter]",
              )}
            >
              <Link href="#">{item}</Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-5">
          <Button className="flex items-center gap-1.5" variant="none">
            <FaComments size={20} className="text-overlay-1" />
            <span className="pt-1.5 text-white">نظرات</span>
          </Button>

          <Button className="flex items-center gap-1.5" variant="none">
            <FaHandsClapping size={20} className="text-overlay-1" />
            <span className="pt-1.5 text-white">52</span>
          </Button>

          <p className="pt-1.5 text-white mr-auto">3 دقیقه</p>
          <Button variant="none">
            <FaRegBookmark size={16} className="text-overlay-1" />
          </Button>
        </div>
      </footer>
    </article>
  );
}

export default Post;
