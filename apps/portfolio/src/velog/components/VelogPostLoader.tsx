'use client';

import { useSetAtom } from 'jotai';
import { useEffect } from 'react';
import { postsStoreAtom } from '../../app/stores/post';
import { usePostQuery } from '../hooks/usePostQuery';

export function VelogPostLoader() {
  const { data: posts } = usePostQuery({ username: 'oilater' });
  const setPostMap = useSetAtom(postsStoreAtom);

  useEffect(() => {
    if (posts) setPostMap(posts);
  }, [posts, setPostMap]);

  return null;
}
