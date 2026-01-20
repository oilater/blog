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

  const getPostData = (filePath: string, fileName: string, tag?: string): PostMetadata => {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContent);
    const stats = fs.statSync(filePath);

    const name = fileName.replace('.md', '');
    return {
      title: data.title || name,
      date: data.date || stats.birthtime,
      slug: tag ? `${tag}/${name}` : name,
      tag,
    };
  };

  const rootFiles = fs.readdirSync(postsDirectory, { withFileTypes: true });
  for (const file of rootFiles) {
    if (file.isFile() && file.name.endsWith('.md')) {
      posts.push(getPostData(path.join(postsDirectory, file.name), file.name));
    }
  }

  const tags = getAllTags();
  for (const tag of tags) {
    const tagDir = path.join(postsDirectory, tag);
    const files = fs.readdirSync(tagDir);

    for (const file of files) {
      if (file.endsWith('.md')) {
        posts.push(getPostData(path.join(tagDir, file), file, tag));
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
