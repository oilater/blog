import Link from 'next/link';
import { formatDotDate } from '#/lib/date';
import type { PostMetadata } from '#/lib/posts';
import * as styles from '../posts.css';

function ChevronRight() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

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
        <span className={styles.postChevron}>
          <ChevronRight />
        </span>
      </Link>
    </article>
  );
}
