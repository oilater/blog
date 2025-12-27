import Image from 'next/image';
import Link from 'next/link';
import { ContentData } from '../../../contents/articles/types';
import * as styles from './WideCard.css';

export function WideCard({ value }: { value: ContentData }) {
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
          className={styles.cardImage}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          loading="lazy"
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
