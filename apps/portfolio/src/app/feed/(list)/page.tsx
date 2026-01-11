import { Suspense } from 'react';
import { BlogConfig } from '#/constants/config';
import { ListSkeleton } from '#/velog/skeletons/ListSkeleton';
import { getPosts } from '#libs/velog/getPosts';
import { FeedList } from './FeedList';

export default async function Feed() {
  const posts = await getPosts({ username: BlogConfig.velogId });
  const nextCursor = posts.length >= 10 ? posts.at(-1).id : null;

  const initialData = {
    pages: [{ posts, nextCursor }],
    pageParams: [undefined],
  };

  return (
    <Suspense fallback={<ListSkeleton />}>
      <FeedList initialData={initialData} />
    </Suspense>
  );
}
