import Link from 'next/link';
import { PostType } from '../types';
import { getRelativeDays } from '../utils/day';
import * as styles from './List.css';
import { Tag } from './Tag';

type ListRowProps = {
  post: PostType;
  link: string;
};

export function ListRow({ post, link }: ListRowProps) {
  const hasTags = post?.tags && post.tags.length > 0;

  return (
    <Link className={styles.card} href={link} prefetch={false}>
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
