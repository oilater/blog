import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '#lib/getBlurDataURL';
import * as styles from './WorkExperiences.css';
import { SectionTitle } from './SectionTitle';

interface ContentItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isInternal: boolean;
}

interface ExperienceData {
  id: number;
  date: string;
  title: string;
  descriptions: string[];
  statusNote?: string;
  relatedContent?: ContentItem;
}

const experienceData: ExperienceData[] = [
  {
    id: 1,
    date: '25. 10 - 26. 03',
    title: '스퀘어노트 (Squareknot)',
    descriptions: [
      '기프티콘 선물하기/깊카 초기 설계 및 전 과정 개발',
      '컴포넌트 라이브러리 구축 및 Storybook 문서화',
      'AI 워크플로우를 적용해 개발 리드 타임 1개월 이상 단축',
      `잊기 쉬운 반복 업무를 알려주는 '아! 맞다 봇' 개발`,
    ],
  },
  {
    id: 2,
    date: '24. 07 - 25. 03',
    title: '구스랩스 (Goose Labs)',
    descriptions: [
      '삼성전자 C-lab 메타버스 운동 앱 FIVA UI/UX 구현',
      '스와이프 기반 아바타 회전 및 확대/축소 등 3D 기능 개발',
      '동작 인식 AI 기반 미니게임 개발 및 상태 기반 공통 로직 추상화',
    ],
    statusNote: 'FIVA 서비스 종료로 인해 퇴사했습니다',
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
        {experienceData.map((item) => (
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
              {item.statusNote && (
                <p className={styles.statusNote}>• {item.statusNote}</p>
              )}
              {item.relatedContent && (
                <ImagePostCard content={item.relatedContent} />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
