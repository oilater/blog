'use client';

import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { ListRow } from '#velog/components/ListRow';
import { useInfinitePostQuery } from '#velog/hooks/useInfinitePostQuery';
import { listWrapper } from './style.css';

export default function Feed() {
  const { data, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useInfinitePostQuery({ username: 'oilater' });
  const { observeRef } = useInfiniteScroll({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    },
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
      <div ref={observeRef} />
    </div>
  );
}
