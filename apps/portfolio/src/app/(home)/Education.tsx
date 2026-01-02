import { Top } from '#components/Top';
import * as styles from './Education.css';

interface EducationData {
  id: number;
  date: string;
  title: string;
  descriptions: string[];
}

const educationData: EducationData[] = [
  {
    id: 1,
    date: '2025.12.24',
    title: '정보처리기사',
    descriptions: ['∙ 한국산업인력공단'],
  },
  {
    id: 2,
    date: '2025.12.12',
    title: 'SQLD',
    descriptions: ['∙ 한국데이터산업진흥원'],
  },
  {
    id: 3,
    date: '23.06-24.07',
    title: '삼성 청년 SW 아카데미 10기',
    descriptions: [
      '∙ 전공 Java 웹 개발 과정 수료, 삼성 SW 역량테스트 모의 A형 취득',
      '∙ 4번의 팀 프로젝트 경험 (1학기 최우수상, 2학기 우수상 2회)',
      '∙ React, Flutter, SwiftUI 등 다양한 프레임워크 경험',
      '∙ SSAFYcial 10기 공식 기자단 활동',
    ],
  },
  {
    id: 4,
    date: '2024.03.10',
    title: 'OPIc',
    descriptions: ['∙ Intermediate Mid (IM1)'],
  },
  {
    id: 5,
    date: '2019.09.28',
    title: 'TOEIC',
    descriptions: ['∙ 820 점'],
  },
];

export function Education() {
  return (
    <div className={styles.wrapper}>
      <hr className={styles.hr} />
      <Top>
        <span>What I studied</span>
      </Top>
      <div className={styles.mainDescription} />
      <div className={styles.contentSection}>
        {educationData.map((item) => (
          <div key={item.id} className={styles.educationItem}>
            <div>
              <span className={styles.dot} />
              <span>{item.date}</span>
            </div>
            <div className={styles.educationContent}>
              <div className={styles.educationHeader}>
                <span className={styles.educationTitle}>
                  {item.title}
                </span>
              </div>
              <div className={styles.educationDescription}>
                {item.descriptions.map((desc) => (
                  <p key={desc}>{desc}</p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
