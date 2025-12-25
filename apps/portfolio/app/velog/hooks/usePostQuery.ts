import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { PostType } from '../types/post';

type UsePostQueryProps = {
  username?: string;
  cursor?: string;
};

const USER_NAME = 'oilater';

export function usePostQuery({
  username = USER_NAME,
  cursor,
}: UsePostQueryProps): UseQueryResult<PostType[], Error> {
  const params = new URLSearchParams({ username });
  if (cursor) params.append('cursor', cursor);

  const query = useQuery({
    queryKey: ['posts', cursor],
    queryFn: async () => {
      const response = await fetch(`/api/posts?${params}`);
      if (!response.ok) {
        throw new Error('포스트를 불러오지 못했어요 🥲');
      }
      return response.json();
    },
    staleTime: 1000 * 60 * 5,
  });

  return query;
}
