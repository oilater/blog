'use client';

import { useState } from 'react';
import { useInfiniteScroll } from 'src/hooks/useInfiniteScroll';
import { VelogPostList } from '#velog/components/VelogPostList';
import { usePostQuery } from '#velog/hooks/usePostQuery';
import type { PostType } from '#velog/types';

type FeedClientProps = {
  initialPosts: PostType[];
};

export function FeedClient({
  initialPosts,
}: FeedClientProps) {
  const [posts, setPosts] = useState(initialPosts);

  const cursor = posts.at(-1)?.id;

  const { data, isFetching } = usePostQuery({
    cursor,
  });

  const { observeRef } = useInfiniteScroll({
    onIntersect: () => {
      if (data?.length) {
        setPosts((prev) => [...prev, ...data]);
      }
    },
  });

  return <VelogPostList posts={posts} ref={observeRef} />;
}
