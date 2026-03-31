import * as styles from './Education.css';
import { SectionTitle } from './SectionTitle';

interface EducationData {
  id: number;
  date: string;
  title: string;
  descriptions: string[];
}

const educationData: EducationData[] = [
  {
    id: 1,
    date: '26. 03 - Now',
    title: '한국방송통신대학교 (KNOU)',
    descriptions: ['컴퓨터과학과 3학년 편입'],
  },
  {
    id: 2,
    date: '23. 06 - 24. 07',
    title: '삼성 청년 SW 아카데미 10기',
    descriptions: [
      '웹 개발 과정 전공 Java반 수료, 삼성 SW 역량테스트 모의 A형 취득',
      '1학기 프로젝트 최우수상, 6인 팀 프로젝트 우수상 2회',
      'SSAFYcial 10기 공식 기자단 활동',
    ],
  },
];

export function Education() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>🎓 Education</SectionTitle>
      <div className={styles.contentSection}>
        {educationData.map((item) => (
          <div key={item.id} className={styles.educationItem}>
            <div className={styles.dateWrapper}>
              <span className={styles.dot} />
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.educationContent}>
              <span className={styles.educationTitle}>{item.title}</span>
              <div className={styles.educationDescription}>
                {item.descriptions.map((desc) => (
                  <p key={desc}>• {desc}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
