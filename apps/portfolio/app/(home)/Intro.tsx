'use client';

import { playIntroAnimation } from '@animations/intro';
import { useGSAP } from '@gsap/react';
import { useRef } from 'react';
import {
  baseTitle,
  title,
  titleOrigin,
  titleSection,
  wrapper,
} from './Intro.css';

export function Intro() {
  const introScope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      playIntroAnimation().play();
    },
    { scope: introScope },
  );

  return (
    <div ref={introScope} className={wrapper}>
      <div className={`introTitleSection ${titleSection}`}>
        <h1 className={`introTitle ${baseTitle} ${titleOrigin}`}>
          안녕하세요,
          <br />
          프론트엔드 개발자
          <br />
          <span className="subTitle">김성현</span>입니다.
        </h1>
        <h1 className={`introTitleFill ${baseTitle} ${title}`}>
          안녕하세요,
          <br />
          프론트엔드 개발자
          <br />
          <span className="subTitle">김성현</span>입니다.
        </h1>
      </div>
    </div>
  );
}
