import {
  InfiniteData,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { getPostsClient } from '#libs/velog/getPosts';
import { PostType } from '#velog/types';

type QueryResponse = {
  posts: PostType[];
  nextCursor: string | null;
};

type QueryProps = {
  username?: string;
  initialData?: InfiniteData<QueryResponse>;
};

export function useInfinitePostQuery({
  username = 'oilater',
  initialData,
}: QueryProps = {}) {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      return getPostsClient({
        username,
        cursor: (pageParam as string | null) ?? null,
      });
    },
    initialData,
    staleTime: 60 * 1000,
    gcTime: 1000 * 60 * 2,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
