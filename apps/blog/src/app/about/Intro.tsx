import * as styles from './Intro.css';
import { Paragraph } from '#components/Paragraph';
import { SectionTitle } from './SectionTitle';

export function Intro() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.photoWrapper}>
        <img src="/images/me.jpg" className={styles.profileImage} alt="김성현" />
      </div>

      <SectionTitle>👋 Introduce</SectionTitle>
      
      <div className={styles.textSection}>
        <Paragraph>
          안녕하세요! 1년차 프론트엔드 개발자 김성현입니다.
        </Paragraph>
        
        <Paragraph>
          성격이 밝고 기술을 공유하는 걸 좋아하며, 함께 성장하는 가치를 중요하게 생각합니다.
        </Paragraph>
        <Paragraph>
          자료구조, 운영체제 등 CS와 알고리즘을 꾸준히 공부하고 있어요.
          튼튼한 기본기를 바탕으로 더 복잡한 문제를 해결할 수 있는 개발자가 되고 싶습니다.
        </Paragraph>
        <Paragraph>
          최근에는 Vitest에 기여하면서 오픈소스에도 재미를 느끼고 있습니다.
        </Paragraph>
      </div>
    </div>
  );
}
