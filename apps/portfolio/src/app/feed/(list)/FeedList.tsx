'use client';

import { InfiniteData } from '@tanstack/react-query';
import { useCallback } from 'react';
import { BlogConfig } from '#/constants/config';
import { useInfiniteScroll } from '#/hooks/useInfiniteScroll';
import { PostType } from '#/velog/types';
import { ListRow } from '#velog/components/ListRow';
import { useInfinitePostQuery } from '#velog/hooks/useInfinitePostQuery';
import { ListSkeleton } from '#velog/skeletons/ListSkeleton';
import { listWrapper, observeContainer } from './style.css';

type QueryResponse = {
  posts: PostType[];
  nextCursor: string | null;
};

type FeedListProps = {
  initialData: InfiniteData<QueryResponse>;
};

export function FeedList({ initialData }: FeedListProps) {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePostQuery({
      username: BlogConfig.velogId,
      initialData,
    });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const { observeRef } = useInfiniteScroll({
    onIntersect: handleIntersect,
    isFetching: isFetchingNextPage,
    rootMargin: '200px',
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  return (
    <div className={listWrapper}>
      {posts.map((post) => (
        <ListRow
          key={post.id}
          post={post}
          link={`/feed/${post.url_slug}`}
        />
      ))}
      <div className={observeContainer} ref={observeRef} />
    </div>
  );
}
