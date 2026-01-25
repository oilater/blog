import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '#lib/getBlurDataURL';
import * as styles from './Content.css';
import { SectionTitle } from './SectionTitle';

type ContentItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  isInternal: boolean;
};

const CONTENTS: ContentItem[] = [
  {
    id: 1,
    title: '성능에 관심을 갖게 된 계기',
    description: 'Progressive Enhancement 적용하기',
    imageUrl: '/images/performance.avif',
    link: 'https://velog.io/@oilater/portfolio-performance',
    isInternal: false,
  },
  {
    id: 2,
    title: '메타버스 운동 앱 FIVA 이야기',
    description: '구스랩스에서 만든 FIVA를 소개합니다.',
    imageUrl: '/images/fiva_thumbnail.avif',
    link: '/contents/fiva',
    isInternal: true,
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
        <a href={content.link} className={styles.contentLink} target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      )}
    </article>
  );
}

export function Content() {
  return (
    <section className={styles.section}>
      <SectionTitle>📝 Contents</SectionTitle>
      <div className={styles.contentList}>
        {CONTENTS.map((content) => (
          <ImagePostCard key={content.id} content={content} />
        ))}
      </div>
    </section>
  );
}
