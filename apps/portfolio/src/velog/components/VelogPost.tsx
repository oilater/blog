'use client';

import { useEffect, useState } from 'react';
import { useVelogStyle } from '../hooks/usePostStyle';
import type { PostType } from '../types';
import { getRelativeDays } from '../utils/day';
import { Post } from './Post';

export function VelogPost({ post }: { post: PostType }) {
  const [styledContent, setStyledContent] = useState('');
  const { addStyleAsync } = useVelogStyle();

  useEffect(() => {
    addStyleAsync(post.body)
      .then((res) => setStyledContent(res))
      .catch((err) =>
        console.error('포스트 스타일 적용 실패: ', err),
      );
  }, [post.body, addStyleAsync]);

  return (
    <Post>
      <Post.Title title={post.title} />
      <Post.Description
        author="김성현"
        postedAt={getRelativeDays(post.released_at)}
      />
      <Post.Tags tags={post.tags} />
      <Post.Content body={styledContent} />
    </Post>
  );
}
