import * as styles from './Tag.css';

type TagProps = {
  tags: string[];
};

export function Tag({ tags }: TagProps) {
  return (
    <div className={styles.tags}>
      {tags.map((tag) => (
        <span key={tag} className={styles.tag}>
          {tag}
        </span>
      ))}
    </div>
  );
}
