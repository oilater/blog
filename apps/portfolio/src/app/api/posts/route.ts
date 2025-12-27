import { NextResponse } from 'next/server';

const LIMIT_PER_REQUEST = 10;

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');
    const cursor = url.searchParams.get('cursor') ?? null;

    if (!username) {
      return NextResponse.json(
        { error: 'username is required' },
        { status: 400 },
      );
    }

    const query = `
      query Posts($username: String!, $cursor: ID, $limit: Int) {
        posts(username: $username, cursor: $cursor, limit: $limit) {
          id
          title
          short_description
          body
          url_slug
          tags
          released_at
        }
      }
    `;

    const variables = {
      username,
      cursor: cursor || null,
      limit: LIMIT_PER_REQUEST,
    };

    const response = await fetch('https://v2.velog.io/graphql', {
      method: 'POST',
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=3600',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      console.error(
        `Velog API error: ${response.status} ${response.statusText}`,
      );
      return NextResponse.json(
        { error: 'Failed to fetch from Velog API' },
        { status: response.status },
      );
    }

    const data = await response.json();

    if (data.errors) {
      console.error('GraphQL errors:', data.errors);
      return NextResponse.json(
        { error: 'GraphQL query failed', details: data.errors },
        { status: data.errors[0].extensions.code },
      );
    }

    return NextResponse.json(data.data.posts);
  } catch (error) {
    console.error('Velog API route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
