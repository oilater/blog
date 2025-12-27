'use client';

import { playSectionAnimation } from '@animations/section';
import { Top } from '@components/Top';
import { useGSAP } from '@gsap/react';
import { animateScroll } from '@repo/interaction/scroll';
import { ReactNode, useRef } from 'react';
import { hr, mainDescription, wrapper } from './Section.css';

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
  const containerRef = useRef<HTMLDivElement>(null);
  let contentTl: gsap.core.Timeline;

  useGSAP(
    () => {
      contentTl = playSectionAnimation();

      animateScroll({
        target: '.topHr',
        timeline: contentTl,
        options: {
          start: 'top 85%',
          end: 'bottom 100%',
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className={wrapper}>
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
