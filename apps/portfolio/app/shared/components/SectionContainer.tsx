import type { ReactNode } from 'react';
import { container } from '../../styles/components/SectionContainer.css';

export function SectionContainer({
  children,
}: {
  children: ReactNode;
}) {
  return <div className={container}>{children}</div>;
}
