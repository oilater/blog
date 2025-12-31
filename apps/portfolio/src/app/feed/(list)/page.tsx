import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { getPosts } from '#libs/velog/getPosts';
import { FeedList } from './FeedList';

export default async function Feed() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  });

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const posts = await getPosts({ username: 'oilater' });
      return {
        posts,
        nextCursor:
          posts.length === 10 ? posts[posts.length - 1].id : null,
      };
    },
    initialPageParam: undefined,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <FeedList />
    </HydrationBoundary>
  );
}
