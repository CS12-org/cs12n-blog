


import Save from "~/assets/images/save.svg";
import Stopwatch from "~/assets/images/stopwatch.svg";
import { Post } from "~/service/post";

type SavedPostListProps = {
  posts?: Post[];
};

export default function SavedPostList({ posts = [] }: SavedPostListProps) {
  if (!posts.length) {
    return <p className="text-center text-subtext-1">هیچ پست ذخیره شده‌ای وجود ندارد.</p>;
  }

  return (
    <section className="flex flex-col gap-[10px]">
      {posts.map((post) => (
        <section
          key={post.id}
          className="px-[20px] py-[10px] bg-crust text-white flex justify-between rounded-[10px] items-center"
        >
          <h2>{post.title}</h2>
          <section className="flex gap-[10px]">
            <button className="bg-base rounded-full flex items-center justify-center w-[38px] h-[38px]">
              <Stopwatch />
            </button>
            <button className="bg-base rounded-[5px] flex items-center justify-center  w-[38px] h-[38px]">
              <Save
                stroke="#8AADF4"
                fill="#8AADF4"
                className="h-[28px] w-[28px]"
              />
            </button>
          </section>
        </section>
      ))}
    </section>
  );
}

