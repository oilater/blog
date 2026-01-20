'use client';

import { usePathname } from 'next/navigation';
import { SectionContainer } from './SectionContainer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isArticle = pathname.includes('/contents/');

  if (isArticle) {
    return <div>{children}</div>;
  }
  return <SectionContainer>{children}</SectionContainer>;
}
