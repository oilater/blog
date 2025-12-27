'use client';

import { useState } from 'react';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { ListRow } from '#velog/components/ListRow';
import { usePostQuery } from '#velog/hooks/usePostQuery';
import type { PostType } from '#velog/types';
import { wrapper } from './FeedClient.css';

type FeedClientProps = {
  initialPosts: PostType[];
};

export function FeedClient({ initialPosts }: FeedClientProps) {
  const [posts, setPosts] = useState(initialPosts);
  const cursor = posts.at(-1)?.id;

  const { data: loadedPosts } = usePostQuery({ cursor });
  const { observeRef } = useInfiniteScroll({
    onIntersect: () => {
      if (loadedPosts?.length) {
        setPosts((prevPosts) => [...prevPosts, ...loadedPosts]);
      }
    },
  });

  return (
    <div className={wrapper}>
      {posts?.map((post) => (
        <ListRow
          key={crypto.randomUUID()}
          post={post}
          link={`/feed/${post.url_slug}`}
        />
      ))}
      <div ref={observeRef} />
    </div>
  );
}
