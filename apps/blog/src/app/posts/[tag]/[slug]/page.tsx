import '../../markdown.css';
import '../../prism-theme.css';
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
import { components } from '../../mdx-components';
import * as styles from '../../post-tag.css';

interface Props {
  params: Promise<{ tag: string; slug: string }>;
}

interface Frontmatter {
  title?: string;
  date?: string | Date;
}

function PostHeader({ frontmatter, tag, tagSlug }: { frontmatter: Frontmatter; tag: string; tagSlug: string }) {
  if (!frontmatter.title) return null;

  return (
    <header className="markdown-header">
      <div className={styles.tagHeaderRow}>
        <h1 className="markdown-title">{frontmatter.title}</h1>
        <Link href={`/posts/${tagSlug}`} className={styles.tagLink}>
          {tag}
        </Link>
      </div>
      {frontmatter.date && <time className="markdown-date">{formatDate(frontmatter.date)}</time>}
    </header>
  );
}

export default async function PostPage({ params }: Props) {
  const { tag, slug } = await params;
  const tagSlug = decodeURIComponent(tag);
  const slugDecoded = decodeURIComponent(slug);
  const tagName = tagSlug;
  const fileName = slugDecoded;
  const filePath = path.join(process.cwd(), 'posts', tagName, `${fileName}.md`);

  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { content, data: frontmatter } = matter(fileContent);

    return (
      <div className="markdown-container">
        <PostHeader frontmatter={frontmatter} tag={tagName} tagSlug={tagSlug} />
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

  return posts
    .filter((post) => post.tag)
    .map((post) => {
      const [tag, slug] = post.slug.split('/');
      return { tag, slug };
    });
}
