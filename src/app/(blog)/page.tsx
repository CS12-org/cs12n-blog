import ArticleCategories from "~/components/home/article-categories";
import Post from "~/components/home/post";
import WeeklyChallenge from "~/components/home/weekly-challenge";
import { getPosts } from "~/service/posts";

export const revalidate = 60;

type Props = {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
  }>;
};

async function Home(props: Props) {
  const { page, pageSize } = await props.searchParams;

  // Check if page and pageSize are numbers and not NaN
  const parsedPage = parseInt(page ?? "1") || 1;
  const parsedPageSize = parseInt(pageSize ?? "10") || 10;

  const { data: posts } = await getPosts({
    page: parsedPage,
    pageSize: parsedPageSize,
  });

  return (
    <div className="flex items-start gap-5">
      <ArticleCategories />

      <div className="grow overflow-hidden">
        <WeeklyChallenge />

        <div aria-hidden className="h-[3px] bg-surface-0 my-5 rounded-full" />

        <ul className="flex flex-col items-stretch gap-5">
          {posts.data.map((post) => (
            <li key={post.id} aria-label={post.title}>
              <Post
                title={post.title}
                image={post.featured_image}
                tags={post.tags}
                // TODO: replace with post.claps
                claps={5}
                // TODO: replace with post.content
                description="در این قسمت ما در مورد ترمینال ها و اطلاعات این چنینی یاد میگیریم، مطالبی که به ما کمک میکند و این یک متن بلند است برای تست"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
