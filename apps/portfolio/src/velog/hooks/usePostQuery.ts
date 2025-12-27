import { useQuery } from '@tanstack/react-query';

type UsePostQueryProps = {
  cursor?: string;
  username?: string;
};

export function usePostQuery({
  cursor,
  username = 'oilater',
}: UsePostQueryProps) {
  return useQuery({
    queryKey: ['posts', cursor],
    queryFn: async () => {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cursor, username }),
      });

      if (!response.ok)
        throw new Error('포스트를 불러오지 못했어요 🥲');
      return response.json();
    },
  });
}
