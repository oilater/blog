import { ReactNode } from 'react';
import { Top } from '#components/Top';
import { hr, mainDescription, wrapper } from './styles/Section.css';

type SectionProps = {
  title: string;
  description: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Section({
  title,
  description,
  children,
  ...props
}: SectionProps) {
  return (
    <div className={wrapper}>
      <hr className={`topHr ${hr}`} />
      <Top>
        <span className="topTitle">{title}</span>
      </Top>
      <div className={`mainDescription ${mainDescription}`}>
        <p>{description}</p>
      </div>
      <div className={`contentSection ${props.className || ''}`}>
        {children}
      </div>
    </div>
  );
}
