export const dynamicParams = false;

import '../../markdown.css';
import '../../prism-theme.css';
import 'katex/dist/katex.min.css';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import ReactDOM from 'react-dom';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex';
import rehypePrism from 'rehype-prism-plus';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import { formatDate } from '#/lib/date';
import { findLcpImageSrc } from '#/lib/lcp-image';
import { BlogConfig } from '#/constants/config';
import { getAllPosts, getExcerpt, getPost } from '#/lib/posts';
import { rehypeImageSize } from '#/lib/rehype-image-size';
import { Comments } from '../../components/Comments';
import { ReadingProgress } from '../../components/ReadingProgress';
import { Toc } from '../../components/Toc';
import { components } from '../../mdx-components';
import * as styles from '../../post-tag.css';

function hasHeadings(markdown: string) {
  const withoutCode = markdown.replace(/^(```|~~~)[\s\S]*?^\1/gm, '');
  return /^#{1,4} \S/m.test(withoutCode);
}

interface Props {
  params: Promise<{ tag: string; slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag, slug } = await params;
  const post = getPost(tag, slug);
  if (!post) return {};

  const { data, content, tagName, slugDecoded } = post;
  const title: string = data.title || slugDecoded;
  const description: string = data.description || getExcerpt(content) || BlogConfig.description;
  const encodedPath = `${encodeURIComponent(tagName)}/${encodeURIComponent(slugDecoded)}`;
  const url = `/posts/${encodedPath}`;
  const images = [{ url: `/og/${encodedPath}`, width: 1200, height: 630, alt: title }];

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title,
      description,
      siteName: BlogConfig.title,
      locale: 'ko_KR',
      publishedTime: data.date ? new Date(data.date).toISOString() : undefined,
      authors: [BlogConfig.author.name],
      tags: [tagName],
      images,
    },
    twitter: { card: 'summary_large_image', title, description, images },
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
  const post = getPost(tag, slug);
  if (!post) return notFound();

  const { content, data: frontmatter, tagName } = post;

  if (frontmatter.poster) {
    ReactDOM.preload(frontmatter.poster, { as: 'image', fetchPriority: 'high' });
  } else {
    const lcpSrc = findLcpImageSrc(content);
    if (lcpSrc) {
      ReactDOM.preload(lcpSrc, { as: 'image', fetchPriority: 'high' });
    }
  }

  return (
    <div className="markdown-container">
      <PostHeader frontmatter={frontmatter} tag={tagName} />
      <Toc enabled={hasHeadings(content)} />
      <ReadingProgress targetId="post-body" />
      <article id="post-body" className="markdown-body">
        <MDXRemote
          source={content}
          components={components}
          options={{
            mdxOptions: {
              remarkPlugins: [remarkGfm, remarkMath],
              rehypePlugins: [
                rehypeSlug,
                [rehypeAutolinkHeadings, { behavior: 'append' }],
                rehypeKatex,
                [rehypePrism, { showLineNumbers: true, ignoreMissing: true }],
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
