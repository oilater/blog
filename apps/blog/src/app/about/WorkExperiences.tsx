import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '#lib/getBlurDataURL';
import * as styles from './WorkExperiences.css';
import { Collapsible } from './Collapsible';
import { SectionTitle } from './SectionTitle';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isInternal: boolean;
}

interface SubSection {
  heading: string;
  body: string;
}

interface SubBullet {
  text: string;
  href?: string;
}

interface Bullet {
  text: string;
  children?: SubBullet[];
}

interface Project {
  title: string;
  bullets: Bullet[];
}

interface ExperienceData {
  id: number;
  date: string;
  title: string;
  role?: string;
  iconUrl?: string;
  projects?: Project[];
  intro?: string;
  sections?: SubSection[];
  statusNote?: string;
  relatedContent?: ContentItem;
}

const experienceData: ExperienceData[] = [
  {
    id: 1,
    date: '2026.08 - 현재',
    title: '드림에이스',
    role: '스마트인프라팀',
    iconUrl: '/images/logos/drimaes.png',
    projects: [
      {
        title: '자동화 물류창고(WCS) 모니터링 시스템 개발과 성능 개선',
        bullets: [
          { text: 'YES24 자동화 물류창고의 3D 실시간 화면, 대시보드 요구사항 개발' },
          { text: 'Unity WebGL 빌드 시 Brotli 압축을 적용해 전송량 65MB에서 44MB로 32% 감소' },
          { text: 'Unity 로드 전 도착한 실시간 이벤트를 큐에 보관했다가 준비 시점에 전달해 데이터 유실을 방지' },
          {
            text: '데스크톱의 부팅 지연의 원인을 파악해 Windows 운영체제를 HDD에서 SSD로 이전해 해결',
            children: [
              {
                text: '전원이 꺼졌는데 어떻게 0과 1을 기억할 수 있을까? - HDD·SSD의 원리',
                href: '/posts/궁금증/0과-1은-어떻게-랜선으로-전달될까-2',
              },
            ],
          },
        ],
      },
      {
        title: '자동차 제어 소프트웨어(ECU)를 실차 없이 시뮬레이션하는 서비스 개발',
        bullets: [
          { text: 'GS(Good Software) 인증 대응 및 디자인 일원화' },
          { text: '드래그 지연 문제를 성능 모니터링으로 분석해 JS 실행시간을 73%(3.71초 → 1초) 단축하고, JS 힙 메모리에 리스너가 계속 쌓이던 문제를 해결' },
          { text: 'RAG 기반 AI 챗봇의 기능 설계부터 개발을 주도' },
          { text: '도메인 초심자를 위한 가이드 문서 작성 및 사내 스터디 진행' },
        ],
      },
    ],
  },
  {
    id: 2,
    date: '2025.10 - 2026.03 (6개월)',
    title: '스퀘어노트',
    role: '개발팀',
    iconUrl: '/images/logos/squareknot.png',
    projects: [
      {
        title: '기프티콘을 카드와 함께 선물하는 앱 서비스 개발',
        bullets: [
          {
            text: '기프티콘과 카드를 결합해 선물하는 GIFCA 앱 프론트엔드 전체 개발',
            children: [{ text: '카카오 JavaScript SDK 초기화 문서의 개선 제안' }],
          },
          { text: '서버 상태 관리를 위해 Tanstack Query를 도입해 상황별 캐싱 전략을 수립' },
          { text: 'Query Factory 패턴을 통해 쿼리 키를 계층적으로 관리' },
          { text: 'Bundlephobia와 next-bundle-analyzer로 번들 크기를 체크하는 문화를 만들고 CI로 관리' },
        ],
      },
    ],
    intro:
      "모바일 쿠폰 중계 회사의 신규 B2C 서비스 '깊카'(기프티콘 선물하기 앱)의 프론트엔드를 설계부터 배포까지 담당했습니다. 더 많은 사용자와 도전적인 도메인에서 성장하고자 이직을 결심했습니다.",
    sections: [
      {
        heading: 'UI 라이브러리',
        body: '반복적인 UI 작업을 줄이기 위해 컴포넌트 라이브러리와 Storybook을 배포했습니다. 처음에는 의욕이 앞서 여러 필터가 포함된 Searchbar처럼 도메인에서 관리해야 할 상태까지 다루도록 만들었지만 재사용이 어려워 UI 상태만 책임지도록 재설계했습니다. 섣부른 추상화는 오히려 관리 포인트를 늘릴 수 있다는 점을 배웠습니다.',
      },
      {
        heading: '서버 상태 관리',
        body: 'URL을 기준으로 서버 데이터를 페칭하는 구조에서, 같은 데이터를 반복 요청하는 비효율을 줄이기 위해 캐싱 전략이 필요했습니다. TanStack Query를 도입해 서버 상태를 일원화했고, 페이지 특성에 맞춰 갱신 주기를 설정해 불필요한 네트워크 요청을 최소화했습니다. 쿼리 키를 찾아다니는 불편함을 없애기 위해 팩토리 패턴으로 관리의 응집도를 높여 계층적 관리와 무효화를 편하게 할 수 있도록 했습니다.',
      },
      {
        heading: '성능 개선 문화',
        body: '리소스는 디자인보단 성능 자산으로 관리했습니다. RSC를 최대한 활용해 하이드레이션 비용을 줄이고, Bundlephobia와 next-bundle-analyzer를 통해 번들 크기를 체크하는 문화를 만들 수 있었습니다.',
      },
    ],
  },
  {
    id: 3,
    date: '2024.07 - 2025.03 (9개월)',
    title: '구스랩스',
    role: '개발팀',
    iconUrl: '/images/logos/goose-labs.png',
    projects: [
      {
        title: '메타버스 AI 운동 앱 서비스 개발',
        bullets: [
          { text: '삼성전자 사내벤처 C-Lab에서 스핀오프한 FIVA 메타버스 운동 앱 서비스 개발(Unity)' },
          { text: '사용자들의 피드백을 반영해 3D 아바타 회전 및 확대 축소 기능 구현' },
          { text: '운동 챌린지 일정을 보여주는 인앱 캘린더, 운동 탭 전체 개편 등 UI 구현' },
          { text: 'AI 미니 게임을 개발. 공통 로직을 추상화하고 속도, 동작 인식 임계값 등은 DB로 관리해 실시간 튜닝' },
        ],
      },
    ],
    statusNote: '서비스 종료 및 폐업',
    intro:
      'SSAFY 채용 박람회를 통해 삼성전자 사내벤처 스타트업(C-lab)에 합류해, 메타버스 AI 운동 앱 FIVA를 개발했습니다. 2025년 3월 서비스가 종료되면서 팀원들과 함께 퇴사했습니다.',
    sections: [
      {
        heading: '3D 아바타 회전, 확대 및 UI 구현',
        body: '사용자 피드백을 반영해 아바타 회전·확대/축소 기능을 구현했습니다. 다양한 아바타 서비스 레퍼런스를 사용해보며 디테일한 인터렉션을 구현해 좋은 피드백을 들을 수 있었습니다. 주로 UI 개발을 담당하며 인앱 챌린지 캘린더, 2D 위에 3D 모션 아바타를 함께 보여주는 운동 탭 전체 개편 등 다양한 화면을 구현했습니다.',
      },
      {
        heading: 'AI 운동 게임 개발',
        body: '동작 인식 AI를 활용해 스쿼트를 멈추면 괴물이 쫓아오는 스키 게임, 팔 운동을 멈추면 날갯짓이 멈추는 비행 게임을 개발했습니다. 새로운 게임을 빠르게 추가할 수 있도록 게임 상태 기반의 공통 로직을 추상화해 개발 기간을 1개월 이상 단축했고, 속도와 동작 인식 임계값 같은 파라미터를 Realtime DB로 관리해 배포 없이 실시간 튜닝이 가능하도록 했습니다. 매주 200명이 넘는 유저가 플레이했습니다.',
      },
    ],
    relatedContent: {
      id: 1,
      title: '메타버스 운동 앱 FIVA 이야기',
      description: '구스랩스에서 만든 FIVA를 소개합니다.',
      imageUrl: '/images/fiva_thumbnail.avif',
      link: '/contents/fiva',
      isInternal: true,
    },
  },
];

