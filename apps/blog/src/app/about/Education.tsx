import Image from 'next/image';
import * as styles from './Education.css';
import { SectionTitle } from './SectionTitle';

interface EducationData {
  id: number;
  date: string;
  title: string;
  iconUrl?: string;
  intro?: string;
  bullets?: string[];
}

const educationData: EducationData[] = [
  {
    id: 1,
    date: '26. 03 - 28. 02',
    title: '한국방송통신대학교',
    intro:
      'CS 기본기를 다지기 위해 컴퓨터과학과 3학년으로 편입해 전공 과목을 수강하고 있습니다.',
    bullets: ['알고리즘, 운영체제, 디지털 논리회로, 데이터베이스 시스템'],
  },
  {
    id: 2,
    date: '23. 07 - 24. 06',
    title: '삼성 청년 SW 아카데미',
    intro: '전공 Java 트랙에서 웹 개발 교육을 수료했습니다.',
    bullets: [
      '삼성 SW 역량 테스트 모의 A형 취득',
      '팀 프로젝트 3회 수상 (1학기 최우수상 / 2학기 우수상 2회)',
      'SSAFY 공식 기자단 SSAFYcial 활동',
    ],
  },
  {
    id: 3,
    date: '14. 03 - 20. 02',
    title: '성결대학교',
    intro:
      '신학과를 졸업했지만 무교입니다. 졸업 후 수학강사, 재즈 피아노, IT 국비학원, SSAFY 등 다양한 경험을 해보면서 생각하는 과정에 재미를 느껴 개발자의 진로를 선택했습니다.',
    bullets: ['학점: 3.93 / 4.5'],
  },
];

export function Education() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>🎓 Education</SectionTitle>
      <div className={styles.contentSection}>
        {educationData.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.leftColumn}>
              <div className={styles.titleRow}>
                {item.iconUrl ? (
                  <span className={styles.iconWrapper}>
                    <Image
                      src={item.iconUrl}
                      alt={item.title}
                      width={24}
                      height={24}
                      className={styles.icon}
                    />
                  </span>
                ) : (
                  <span className={styles.dot} />
                )}
                <span className={styles.title}>{item.title}</span>
              </div>
              <span className={styles.date}>{item.date}</span>
            </div>
            <div className={styles.rightColumn}>
              {item.intro && <p className={styles.intro}>{item.intro}</p>}
              {item.bullets && (
                <ul className={styles.bulletList}>
                  {item.bullets.map((b) => (
                    <li key={b} className={styles.bullet}>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
