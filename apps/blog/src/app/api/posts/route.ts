import { NextResponse } from 'next/server';
import { getPosts } from '#libs/velog/getPosts';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, cursor } = body;

    if (!username) {
      return NextResponse.json(
        { error: 'Username is required' },
        { status: 400 },
      );
    }

    const posts = (await getPosts({ username, cursor })) || [];

    const lastPost =
      posts.length > 0 ? posts[posts.length - 1] : null;
    const nextCursor = posts.length === 10 ? lastPost?.id : null;

    return NextResponse.json({
      posts,
      nextCursor,
    });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
