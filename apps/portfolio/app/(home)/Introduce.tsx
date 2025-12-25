'use client';

import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import { IMAGES } from '../constants/images';
import { InfoCard } from '../shared/components/InfoCard';
import {
  infoSection,
  introduceWrapper,
  mainDescription,
} from '../styles/sections/Introduce.css';
import { playIntroduceAnimation } from './animations/introduce';

export function Introduce() {
  const introduceScope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      playIntroduceAnimation().play();
    },
    { scope: introduceScope },
  );

  return (
    <div ref={introduceScope} className={introduceWrapper}>
      <div className={mainDescription}>
        <p>React를 중심으로 웹 프론트엔드를 개발합니다.</p>
        <p>UX/DX에 높은 가치를 두고 있습니다.</p>
      </div>

      <div className={`info-section ${infoSection}`}>
        <div className="info-1">
          <InfoCard
            title="모던 프론트엔드 개발"
            description="자바스크립트의 동작 원리에 대해 관심이 많고, 
            유연하게 재사용할 수 있는 컴포넌트를 만드는 것을 좋아합니다. 
            배운 내용들은 블로그에 정리하고 있습니다."
            image={IMAGES.LANGUAGES}
            isHighPriority={true}
          />
        </div>
        <div className="info-2">
          <InfoCard
            title="웹 성능과 사용자 경험"
            description="인터렉션 시스템을 개발하면서 웹 성능에 관심을 가지게 되었습니다. 
            성능 측정 도구를 통해 LCP를 개선하며 Progressive Enhancement 원칙을 적용해 개선하고 있습니다."
            image={IMAGES.PERFORMANCE}
          />
        </div>
        <div className="info-3">
          <InfoCard
            title="커뮤니케이션 및 협업"
            description="Git Flow를 통한 협업 경험을 바탕으로 Git 이슈를 해결에 능숙합니다. 
            슬랙, 노션, Jira 등 협업 도구를 사용해보았고, 코드리뷰 문화를 좋아합니다."
            image={IMAGES.COMMUNICATION}
          />
        </div>
      </div>
    </div>
  );
}
