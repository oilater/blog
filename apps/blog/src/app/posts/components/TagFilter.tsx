import Link from 'next/link';
import * as styles from '../posts.css';

export function TagFilter({ tags, selectedTag }: { tags: string[]; selectedTag?: string }) {
  if (!tags.length) return null;

  return (
    <div className={styles.tagFilter}>
      <Link
        href="/posts"
        prefetch={false}
        className={`${styles.tagButton} ${!selectedTag ? styles.tagButtonActive : styles.tagButtonInactive}`}
      >
        All
      </Link>
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/posts/${tag}`}
          className={`${styles.tagButton} ${selectedTag === tag ? styles.tagButtonActive : styles.tagButtonInactive}`}
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
}
