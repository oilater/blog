'use client';

import { useAtom } from 'jotai';
import { useInfiniteScroll } from '../shared/hooks/useInfiniteScroll';
import { postsStoreAtom } from '../stores/post';
import { VelogPostList } from '../velog/components/VelogPostList';
import { usePostQuery } from '../velog/hooks/usePostQuery';
import { ListSkeleton } from '../velog/skeletons/ListSkeleton';
import { title, wrapper } from './style.css';

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

  if (isLoading && posts.length === 0) {
    return <ListSkeleton />;
  }

  return (
    <div className={wrapper}>
      <h1 className={title}>Feed</h1>
      <VelogPostList posts={posts} ref={observeRef} />
    </div>
  );
}
