import type { Metadata } from 'next';
import { Announcement } from '#/components/Announcement';
import { getAllPosts, getAllTags } from '#/lib/posts';
import { PostsList } from './components/PostsList';
import { TagFilter } from './components/TagFilter';

// 홈과 같은 목록이라 홈을 대표 URL로 둔다.
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function PostsPage() {
  const allTags = getAllTags();
  const allPosts = getAllPosts();
  const postsWithoutLeetCode = allPosts.filter((p) => p.tag !== 'LeetCode');

  return (
    <>
      <Announcement />
      <TagFilter tags={allTags} />
      <PostsList posts={postsWithoutLeetCode} />
    </>
  );
}
