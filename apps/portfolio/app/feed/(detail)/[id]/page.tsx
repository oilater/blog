'use client';

import { useAtomValue } from 'jotai';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { getPostBySlug } from '../../../stores/post';
import { VelogPost } from '../../../velog/components/VelogPost';
import Loading from './loading';

export default function DetailPage() {
  useEffect(() => window.scrollTo(0, 0), []);

  const { id } = useParams<{ id: string }>();
  const getPost = useAtomValue(getPostBySlug);
  const post = getPost(id);

  if (!post) return <Loading />;

  return <VelogPost post={post} />;
}
