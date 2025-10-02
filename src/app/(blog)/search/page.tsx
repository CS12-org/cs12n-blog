import { notFound } from 'next/navigation';
import Posts from '~/components/home/posts';
import { searchPosts, mapSearchItemToPostItem } from '~/service/posts';

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

  const res = await searchPosts(query);
  res.items ??= [];

  // Pagination سمت سرور
  const start = (parsedPage - 1) * parsedPageSize;
  const end = start + parsedPageSize;
  const paginatedItems = res.items.slice(start, end).map(mapSearchItemToPostItem);

  return (
    <section>
      <div aria-hidden className="bg-surface-0 my-5 h-[3px] rounded-full" />
      {paginatedItems.length > 0 && (
        <Posts
          page={parsedPage}
          pageSize={parsedPageSize}
          query={query}
          totalPosts={res.items.length}
          posts={paginatedItems}
        />
      )}

      {paginatedItems.length === 0 && <p className="text-headline-md text-overlay-1 text-center">هیچ پستی پیدا نشد</p>}
    </section>
  );
}
