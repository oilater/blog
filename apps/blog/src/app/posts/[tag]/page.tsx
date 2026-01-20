import { notFound } from 'next/navigation';
import { getAllTags, getPostsByTag } from '#/lib/posts';
import { PostsList } from '../components/PostsList';
import { TagFilter } from '../components/TagFilter';

interface Props {
  params: Promise<{ tag: string }>;
}

export default async function TagPostsPage({ params }: Props) {
  const { tag } = await params;
  const tagName = decodeURIComponent(tag);
  const allTags = getAllTags();

  if (!allTags.includes(tagName)) {
    return notFound();
  }

  const filtered = getPostsByTag(tagName);

  return (
    <>
      <TagFilter tags={allTags} selectedTag={tagName} />
      <PostsList posts={filtered} />
    </>
  );
}

export async function generateStaticParams() {
  const tags = getAllTags();

  return tags.map((tag) => ({ tag }));
}
