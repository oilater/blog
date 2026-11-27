import Link from 'next/link';
import { formatDotDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import * as styles from '../posts.css';
import { PostThumbnail } from './PostThumbnail';

export function PostCard({ post }: { post: PostMetadata }) {
  return (
    <article>
      <Link href={`/posts/${post.slug}`} className={styles.postLink} prefetch={false}>
        <span className={styles.postBody}>
          <span className={styles.postMeta}>
            {post.tag && <span className={styles.postTagBadge}>{post.tag}</span>}
            <time className={styles.postDate}>{formatDotDate(post.date)}</time>
          </span>
          <h2 className={styles.postTitle}>{post.title}</h2>
          {post.description && <p className={styles.postExcerpt}>{post.description}</p>}
        </span>
        <PostThumbnail src={post.thumbnail} icon={post.icon} />
      </Link>
    </article>
  );
}
