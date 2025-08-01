import { Link } from "~/components/react-aria-components";
import PostExampleImg from "~/assets/images/post-example.png";

function Post() {
  return (
    <article className="rounded-xl overflow-hidden bg-crust">
      <header>
        <Link href="#" className="block w-full">
          <img className="w-full" src={PostExampleImg.src} alt="post" />
        </Link>
      </header>
      <main>
        <Link href="#">
          <h3 className="text-headline-md lg:text-headline-lg px-5 pt-4 pb-2.5 truncate">
            یادگیری بَش اسکریپت قسمت اول
          </h3>
        </Link>

        <div className="bg-mantle py-2.5 flex items-stretch">
          <span
            aria-hidden
            className="block w-[5px] shrink-0 bg-teal rounded-full"
          />
          <p className="truncate text-subtext-0 grow px-2.5">
            در این قسمت ما در مورد ترمینال ها و اطلاعات این چنینی یاد میگیریمِ،
            مطالبی که به ما کمک میکند و این یک متن بلند است برای تست
          </p>
        </div>
      </main>
    </article>
  );
}

export default Post;
