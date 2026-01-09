import { BlogConfig } from '#/constants/config';
import { getPosts } from '#libs/velog/getPosts';
import { FeedList } from './FeedList';

export default async function Feed() {
  const posts = await getPosts({ username: BlogConfig.velogId });
  const nextCursor = posts.length >= 10 ? posts.at(-1).id : null;

  const initialData = {
    pages: [{ posts, nextCursor }],
    pageParams: [undefined],
  };

  return <FeedList initialData={initialData} />;
}
