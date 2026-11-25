import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export interface PostMetadata {
  title: string;
  date: string | Date;
  slug: string;
  tag?: string;
}

const postsDirectory = path.join(process.cwd(), 'posts');
const LAST_TAGS = ['LeetCode'];

// 로컬 개발 중에는 작성 중인 글도 미리볼 수 있게 노출한다.
const SHOW_DRAFTS = process.env.NODE_ENV === 'development';

/** `draft: true`이거나 `date`가 없는 글은 아직 배포하지 않는다. */
function isPublished(data: Record<string, unknown>) {
  return data.draft !== true && Boolean(data.date);
}

function getTagDirectories(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
    .map((entry) => entry.name)
    .sort()
    .sort((a, b) => {
      const aLast = LAST_TAGS.includes(a) ? 1 : 0;
      const bLast = LAST_TAGS.includes(b) ? 1 : 0;
      return aLast - bLast;
    });
}

function readPost(filePath: string, fileName: string, tag?: string): PostMetadata | null {
  const { data } = matter(fs.readFileSync(filePath, 'utf8'));
  if (!SHOW_DRAFTS && !isPublished(data)) return null;

  const name = fileName.replace(/\.md$/, '');
  return {
    title: data.title || name,
    date: data.date || fs.statSync(filePath).birthtime,
    slug: tag ? `${tag}/${name}` : name,
    tag,
  };
}

export function getAllPosts(): PostMetadata[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const posts: PostMetadata[] = [];
  const push = (post: PostMetadata | null) => {
    if (post) posts.push(post);
  };

  for (const file of fs.readdirSync(postsDirectory, { withFileTypes: true })) {
    if (file.isFile() && file.name.endsWith('.md')) {
      push(readPost(path.join(postsDirectory, file.name), file.name));
    }
  }

  for (const tag of getTagDirectories()) {
    const tagDir = path.join(postsDirectory, tag);
    for (const file of fs.readdirSync(tagDir)) {
      if (file.endsWith('.md')) {
        push(readPost(path.join(tagDir, file), file, tag));
      }
    }
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** 공개된 글이 하나 이상 있는 태그만 반환한다. */
export function getAllTags(): string[] {
  const tagsWithPosts = new Set(getAllPosts().map((post) => post.tag));
  return getTagDirectories().filter((tag) => tagsWithPosts.has(tag));
}

export function getPostsByTag(tag?: string): PostMetadata[] {
  const allPosts = getAllPosts();
  if (!tag || tag === 'all') {
    return allPosts;
  }
  return allPosts.filter((post) => post.tag === tag);
}
