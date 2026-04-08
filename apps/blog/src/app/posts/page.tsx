import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';
import { Terminal } from './components/Terminal';

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();

  return (
    <>
      <Terminal tags={allTags} posts={allPosts.map((p) => ({ title: p.title, slug: p.slug }))} />
      <TagFilter tags={allTags} />
      <PostsList posts={allPosts} />
    </>
  );
}
