import Link from 'next/link';
import type { PostMetadata } from '#/lib/posts';
import * as styles from '../post-nav.css';

function NavCard({ post, direction }: { post: PostMetadata; direction: 'prev' | 'next' }) {
  const isNext = direction === 'next';

  return (
    <Link href={`/posts/${post.slug}`} className={`${styles.card} ${isNext ? styles.cardNext : ''}`} prefetch={false}>
      <span className={styles.label}>{isNext ? '다음 글 →' : '← 이전 글'}</span>
      <span className={styles.title}>{post.title}</span>
    </Link>
  );
}

export function PostNavigation({ prev, next }: { prev: PostMetadata | null; next: PostMetadata | null }) {
  if (!prev && !next) return null;

  return (
    <nav aria-label="이전 글과 다음 글" className={styles.nav}>
      {prev ? <NavCard post={prev} direction="prev" /> : <span />}
      {next ? <NavCard post={next} direction="next" /> : <span />}
    </nav>
  );
}
