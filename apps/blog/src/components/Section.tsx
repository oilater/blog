import { ReactNode } from 'react';
import { Top } from '#components/Top';
import { hr, mainDescription, wrapper } from './styles/Section.css';

type SectionProps = {
  title: string;
  description: string;
  children: ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export function Section({ title, description, children, ...props }: SectionProps) {
  return (
    <div className={wrapper}>
      <hr className={hr} />
      <Top>{title}</Top>
      <div className={mainDescription}>
        <p>{description}</p>
      </div>
      <div className={props.className}>{children}</div>
    </div>
  );
}
