import Image from 'next/image';
import * as styles from './Activities.css';
import { Collapsible } from './Collapsible';
import { SectionTitle } from './SectionTitle';

interface ActivityLink {
  text: string;
  href: string;
}

interface SubSection {
  heading: string;
  body: string;
}

interface ActivityData {
  id: number;
  date: string;
  title: string;
  iconUrl?: string;
  link?: ActivityLink;
  intro?: string;
  summaryBullets?: string[];
  sections?: SubSection[];
}

const activityData: ActivityData[] = [
  {
    id: 1,
    date: '26. 01 - Now',
    title: '함수랑산악회',
    iconUrl: '/images/logos/hamsurang.png',
    link: { text: 'website', href: 'https://hamsurang.dev' },
    intro:
      '입력된 열정이 영향력으로 출력되는 FE 개발 동아리에서 Vite 오픈소스 생태계에 기여하고 있습니다.',
  },
  {
    id: 2,
    date: '25. 11 - 26. 01',
    title: '베타 리더',
    iconUrl: '/images/logos/wikibooks.png',
    link: {
      text: 'blog',
      href: 'https://yceffort.kr/2025/11/web-performance-deep-dive-beta-reader',
    },
    intro:
      '26가지 웹 성능 개선 원리를 다루는 「Web Performance Deep Dive」의 베타 리더로 참여했습니다. 책에서 배운 내용을 실무와 블로그에 적용하며 웹을 바라보는 시야를 넓힐 수 있었습니다.',
  },
  {
    id: 3,
    date: '26. 04 - Now',
    title: 'Recursive',
    iconUrl: '/images/logos/recursive.png',
    link: { text: 'docs', href: 'https://recursive.oilater.com' },
    summaryBullets: [
      '코드 실행 흐름을 시각화하는 알고리즘 학습 도구 기획·개발',
      'Shiki Modular import으로 번들 12MB → 3MB 감소, LCP 개선',
      'PR 번들 크기 비교 GitHub Action 봇 도입',
      '가상 메모리 스택 프레임 구조 참고해 변수 생명주기·클로저 시각화',
    ],
    sections: [
      {
        heading: '만들게 된 계기',
        body: '알고리즘 학습의 장벽을 낮추기 위해 코드 실행 흐름을 단계별로 시각화하는 서비스를 기획하고 개발했습니다. 다국어 및 가이드 문서를 제공해 방문자 수가 200% 증가한 반면 이탈율은 40% 대에서 절반으로 감소했으며, Github Star 24K+를 받은 awesome-algorithms에 소개되는 성과를 얻을 수 있었습니다.',
      },
      {
        heading: '번들 및 성능 개선',
        body: '앱 번들 측정 중, 언어별 하이라이트 기능을 제공하는 Shiki 라이브러리 전체가 포함되어 12MB가 나오는 문제를 발견했습니다. Modular import을 적용해 9MB가 감소한 3MB로 줄일 수 있었고, 자연스럽게 LCP도 개선되었습니다. 이러한 문제의 재발을 막기 위해 PR이 업로드되면 github action 봇이 main 브랜치와의 번들 크기를 비교해 댓글을 달아 변화를 측정할 수 있도록 ci를 개선했습니다.',
      },
      {
        heading: 'UX 개선',
        body: '함수 실행이 끝나도 지역 변수 값이 남아있는 문제가 있었습니다. 이 문제를 해결하기 위해 가상 메모리의 스택 프레임 구조를 참고해 변수의 생명주기를 정확하게 파악할 수 있도록 했습니다. 자연스럽게 상위 스코프를 참조하는 클로저도 UI로 시각화할 수 있었습니다.',
      },
    ],
  },
];

export function Activities() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>🌱 Activities</SectionTitle>
      <div className={styles.contentSection}>
        {activityData.map((item) => {
          const hasSections = item.sections && item.sections.length > 0;

          return (
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
                {item.link && (
                  <a
                    href={item.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.link}
                  >
                    {item.link.text}
                  </a>
                )}
                <span className={styles.date}>{item.date}</span>
              </div>
              <div className={styles.rightColumn}>
                {item.intro && <p className={styles.intro}>{item.intro}</p>}
                {item.summaryBullets && (
                  <ul className={styles.bulletList}>
                    {item.summaryBullets.map((b) => (
                      <li key={b} className={styles.bullet}>
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {hasSections && (
                  <Collapsible>
                    {item.sections?.map((section) => (
                      <div key={section.heading} className={styles.subSection}>
                        <h3 className={styles.subHeading}>{section.heading}</h3>
                        <p className={styles.subBody}>{section.body}</p>
                      </div>
                    ))}
                  </Collapsible>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
