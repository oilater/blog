import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';
import * as styles from './posts.css';

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <div className={styles.mobileOnly}>
      <TagFilter tags={allTags} />
      <PostsList posts={allPosts} />
    </div>
  );
}
