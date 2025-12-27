'use client';

import { useAtom } from 'jotai';
import { VelogPostList } from '#velog/components/VelogPostList';
import { usePostQuery } from '#velog/hooks/usePostQuery';
import { ListSkeleton } from '#velog/skeletons/ListSkeleton';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';
import { postsStoreAtom } from '../../stores/post';

export default function Feed() {
  const [posts, setPosts] = useAtom(postsStoreAtom);

  const { data: fetchedPosts, isLoading } = usePostQuery({
    cursor: posts?.at(-1)?.id,
  });

  const { observeRef } = useInfiniteScroll({
    onIntersect: () => {
      if (fetchedPosts) setPosts([...posts, ...fetchedPosts]);
    },
  });

  if (isLoading && !posts.length) {
    return <ListSkeleton />;
  }

  return <VelogPostList posts={posts} ref={observeRef} />;
}
