import * as styles from './Intro.css';
import { SectionTitle } from './SectionTitle';

const paragraphs = [
  '안녕하세요, 측정을 기반으로 개선하고 문제의 본질을 파고드는 프론트엔드 개발자 김성현입니다.',
  '누구나 빠르게 만들 수 있는 시대가 되었지만, 그만큼 쓰이지 못하고 버려지는 소프트웨어도 늘었다고 생각합니다. 저는 사회의 문제를 해결하고, 사람들에게 실질적인 도움이 되는 소프트웨어를 만들고 싶습니다. 그래서 먼저 왜 필요한지를 고민하고, 사용자가 불편을 느낄 지점을 찾고, 모바일 환경을 기준으로 성능을 측정하고 개선합니다.',
];

export function Intro() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.photoWrapper}>
        <img src="/images/me.jpg" className={styles.profileImage} alt="김성현" />
      </div>

      <SectionTitle>👋 About me</SectionTitle>

      <div className={styles.paragraphs}>
        {paragraphs.map((line) => (
          <p key={line} className={styles.paragraph}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
