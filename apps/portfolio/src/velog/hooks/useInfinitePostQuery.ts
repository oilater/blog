import { useInfiniteQuery } from '@tanstack/react-query';
import { getPostsClient } from '#libs/velog/getPosts';
import { PostType } from '#velog/types';

type QueryProps = {
  username?: string;
};

type QueryResponse = {
  posts: PostType[];
  nextCursor: string | null;
};

export function useInfinitePostQuery({
  username = 'oilater',
}: QueryProps) {
  return useInfiniteQuery<QueryResponse>({
    queryKey: ['posts'],
    queryFn: async ({ pageParam }) => {
      return getPostsClient({
        username,
        cursor: (pageParam as string | null) ?? null
      });
    },
    staleTime: 1000 * 60 * 60 * 3,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
