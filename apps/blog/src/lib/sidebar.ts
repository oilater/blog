import { clamp } from 'es-toolkit';
import type { PostMetadata } from './posts';

// ── 순수 함수: URL 파싱 ──

export function parsePathSegments(pathname: string): string[] {
  return pathname
    .replace('/posts', '')
    .split('/')
    .filter(Boolean)
    .map(decodeURIComponent);
}

export function extractTagFromPath(pathname: string, tags: string[]): string | null {
  const segments = parsePathSegments(pathname);
  if (segments.length !== 1 || !segments[0]) return null;
  return tags.includes(segments[0]) ? segments[0] : null;
}

export function isRootPostsPath(pathname: string): boolean {
  return parsePathSegments(pathname).length === 0;
}

// ── 순수 함수: 포스트 필터링 ──

export function filterByTag(posts: PostMetadata[], tag: string | null): PostMetadata[] {
  return tag ? posts.filter((p) => p.tag === tag) : posts;
}

export function findPostIndex(posts: PostMetadata[], pathname: string): number {
  return posts.findIndex((p) => pathname === `/posts/${p.slug}`);
}

// ── 순수 함수: 커서 이동 ──

export function moveIndex(current: number, delta: number, max: number): number {
  return clamp(current + delta, 0, max);
}

export function postUrl(posts: PostMetadata[], index: number): string | null {
  const post = posts[index];
  return post ? `/posts/${post.slug}` : null;
}
