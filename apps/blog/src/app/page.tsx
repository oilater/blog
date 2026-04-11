import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './posts/components/PostsList';
import { TagFilter } from './posts/components/TagFilter';
import { Terminal } from './posts/components/Terminal';
import * as styles from './posts/posts.css';

export default function HomePage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <div className={styles.container}>
      <Terminal tags={allTags} posts={allPosts.map((p) => ({ title: p.title, slug: p.slug }))} />
      <TagFilter tags={allTags} />
      <PostsList posts={allPosts.filter((p) => p.tag !== 'LeetCode')} />
    </div>
  );
}
