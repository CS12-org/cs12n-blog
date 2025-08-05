"use client";
import { useSession } from "next-auth/react";
import ArticleCategories from "~/components/home/article-categories";
import Post from "~/components/home/post";
import WeeklyChallenge from "~/components/home/weekly-challenge";

function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div className="flex items-start gap-5">
      <ArticleCategories />

      <div className="grow overflow-hidden">
        <WeeklyChallenge />

        <div aria-hidden className="h-[3px] bg-surface-0 my-5 rounded-full" />

        <ul className="flex flex-col items-stretch gap-5">
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
          <li>
            <Post />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Home;
