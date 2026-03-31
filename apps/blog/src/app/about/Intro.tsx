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
          안녕하세요! 딱 하면 딱! 나오는 프론트엔드 개발자 김성현입니다.
        </Paragraph>
        
        <div className={styles.listSection}>
          <Paragraph>
            • 피드백을 빠르게 수용하고 공유합니다.
          </Paragraph>
          <Paragraph>
            • 어제보다 더 나은 사람이 되고자 기록합니다.
          </Paragraph>
          <Paragraph>
            • 만드는 것보다 ‘나라면 이 제품을 쓸까?’를 더 중요하게 생각합니다.
          </Paragraph>
          <Paragraph>
            • 어려운 문제들을 해결하며 회사와 함께 성장하는 것을 목표로 합니다.
          </Paragraph>
        </div>
      </div>
    </div>
  );
}
