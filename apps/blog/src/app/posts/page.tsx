import { getAllTags, getPostsByTag } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';
import * as styles from './posts.css';

interface SearchParams {
  tag?: string;
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { tag } = await searchParams;
  const allTags = getAllTags();
  const filteredPosts = getPostsByTag(tag);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Posts</h1>
      <TagFilter tags={allTags} selectedTag={tag} />
      <PostsList posts={filteredPosts} />
    </div>
  );
}
