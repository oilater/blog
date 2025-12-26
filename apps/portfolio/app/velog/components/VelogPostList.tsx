import { wrapper } from '../styles/PostList.css';
import { PostType } from '../types/post';
import { ListRow } from './ListRow';

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
