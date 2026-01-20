import * as styles from './posts.css';

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.container}>{children}</div>;
}
