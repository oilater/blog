import { Fragment } from 'react';
import Link from 'next/link';
import * as styles from '../posts.css';

const SEPARATED_TAGS = new Set(['LeetCode']);

function TagButton({ tag, isActive }: { tag: string; isActive: boolean }) {
  return (
    <Link
      href={`/posts/${tag}`}
      className={`${styles.tagButton} ${isActive ? styles.tagButtonActive : styles.tagButtonInactive}`}
    >
      #{tag}
    </Link>
  );
}

export function TagFilter({ tags, selectedTag }: { tags: string[]; selectedTag?: string }) {
  if (!tags.length) return null;

  const mainTags = tags.filter((t) => !SEPARATED_TAGS.has(t));
  const extraTags = tags.filter((t) => SEPARATED_TAGS.has(t));

  return (
    <div className={styles.tagFilter}>
      <Link
        href="/posts"
        className={`${styles.tagButton} ${!selectedTag ? styles.tagButtonActive : styles.tagButtonInactive}`}
      >
        All
      </Link>
      {mainTags.map((tag) => (
        <TagButton key={tag} tag={tag} isActive={selectedTag === tag} />
      ))}
      {extraTags.length > 0 && (
        <>
          <span className={styles.tagSeparator}>|</span>
          {extraTags.map((tag) => (
            <TagButton key={tag} tag={tag} isActive={selectedTag === tag} />
          ))}
        </>
      )}
    </div>
  );
}
