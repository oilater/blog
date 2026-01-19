type GetPostsArgs = {
  username?: string;
  cursor?: string | null;
  limit?: number;
};

const VELOG_GRAPHQL_QUERY = `
  query Posts($username: String!, $cursor: ID, $limit: Int) {
    posts(username: $username, cursor: $cursor, limit: $limit) {
      id
      title
      short_description
      url_slug
      tags
      released_at
    }
  }
`;

async function fetchVelogPosts(url: string, { username, cursor, limit = 10 }: GetPostsArgs) {
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: VELOG_GRAPHQL_QUERY,
      variables: { username, cursor, limit },
    }),
    next: { revalidate: 60 * 10 },
  });

  const data = await res.json();
  return data?.data?.posts ?? [];
}

export async function getPosts(args: GetPostsArgs) {
  return fetchVelogPosts('https://v2.velog.io/graphql', args);
}

export async function getPostsClient(args: GetPostsArgs) {
  const posts = await fetchVelogPosts('/api/velog/graphql', args);
  const nextCursor = posts.length === 10 ? posts[posts.length - 1]?.id : null;
  return { posts, nextCursor };
}
