import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();
  const postsWithoutLeetCode = allPosts.filter((p) => p.tag !== 'LeetCode');

  return (
    <>
      <TagFilter tags={allTags} />
      <PostsList posts={postsWithoutLeetCode} />
    </>
  );
}
