import Image from 'next/image';
import Link from 'next/link';
import { getBlurDataURL } from '#libs/getBlurDataUrl';
import { ContentData } from '../app/contents/articles/types';
import * as styles from './styles/WideCard.css';

export async function WideCard({ value }: { value: ContentData }) {
  const blurURL = await getBlurDataURL(value.image);
  return (
    <Link
      href={value.link}
      className={styles.wideCard}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.cardImageWrapper}>
        <Image
          src={value.image}
          alt={value.title}
          placeholder="blur"
          blurDataURL={blurURL}
          className={styles.cardImage}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
          fetchPriority="low"
        />
      </div>
      <div className={styles.cardContent}>
        <span className={`${styles.categoryText}`}>
          {value.subTitle}
        </span>
        <h3 className={`${styles.cardTitle}`}>{value.title}</h3>
        <p className={`${styles.cardDescription}`}>
          {value.description}
        </p>
      </div>
    </Link>
  );
}
