import { getAllTags, getPostsByTag } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';

interface SearchParams {
  tag?: string;
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<SearchParams> }) {
  const { tag } = await searchParams;
  const allTags = getAllTags();
  const filteredPosts = getPostsByTag(tag);

  return (
    <>
      <TagFilter tags={allTags} selectedTag={tag} />
      <PostsList posts={filteredPosts} />
    </>
  );
}
