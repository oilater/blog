'use client';

import { useGSAP } from '@gsap/react';
import { animateScroll } from '@repo/interaction/scroll';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { animationPlayStateAtom } from '../../stores/timeline';
import {
  contactContainer,
  contactItem,
  contactLabel,
  contactValue,
  outroSection,
  thankTitle,
  wrapper,
} from '../../styles/sections/Outro.css';
import { outroTimeline } from '../timelines/outro';

export function Outro() {
  const [isPlayed, setIsPlayed] = useAtom(animationPlayStateAtom);
  const outroContainer = useRef<HTMLDivElement>(null);
  let outroTl: gsap.core.Timeline;

  useGSAP(
    () => {
      if (isPlayed('content')) return;
      outroTl = outroTimeline().eventCallback('onComplete', () =>
        setIsPlayed('content'),
      );

      animateScroll({
        target: '.outroTitle',
        timeline: outroTl,
        options: {
          start: 'top 85%',
          end: 'bottom 100%',
        },
      });
    },
    { scope: outroContainer },
  );

  return (
    <div ref={outroContainer} className={wrapper}>
      <div className={`outroTitle ${thankTitle}`}>
        <p>감사합니다</p>
        <p>더 궁금한 점이 있다면</p>
        <p>편하게 연락주세요</p>
      </div>

      <div className={`outroSection ${outroSection}`}>
        <div className={contactContainer}>
          <div className={contactItem}>
            <span className={contactLabel}>전화번호</span>
            <span className={contactValue}>010-2717-6906</span>
          </div>

          <div className={contactItem}>
            <span className={contactLabel}>이메일</span>
            <span className={contactValue}>oilater@naver.com</span>
          </div>

          <div className={contactItem}>
            <span className={contactLabel}>Linkedin</span>
            <a
              href="https://www.linkedin.com/in/seonghyeonkim"
              target="_blank"
              rel="noopener noreferrer"
              className={contactValue}
            >
              Seonghyeon Kim
            </a>
          </div>
          <div className={contactItem}>
            <span className={contactLabel}>Github</span>
            <a
              href="https://github.com/oilater"
              target="_blank"
              rel="noopener noreferrer"
              className={contactValue}
            >
              @oilater
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
