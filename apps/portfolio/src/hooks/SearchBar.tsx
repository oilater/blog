import { useQuery } from '@tanstack/react-query';

function SearchBar({ query }: { query: string }) {
  const { data: posts } = useQuery({
    queryKey: ['search', query],
    queryFn: async ({ signal }) => {
      const res = await fetch(`/api/search?q=${query}`, {
        signal,
      });
      return res.json();
    },
  });

  return <SearchResults data={posts} />;
}

function SearchResults({ data }: { data: string[] }) {
  return <div></div>;
}
