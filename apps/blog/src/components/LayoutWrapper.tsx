'use client';

import { usePathname } from 'next/navigation';
import { Footer } from './Footer';
import { SectionContainer } from './SectionContainer';

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isArticle = pathname.includes('/contents/');

  if (isArticle) {
    return <div>{children}</div>;
  }
  return (
    <SectionContainer>
      {children}
      <Footer />
    </SectionContainer>
  );
}
