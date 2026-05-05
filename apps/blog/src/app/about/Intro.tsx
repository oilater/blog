import * as styles from './Intro.css';
import { SectionTitle } from './SectionTitle';

const bullets = [
  'Next, Unity 등 다양한 개발 환경에서 웹/앱 서비스 개발 경험을 쌓아온 1년차 프론트엔드 개발자입니다.',
  '의미 없는 개선보단, 성능 병목을 느낄 때 측정을 통해 시스템을 개선하려 노력합니다.',
  '더 나은 개발자가 되기 위해 CS를 꾸준히 공부하고 있습니다.',
  '성격이 밝고 함께 하는 일을 좋아합니다. 클라이밍과 재즈 피아노를 취미로 갖고 있습니다.',
];

export function Intro() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.photoWrapper}>
        <img src="/images/me.jpg" className={styles.profileImage} alt="김성현" />
      </div>

      <SectionTitle>👋 About me</SectionTitle>

      <ul className={styles.bulletList}>
        {bullets.map((line) => (
          <li key={line} className={styles.bullet}>
            {line}
          </li>
        ))}
      </ul>
    </div>
  );
}
