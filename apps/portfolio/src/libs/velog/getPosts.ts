type GetPostsArgs = {
  username?: string;
  cursor?: string | null;
  limit?: number;
};

export async function getPosts({
  username = 'oilater',
  cursor,
  limit = 10,
}: GetPostsArgs) {
  const query = `
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

  const res = await fetch('https://v2.velog.io/graphql', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables: {
        username,
        cursor,
        limit,
      },
    }),
    next: { revalidate: 300 },
  });

  const data = await res.json();
  return data?.data?.posts ?? [];
}
