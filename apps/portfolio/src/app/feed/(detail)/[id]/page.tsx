import he from 'he';
import { notFound } from 'next/navigation';
import { BlogConfig } from '#/constants/config';
import { getPosts } from '#/libs/velog/getPosts';
import { PostType } from '#/velog/types';
import { getPostBySlug } from '#libs/velog/getPostBySlug';
import { parseMarkdown } from '#libs/velog/parseMarkdown';
import { sanitizeHtml } from '#libs/velog/sanitizeHtml';
import { author, postedAt } from '#velog/components/Detail.css';
import { Post } from '#velog/components/Post';
import { Tag } from '#velog/components/Tag';
import { getRelativeDays } from '#velog/utils/day';
import { vmarkdown } from './PostBody.css';

type PageProps = {
  params: Promise<{ id: string }>;
};

export const revalidate = 600;

export async function generateStaticParams() {
  const posts: PostType[] = await getPosts({
    username: BlogConfig.velogId,
  });

  return posts.map((post) => ({
    id: post.url_slug,
  }));
}

export default async function DetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostBySlug({
    username: BlogConfig.velogId,
    slug: id,
  });

  if (!post) {
    return notFound();
  }

  const decodedBody = he.decode(post?.body);
  const parsed = parseMarkdown(decodedBody);
  const sanitized = sanitizeHtml(parsed);

  return (
    <Post>
      <Post.Title>{post.title}</Post.Title>
      <Post.Description>
        <span className={author}>김성현</span> ∙{' '}
        <span className={postedAt} suppressHydrationWarning>
          {getRelativeDays(post.released_at)}
        </span>
      </Post.Description>
      <Post.Tags>
        <Tag tags={post.tags} />
      </Post.Tags>
      <Post.Content className={vmarkdown}>{sanitized}</Post.Content>
    </Post>
  );
}
