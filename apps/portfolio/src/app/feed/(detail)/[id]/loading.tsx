import dynamic from 'next/dynamic';

const PostSkeleton = dynamic(
  () => import('#velog/skeletons/PostSkeleton'),
  { ssr: true },
);

export default function Loading() {
  return <PostSkeleton />;
}
