'use client';
import { useGSAP } from '@gsap/react';
import { useScrollTrigger } from '@repo/interaction';
import { useAtom } from 'jotai';
import { useRef } from 'react';
import { Top } from '../../components/Top';
import { animationPlayStateAtom } from '../../stores/timeline';
import * as styles from '../../styles/sections/Education.css';
import { contentTimeline } from '../timelines/contentTimeline';

export function Education() {
  const [isPlayed, setIsPlayed] = useAtom(animationPlayStateAtom);
  const { animateScroll } = useScrollTrigger();
  const contentContainer = useRef<HTMLDivElement>(null);
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
    { scope: contentContainer },
  );

  return (
    <div ref={contentContainer} className={styles.wrapper}>
      <hr className={`topHr ${styles.hr}`} />
      <Top>
        <span className="topTitle">What I studied</span>
      </Top>
      <div className={`mainDescription ${styles.mainDescription}`} />
      <div className={`contentSection ${styles.contentSection}`}>
        <div className={styles.educationItem}>
          <div className="education-item item-2">
            <span className={styles.dot} />
            <span>2025.12.12</span>
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationHeader}>
              <span className={styles.educationTitle}>SQLD</span>
            </div>
            <div className={styles.educationDescription}>
              <p>∙ SQL 개발자</p>
            </div>
          </div>
        </div>
        <div className={styles.educationItem}>
          <div className="education-item item-1">
            <span className={styles.dot} />
            <span>23.06-24.07</span>
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationHeader}>
              <span className={styles.educationTitle}>
                삼성 청년 SW 아카데미 10기
              </span>
            </div>
            <div className={styles.educationDescription}>
              <p>
                ∙ 전공 Java 웹 개발 과정 수료, 삼성 SW 역량테스트 모의
                A형 취득
              </p>
              <p>
                ∙ 4번의 팀 프로젝트 경험 (1학기 최우수상, 2학기 우수상
                2회)
              </p>
              <p>
                ∙ React, Flutter, SwiftUI 등 다양한 프레임워크 경험
              </p>
              <p>∙ SSAFYcial 10기 공식 기자단 활동</p>
            </div>
          </div>
        </div>

        <div className={styles.educationItem}>
          <div className="education-item item-2">
            <span className={styles.dot} />
            <span>2024.03.10</span>
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationHeader}>
              <span className={styles.educationTitle}>OPIc</span>
            </div>
            <div className={styles.educationDescription}>
              <p>∙ Intermediate Mid (IM1)</p>
            </div>
          </div>
        </div>

        <div className={styles.educationItem}>
          <div className="education-item item-3">
            <span className={styles.dot} />
            <span>2019.09.28</span>
          </div>
          <div className={styles.educationContent}>
            <div className={styles.educationHeader}>
              <span className={styles.educationTitle}>TOEIC</span>
            </div>
            <div className={styles.educationDescription}>
              <p>∙ 820 점</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
