import { description, wrapper } from './Intro.css';
import { SectionTitle } from './SectionTitle';

export function Intro() {
  return (
    <div className={wrapper}>
      <SectionTitle>👋 about me</SectionTitle>
      <p className={description}>
        안녕하세요, 1년차 프론트엔드 개발자 김성현입니다. 사용자 경험을 개선하며 더 좋은 서비스를 만듭니다.
      </p>
    </div>
  );
}
