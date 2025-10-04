import { notFound } from 'next/navigation';
import Posts from '@/components/home/posts';
import { searchPosts } from '@/service/posts';

interface SearchPageProps {
  searchParams: Promise<{
    page?: string;
    pageSize?: string;
    query?: string;
  }>;
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { page, pageSize, query } = await searchParams;

  // Check if page and pageSize are numbers and not NaN
  const parsedPage = parseInt(page ?? '1');
  const parsedPageSize = parseInt(pageSize ?? '10');

  if (!query) return notFound();

  const res = (await searchPosts({ query, page: parsedPage, pageSize: parsedPageSize })) ?? [];

  // Pagination سمت سرور

  return (
    <section>
      <div aria-hidden className="bg-surface-0 my-5 h-[3px] rounded-full" />
      {res.length > 0 && (
        <Posts posts={res} query={query} page={parsedPage} totalPosts={res.length} pageSize={parsedPageSize} />
      )}

      {res.length === 0 && <p className="text-headline-md text-overlay-1 text-center">هیچ پستی پیدا نشد</p>}
    </section>
  );
}
