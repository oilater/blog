import * as styles from './post-tag.css';
import './markdown.css';
import './prism-theme.css';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { formatDate } from '#/lib/date';
import { getAllPosts } from '#/lib/posts';
import { components } from './mdx-components';

interface Props {
  params: Promise<{ slug: string[] }>;
}

interface Frontmatter {
  title?: string;
  date?: string | Date;
}

function PostHeader({ frontmatter, tag }: { frontmatter: Frontmatter; tag?: string }) {
  if (!frontmatter.title) return null;

  return (
    <header className="markdown-header">
      <div className={styles.tagHeaderRow}>
        <h1 className="markdown-title">{frontmatter.title}</h1>
        {tag && (
          <Link href={`/posts?tag=${tag}`} className={styles.tagLink}>
            {tag}
          </Link>
        )}
      </div>
      {frontmatter.date && <time className="markdown-date">{formatDate(frontmatter.date)}</time>}
    </header>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = Array.isArray(slug) ? slug.map((s) => decodeURIComponent(s)) : [decodeURIComponent(slug)];
  const relativePath = decodedSlug.join('/');
  const filePath = path.join(process.cwd(), 'posts', `${relativePath}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data: frontmatter } = matter(fileContent);
    const tag = decodedSlug.length > 1 ? decodedSlug[0] : undefined;

    return (
      <div className="markdown-container">
        <PostHeader frontmatter={frontmatter} tag={tag} />
        <article className="markdown-body">
          <MDXRemote
            source={content}
            components={components}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                  rehypeSlug,
                  [rehypeAutolinkHeadings, { behavior: 'wrap' }],
                  [rehypePrism, { showLineNumbers: true }],
                ],
              },
            }}
          />
        </article>
      </div>
    );
  } catch {
    return notFound();
  }
}

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug.split('/'),
  }));
}
