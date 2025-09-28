import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import Main from '~/layout/main';
import Posts from '~/components/search/posts';
import { searchPosts, mapSearchItemToPostItem } from '~/service/posts';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;

  if (!query) return notFound();

  try {
    const res = await searchPosts(query);

    const mappedItems = res.items.map(mapSearchItemToPostItem);

    // Pagination سمت فرانت
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = mappedItems.slice(start, end);

    return (
      <Main>
        <div aria-hidden className="bg-surface-0 my-5 h-[3px] rounded-full" />
        <Suspense fallback={<p>در حال بارگذاری نتایج...</p>}>
          <Posts
            page={page}
            pageSize={pageSize}
            totalPosts={mappedItems.length}
            posts={paginatedItems}
          />
        </Suspense>
      </Main>
    );
  } catch (error) {
    console.error('Search page error:', error);
    return notFound();
  }
}
