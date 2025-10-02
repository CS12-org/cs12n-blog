// import ArticleCategories from '~/components/home/article-categories';
import Posts from '~/components/home/posts';
import WeeklyChallenge from '~/components/home/weekly-challenge';
import { getPosts } from '~/service/posts';

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
  const parsedPage = parseInt(page ?? '1');
  const parsedPageSize = parseInt(pageSize ?? '10');

  const posts = await getPosts({
    page: parsedPage,
    pageSize: parsedPageSize,
  });

  return (
    <div className="flex items-start gap-5">
      {/* <ArticleCategories /> */}

      <div className="grow overflow-hidden">
        <WeeklyChallenge />

        <div aria-hidden className="bg-surface-0 my-5 h-[3px] rounded-full" />

        <Posts page={parsedPage} pageSize={parsedPageSize} posts={posts} />
      </div>
    </div>
  );
}

export default Home;
