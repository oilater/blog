import { PostType } from '../types';
import { ListRow } from './ListRow';
import { wrapper } from './PostList.css';

type VelogPostListProps = {
  posts: PostType[];
  ref?: React.RefObject<HTMLDivElement | null>;
};

export function VelogPostList({ posts, ref }: VelogPostListProps) {
  return (
    <div className={wrapper}>
      {posts?.map((post) => (
        <ListRow
          key={crypto.randomUUID()}
          post={post}
          link={`/feed/${post.url_slug}`}
        />
      ))}
      {ref && <div ref={ref} />}
    </div>
  );
}
