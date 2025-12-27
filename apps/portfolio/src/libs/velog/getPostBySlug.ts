import { type PostType } from '#velog/types';

type GetPostBySlugArgs = {
  username?: string;
  slug: string;
};

export async function getPostBySlug({
  username = 'oilater',
  slug,
}: GetPostBySlugArgs): Promise<PostType | null> {
  const decodedSlug = decodeURIComponent(slug);

  const query = `
    query Post($username: String!, $slug: String!) {
      post(username: $username, url_slug: $slug) {
        id
        title
        body
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
        slug: decodedSlug,
      },
    }),
    next: { revalidate: 60 * 60 * 24 * 7 },
  });

  if (!res.ok) return null;
  const data = await res.json();

  if (data.errors) {
    console.error('Velog GraphQL errors:', data.errors);
  }

  return data?.data?.post ?? null;
}
