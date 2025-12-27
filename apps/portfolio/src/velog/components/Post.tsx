import * as styles from './Post.css';
import { Tag } from './Tag';

export function Post({ children }: { children: React.ReactNode }) {
  return <div className={styles.wrapper}>{children}</div>;
}

function Title({ title }: { title: string }) {
  return <p className={styles.postTitle}>{title}</p>;
}

function Description({
  author,
  postedAt,
}: {
  author: string;
  postedAt: string;
}) {
  return (
    <p className={styles.description}>
      <span className={styles.author}>{author}</span> ∙{' '}
      <span className={styles.postedAt}>{postedAt}</span>
    </p>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return <Tag tags={tags} />;
}

function Content({ body }: { body: string }) {
  return (
    <div
      className={styles.postContent}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  );
}

Post.Title = Title;
Post.Description = Description;
Post.Tags = Tags;
Post.Content = Content;
