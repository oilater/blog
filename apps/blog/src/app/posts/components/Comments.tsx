'use client';

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export function Comments() {
  const { resolvedTheme } = useTheme();

  return (
    <Giscus
      repo="oilater/blog"
      repoId="R_kgDOPe3C2w"
      category="Announcements"
      categoryId="DIC_kwDOPe3C284C1XJc"
      mapping="pathname"
      strict="0"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
