'use client';

import Giscus from '@giscus/react';
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';

export function Comments() {
  const { resolvedTheme } = useTheme();
  const pathname = usePathname();
  const decodedPathname = decodeURIComponent(pathname);

  return (
    <Giscus
      repo="oilater/blog"
      repoId="R_kgDOPe3C2w"
      category="Comments"
      categoryId="DIC_kwDOPe3C284C1XJc"
      mapping="specific"
      term={decodedPathname}
      strict="1"
      reactionsEnabled="1"
      emitMetadata="0"
      inputPosition="bottom"
      theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
      lang="ko"
    />
  );
}
