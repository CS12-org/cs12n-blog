'use client';

import { useMemo } from 'react';
import Post from '~/components/home/post';
import { useQuery } from '@tanstack/react-query';
import { getPosts, type GetPostsResult } from '~/service/posts';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '~/components/pagination';

type Props = {
  page: number;
  pageSize: number;
  totalPosts?: number;
  posts: GetPostsResult['items'];
};

function Posts(props: Props) {
  const { page, pageSize, posts, totalPosts = 0 } = props;

  const totalPages = useMemo(() => Math.ceil(totalPosts / pageSize), [totalPosts, pageSize]);

  const pageNumbers = useMemo(() => {
    const pages: (number | string)[] = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) for (let i = 1; i <= totalPages; i++) pages.push(i);
    else {
      pages.push(1);

      if (page > 3) {
        pages.push('...');
      }

      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);

      for (let i = start; i <= end; i++) if (i !== 1 && i !== totalPages) pages.push(i);

      if (page < totalPages - 2) pages.push('...');

      if (totalPages > 1) pages.push(totalPages);
    }

    return pages;
  }, [page, totalPages]);

  const { data } = useQuery({
    initialData: posts,
    queryKey: ['posts', pageSize, page],
    queryFn: () => getPosts({ page, pageSize }).then((res) => res.data.items),
  });

  const postList = (
    <ul className="flex flex-col items-stretch gap-5">
      {data.map((post: GetPostsResult['items'][number]) => (
        <li key={post.id} aria-label={post.title}>
          <Post
            id={post.id}
            slug={post.slug}
            claps={1}
            title={post.title}
            image={post.featuredImage}
            description={post.contentText}
            isSavedByCurrentUser={post.isSavedByCurrentUser}
            tags={post.tags.map((tag) => ({
              id: tag.id,
              slug: tag.slug,
              title: tag.name,
            }))}
          />
        </li>
      ))}
    </ul>
  );

  if (totalPages <= 1) return postList;

  return (
    <>
      {postList}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious isDisabled={page <= 1} href={`?page=${page - 1}`} />
          </PaginationItem>

          {pageNumbers.map((pageNum, index) => (
            <PaginationItem key={index}>
              {pageNum === '...' && <PaginationEllipsis />}

              {pageNum !== '...' && (
                <PaginationLink href={`?page=${pageNum}`} isActive={page === pageNum} isDisabled={page === pageNum}>
                  {pageNum}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext href={`?page=${page + 1}`} isDisabled={page >= totalPages} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  );
}

export default Posts;
