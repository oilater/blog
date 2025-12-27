import { NextResponse } from 'next/server';
import { getPosts } from '#libs/velog/getPosts';

export async function POST(req: Request) {
  try {
    const { username, cursor } = await req.json();
    const posts = await getPosts({ username, cursor });

    if (!posts) {
      return NextResponse.json(
        { error: 'Failed to fetch' },
        { status: 500 },
      );
    }

    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
