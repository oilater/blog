'use client';

import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { ListRow } from '#velog/components/ListRow';
import { useInfinitePostQuery } from '#velog/hooks/useInfinitePostQuery';
import { ListSkeleton } from '#velog/skeletons/ListSkeleton';
import { listWrapper, observeContainer } from './style.css';

export default function Feed() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePostQuery({ username: 'oilater' });
  const { observeRef } = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
    rootMargin: '800px',
  });

  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (!posts.length) {
    return <ListSkeleton />;
  }

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
