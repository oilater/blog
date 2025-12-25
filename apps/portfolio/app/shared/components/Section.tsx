'use client';

import { useGSAP } from '@gsap/react';
import { animateScroll } from '@repo/interaction/scroll';
import { ReactNode, useRef } from 'react';
import { playSectionAnimation } from '../../(home)/animations/section';
import * as styles from '../../styles/sections/Content.css';
import { Top } from './Top';

type SectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  sectionClassName?: string;
};

export function Section({
  title,
  description,
  children,
  sectionClassName,
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
    <div ref={containerRef} className={styles.wrapper}>
      <hr className={`topHr ${styles.hr}`} />
      <Top>
        <span className="topTitle">{title}</span>
      </Top>

      <div className={`mainDescription ${styles.mainDescription}`}>
        <p>{description}</p>
      </div>

      <div className={`contentSection ${sectionClassName || ''}`}>
        {children}
      </div>
    </div>
  );
}
