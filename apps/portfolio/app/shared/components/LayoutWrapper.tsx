'use client';

import { usePathname } from 'next/navigation';
import { BlogConfig } from '../../../config';
import { FloatingNav } from './FloatingNav';
import { Footer } from './Footer';
import { NavIcon } from './NavIcon';
import { SectionContainer } from './SectionContainer';

export function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isArticle = pathname.includes('/contents/');

  return (
    <>
      <FloatingNav>
        {BlogConfig.menu.map((link) => (
          <NavIcon
            key={link.label}
            href={link.path}
            label={link.label}
          />
        ))}
      </FloatingNav>

      {isArticle ? (
        <div>{children}</div>
      ) : (
        <SectionContainer>
          {children}
          <Footer />
        </SectionContainer>
      )}
    </>
  );
}
