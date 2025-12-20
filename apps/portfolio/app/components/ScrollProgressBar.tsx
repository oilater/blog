'use client';

import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { gsap } from 'gsap';
import { useRef } from 'react';
import {
  progressBar,
  progressBarContainer,
} from '../styles/components/ScrollProgressBar.css';

type ScrollProgressBarProps = {
  trigger?: string;
};

export default function ScrollProgressBar({
  trigger,
}: ScrollProgressBarProps) {
  const progressBarRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const progressBar = progressBarRef.current;

    if (progressBar) {
      ScrollTrigger.create({
        trigger: trigger,
        start: 'top top',
        end: 'bottom bottom',
        onUpdate: (self) => {
          gsap.to(progressBar, {
            width: `${self.progress * 100}%`,
            duration: 0.1,
            ease: 'none',
          });
        },
      });
    }
  }, [trigger]);

  return (
    <div className={progressBarContainer}>
      <div ref={progressBarRef} className={progressBar} />
    </div>
  );
}
