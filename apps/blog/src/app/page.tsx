import type { Metadata } from 'next';
import { Announcement } from '#/components/Announcement';
import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './posts/components/PostsList';
import { TagFilter } from './posts/components/TagFilter';
import * as styles from './posts/posts.css';

export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <div className={styles.container}>
      <Announcement />
      <TagFilter tags={allTags} />
      <PostsList posts={allPosts.filter((p) => p.tag !== 'LeetCode')} />
    </div>
  );
}
