import * as styles from './Post.css';
import { Tag } from './Tag';

export function Post({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}

function Title({ children }: { children: React.ReactNode }) {
  return <h1 className={styles.postTitle}>{children}</h1>;
}

function Description({ children }: { children: React.ReactNode }) {
  return <div className={styles.description}>{children}</div>;
}

function Tags({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function Content({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`${styles.postContent} ${className}`}
      dangerouslySetInnerHTML={{ __html: children as string }}
    />
  );
}

Post.Title = Title;
Post.Description = Description;
Post.Tags = Tags;
Post.Content = Content;
