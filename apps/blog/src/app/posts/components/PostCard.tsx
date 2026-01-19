import Link from 'next/link';
import { formatDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import * as styles from '../posts.css';

export function PostCard({ post }: { post: PostMetadata }) {
  // slug는 "태그/파일명" 형태이므로 각 부분을 인코딩
  const encodedSlug = post.slug.split('/').map(encodeURIComponent).join('/');

  return (
    <article className={styles.postCard}>
      <Link href={`/posts/${encodedSlug}`} className={styles.postLink} prefetch={false}>
        <div className={styles.postHeaderRow}>
          <h2 className={styles.postTitle}>{post.title}</h2>
          {post.tag && <span className={styles.postTagBadge}>{post.tag}</span>}
        </div>
        <time className={styles.postDate}>{formatDate(post.date)}</time>
      </Link>
    </article>
  );
}
