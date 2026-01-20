import type { PostMetadata } from '#/lib/posts';
import * as styles from '../posts.css';
import { PostCard } from './PostCard';

function Empty() {
  return <div className={styles.noPosts}>아직 작성된 포스트가 없어요 🥲</div>;
}

export function PostsList({ posts }: { posts: PostMetadata[] }) {
  if (!posts.length) return <Empty />;

  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
