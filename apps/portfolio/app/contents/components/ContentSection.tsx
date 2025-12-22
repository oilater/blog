'use client';

import { useGSAP } from '@gsap/react';
import { animateScroll } from '@repo/interaction/scroll';
import { useAtom } from 'jotai';
import { ReactNode, useRef } from 'react';
import { contentTimeline } from '../../(home)/timelines/content';
import { Top } from '../../components/Top';
import { animationPlayStateAtom } from '../../stores/timeline';
import * as styles from '../../styles/sections/Content.css';

type ContentSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
  sectionClassName?: string;
};

export function ContentSection({
  title,
  description,
  children,
  sectionClassName,
}: ContentSectionProps) {
  const [isPlayed, setIsPlayed] = useAtom(animationPlayStateAtom);
  const containerRef = useRef<HTMLDivElement>(null);
  let contentTl: gsap.core.Timeline;

  useGSAP(
    () => {
      if (isPlayed('content')) return;
      contentTl = contentTimeline().eventCallback('onComplete', () =>
        setIsPlayed('content'),
      );

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
