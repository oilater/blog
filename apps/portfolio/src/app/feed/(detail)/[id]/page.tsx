import { notFound } from 'next/navigation';
import { getPostBySlug } from '#libs/velog/getPostBySlug';
import { VelogPost } from '#velog/components/VelogPost';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function DetailPage({ params }: PageProps) {
  const { id } = await params;
  const post = await getPostBySlug(id);

  if (!post) {
    return notFound();
  }

  return <VelogPost post={post} />;
}
