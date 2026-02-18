import { Paragraph } from '#components/Paragraph';
import { emphasis, wrapper } from './Intro.css';
import { SectionTitle } from './SectionTitle';

export function Intro() {
  return (
    <div className={wrapper}>
      <SectionTitle>👋 Introduce</SectionTitle>
      <Paragraph>안녕하세요, VSCode보다 개발자 도구를 먼저 여는 프론트엔드 개발자 김성현입니다.</Paragraph>
      <Paragraph>모바일 환경에서도 유저가 빠르다고 느낄 수 있는 서비스를 만듭니다.</Paragraph>
      <br />
      <Paragraph>
        친구들에게 <span className={emphasis}>'술 먹은 날에 스터디카페 가는 사람은 처음 본다'</span>는 얘기를 들을
        정도로 개발과 배우는 걸 좋아합니다. 최근에는 'Web Performance Deep Dive'의 베타 리더로 활동했으며, FE 개발
        동아리 함수랑산악회에서 번들러에 관해 공부하고 있습니다.
      </Paragraph>
    </div>
  );
}
