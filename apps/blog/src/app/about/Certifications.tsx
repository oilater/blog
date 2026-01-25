import * as styles from './Certifications.css';
import { SectionTitle } from './SectionTitle';

interface CertificationData {
  id: number;
  date: string;
  title: string;
  descriptions: string[];
}

const certificationData: CertificationData[] = [
  {
    id: 1,
    date: '2025. 12',
    title: '정보처리기사',
    descriptions: ['한국산업인력공단'],
  },
  {
    id: 2,
    date: '2025. 12',
    title: 'SQLD',
    descriptions: ['한국데이터산업진흥원'],
  },
  {
    id: 3,
    date: '23.6 - 24.7',
    title: '삼성 청년 SW 아카데미 10기',
    descriptions: [
      '웹 개발 과정 전공반 수료, 삼성 SW 역량테스트 모의 A형 취득',
      '2인 팀 프로젝트 최우수상, 6인 팀 프로젝트 우수상 2회',
      'SSAFYcial 10기 공식 기자단 활동',
    ],
  },
];

export function Certifications() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>🪪 Certifications</SectionTitle>
      <div className={styles.contentSection}>
        {certificationData.map((item) => (
          <div key={item.id} className={styles.educationItem}>
            <div className={styles.dateWrapper}>
              <span className={styles.dot} />
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.educationContent}>
              <span className={styles.educationTitle}>{item.title}</span>
              <div className={styles.educationDescription}>
                {item.descriptions.map((desc) => (
                  <p key={desc}>{desc}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
