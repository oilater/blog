import dynamic from 'next/dynamic';

const PostSkeleton = dynamic(
  () => import('#velog/skeletons/PostSkeleton'),
);

export default function Loading() {
  return <PostSkeleton />;
}
