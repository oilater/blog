import * as styles from './Certifications.css';
import { SectionTitle } from './SectionTitle';

interface CertificationData {
  id: number;
  date: string;
  title: string;
  issuer: string;
}

const certificationData: CertificationData[] = [
  {
    id: 1,
    date: '2025. 12',
    title: '정보처리기사',
    issuer: '한국산업인력공단',
  },
  {
    id: 2,
    date: '2025. 12',
    title: 'SQLD',
    issuer: '한국데이터산업진흥원',
  },
  {
    id: 3,
    date: '2021. 09',
    title: '한국사능력검정 1급',
    issuer: '국사편찬위원회',
  },
];

export function Certifications() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>🪪 Certifications</SectionTitle>
      <div className={styles.contentSection}>
        {certificationData.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.leftColumn}>
              <div className={styles.titleRow}>
                <span className={styles.dot} />
                <span className={styles.title}>{item.title}</span>
              </div>
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.rightColumn}>
              <p className={styles.issuer}>{item.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
