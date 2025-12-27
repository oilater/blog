import { getPosts } from '#libs/velog/getPosts';
import { FeedClient } from './components/FeedClient';

export default async function Feed() {
  const initialPosts = await getPosts({ cursor: null });

  return <FeedClient initialPosts={initialPosts} />;
}
