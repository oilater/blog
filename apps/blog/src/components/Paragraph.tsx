import type { ReactNode } from 'react';
import { paragraph } from './styles/Paragraph.css';

type ParagraphProps = {
  children: ReactNode;
};

export function Paragraph({ children }: ParagraphProps) {
  return <p className={paragraph}>{children}</p>;
}
