'use client';

import Link from 'next/link';
import { getRelativeDays } from '#velog/utils/day';
import { PostType } from '../types';
import * as styles from './List.css';
import { Tag } from './Tag';

export function ListRow({ post }: { post: PostType }) {
  const hasTags = post?.tags && post.tags.length > 0;

  return (
    <Link
      className={styles.card}
      href={`/feed/${post.url_slug}`}
      prefetch={false}
    >
      <div>
        <h2 className={styles.cardTitle}>{post?.title}</h2>
        <p className={styles.cardDescription}>
          {post?.short_description}
        </p>
      </div>
      {hasTags && <Tag tags={post.tags} />}
      <div className={styles.cardFooter}>
        <time className={styles.cardDate}>
          {getRelativeDays(post.released_at)}
        </time>
      </div>
    </Link>
  );
}
