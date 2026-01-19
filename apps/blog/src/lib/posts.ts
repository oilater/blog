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

export function getAllTags(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const entries = fs.readdirSync(postsDirectory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort();
}

export function getAllPosts(): PostMetadata[] {
  const posts: PostMetadata[] = [];

  if (!fs.existsSync(postsDirectory)) {
    return posts;
  }

  const rootFiles = fs.readdirSync(postsDirectory, { withFileTypes: true });
  for (const file of rootFiles) {
    if (file.isFile() && file.name.endsWith('.md')) {
      const filePath = path.join(postsDirectory, file.name);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      posts.push({
        title: data.title || file.name.replace('.md', ''),
        date: data.date || new Date(),
        slug: file.name.replace('.md', ''),
      });
    }
  }

  const tags = getAllTags();
  for (const tag of tags) {
    const tagDir = path.join(postsDirectory, tag);
    const files = fs.readdirSync(tagDir);

    for (const file of files) {
      if (file.endsWith('.md')) {
        const filePath = path.join(tagDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        posts.push({
          title: data.title || file.replace('.md', ''),
          date: data.date || new Date(),
          slug: `${tag}/${file.replace('.md', '')}`,
          tag,
        });
      }
    }
  }

  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

export function getPostsByTag(tag?: string): PostMetadata[] {
  const allPosts = getAllPosts();
  if (!tag || tag === 'all') {
    return allPosts;
  }
  return allPosts.filter((post) => post.tag === tag);
}
