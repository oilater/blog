export const dynamicParams = false;

import '../../markdown.css';
import '../../prism-theme.css';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ReactDOM from 'react-dom';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { formatDate } from '#/lib/date';
import { getAllPosts } from '#/lib/posts';
import { rehypeImageSize } from '#/lib/rehype-image-size';
import { Comments } from '../../components/Comments';
import { components } from '../../mdx-components';
import * as styles from '../../post-tag.css';

interface Props {
  params: Promise<{ tag: string; slug: string }>;
}

function getPostData(tag: string, slug: string) {
  const tagName = decodeURIComponent(tag);
  const slugDecoded = decodeURIComponent(slug);
  const filePath = path.join(process.cwd(), 'posts', tagName, `${slugDecoded}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return { ...matter(fileContent), tagName, slugDecoded, filePath };
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag, slug } = await params;
  const post = getPostData(tag, slug);

  return {
    title: post?.data.title || decodeURIComponent(slug),
  };
}

interface Frontmatter {
  title?: string;
  date?: string | Date;
  poster?: string;
}

function PostHeader({ frontmatter, tag }: { frontmatter: Frontmatter; tag: string }) {
  if (!frontmatter.title) return null;

  return (
    <header className="markdown-header">
      <h1 className="markdown-title">{frontmatter.title}</h1>
      <div className={styles.metaRow}>
        {frontmatter.date && <time className="markdown-date">{formatDate(frontmatter.date)}</time>}
        <Link href={`/posts/${tag}`} className={styles.tagLink}>
          {tag}
        </Link>
      </div>
    </header>
  );
}

export default async function PostPage({ params }: Props) {
  const { tag, slug } = await params;
  const post = getPostData(tag, slug);
  if (!post) return notFound();

  const { content, data: frontmatter, tagName } = post;

  if (frontmatter.poster) {
    ReactDOM.preload(frontmatter.poster, { as: 'image', fetchPriority: 'high' });
  }

  return (
    <div className="markdown-container">
      <PostHeader frontmatter={frontmatter} tag={tagName} />
      <article className="markdown-body">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'append' }],
                [rehypePrism, { showLineNumbers: true }],
                rehypeImageSize,
              ],
            },
          }}
        />
      </article>
      <div className={styles.commentsContainer}>
        <Comments />
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts
    .filter((post) => post.tag)
    .map((post) => {
      const [tag, slug] = post.slug.split('/');
      return { tag, slug };
    });
}
