'use client';

import NumberFlow from '@yceffort/number-flow-react';
import { useEffect, useRef, useState } from 'react';
import * as styles from '../reading-progress.css';

function getProgress(target: HTMLElement) {
  const { top, height } = target.getBoundingClientRect();
  const scrollable = height - window.innerHeight;
  if (scrollable <= 0) return top <= 0 ? 1 : 0;

  return Math.min(Math.max(-top / scrollable, 0), 1);
}

export function ReadingProgress({ targetId }: { targetId: string }) {
  const barRef = useRef<HTMLDivElement>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const progress = getProgress(target);
      if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;
      setPercent(Math.round(progress * 100));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const observer = new ResizeObserver(schedule);
    observer.observe(target);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      observer.disconnect();
    };
  }, [targetId]);

  return (
    <div aria-hidden="true">
      <div className={styles.track}>
        <div ref={barRef} className={styles.bar} />
      </div>
      <div className={`${styles.badge} ${percent > 0 ? styles.badgeVisible : ''}`}>
        <NumberFlow value={percent} suffix="%" />
      </div>
    </div>
  );
}
