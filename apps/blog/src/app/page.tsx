import { getAllTags, getPostsByTag } from '#/lib/posts';
import { PostsList } from './posts/components/PostsList';
import { TagFilter } from './posts/components/TagFilter';
import * as styles from './posts/posts.css';

interface SearchParams {
  tag?: string;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { tag } = await searchParams;
  const allTags = getAllTags();
  const filteredPosts = getPostsByTag(tag);

  return (
    <div className={styles.container}>
      <TagFilter tags={allTags} selectedTag={tag} />
      <PostsList posts={filteredPosts} />
    </div>
  );
}
