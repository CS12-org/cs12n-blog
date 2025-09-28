import { notFound } from 'next/navigation';
import Posts from '~/components/home/posts';
import { searchPosts, mapSearchItemToPostItem } from '~/service/posts';

interface SearchPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

export const revalidate = 60;

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = typeof searchParams.query === 'string' ? searchParams.query : '';
  const page = parseInt(searchParams.page as string) || 1;
  const pageSize = parseInt(searchParams.pageSize as string) || 10;

  if (!query) return notFound();

  try {
    const res = await searchPosts(query);

    // Pagination سمت سرور
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    const paginatedItems = res.items.slice(start, end).map(mapSearchItemToPostItem);

    return (
      <section>
        <div aria-hidden className="bg-surface-0 my-5 h-[3px] rounded-full" />
        <Posts
          page={page}
          pageSize={pageSize}
          totalPosts={res.items.length}
          posts={paginatedItems}
        />
      </section>
    );
  } catch (error) {
    console.error('Search page error:', error);

    // Fallback: صفحه بدون خطا رندر شود
    return (
      <section>
        <p className="text-center text-text mt-10">هیچ نتیجه‌ای پیدا نشد.</p>
      </section>
    );
  }
}
