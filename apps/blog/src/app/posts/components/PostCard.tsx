import Link from 'next/link';
import { formatDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import * as styles from '../posts.css';

export function PostCard({ post }: { post: PostMetadata }) {
  return (
    <article className={styles.postCard}>
      <Link href={`/posts/${post.slug}`} className={styles.postLink} prefetch={false}>
        <div className={styles.postHeaderRow}>
          <h2 className={styles.postTitle}>{post.title}</h2>
        </div>
        <time className={styles.postDate}>{formatDate(post.date)}</time>
        {post.tag && <span className={styles.postTagBadge}>{post.tag}</span>}
      </Link>
    </article>
  );
}