async function ImagePostCard({ content }: { content: ContentItem }) {
  const blurDataURL = await getBlurDataURL(content.imageUrl);

  const inner = (
    <>
      <div className={styles.imageWrapper}>
        <Image
          src={content.imageUrl}
          alt={content.title}
          fill
          className={styles.image}
          placeholder="blur"
          blurDataURL={blurDataURL}
        />
      </div>
      <div className={styles.contentInfo}>
        <h3 className={styles.contentTitle}>{content.title}</h3>
        <p className={styles.contentDescription}>{content.description}</p>
      </div>
    </>
  );

  return (
    <article className={styles.imagePostCard}>
      {content.isInternal ? (
        <Link href={content.link} className={styles.contentLink}>
          {inner}
        </Link>
      ) : (
        <a
          href={content.link}
          className={styles.contentLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          {inner}
        </a>
      )}
    </article>
  );
}

export function WorkExperiences() {
  return (
    <section className={styles.wrapper}>
      <SectionTitle>💼 Work Experiences</SectionTitle>
      <div className={styles.contentSection}>
        {experienceData.map((item) => {
          const hasDetails =
            item.intro || (item.sections && item.sections.length > 0) || item.relatedContent;

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
                {item.role && <span className={styles.role}>{item.role}</span>}
                <span className={styles.date}>{item.date}</span>
              </div>
              <div className={styles.rightColumn}>
                {item.projects?.map((project) => (
                  <div key={project.title} className={styles.project}>
                    <h3 className={styles.projectTitle}>{project.title}</h3>
                    <ul className={styles.bulletList}>
                      {project.bullets.map((b) => (
                        <li key={b.text} className={styles.bullet}>
                          {b.text}
                          {b.children && (
                            <ul className={styles.subBulletList}>
                              {b.children.map((c) => (
                                <li key={c.text} className={styles.subBullet}>
                                  {c.href ? (
                                    <Link href={c.href} className={styles.subBulletLink}>
                                      {c.text}
                                    </Link>
                                  ) : (
                                    c.text
                                  )}
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                {hasDetails && (
                  <Collapsible>
                    {item.intro && <p className={styles.intro}>{item.intro}</p>}
                    {item.sections?.map((section) => (
                      <div key={section.heading} className={styles.subSection}>
                        <h3 className={styles.subHeading}>{section.heading}</h3>
                        <p className={styles.subBody}>{section.body}</p>
                      </div>
                    ))}
                    {item.relatedContent && (
                      <ImagePostCard content={item.relatedContent} />
                    )}
                  </Collapsible>
                )}
                {item.statusNote && (
                  <p className={styles.statusNote}>{item.statusNote}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
