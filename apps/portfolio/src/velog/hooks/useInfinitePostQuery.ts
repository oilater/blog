import { useInfiniteQuery } from '@tanstack/react-query';
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
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursor: pageParam, username }),
      });
      return response.json();
    },
    staleTime: 1000 * 60 * 60 * 3,
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => lastPage.nextCursor ?? undefined,
  });
}
