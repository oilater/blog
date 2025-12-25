import Link from 'next/link';
import { ContentData } from '../../contents/types';
import * as styles from '../../styles/components/WideCard.css';

export function WideCard({ value }: { value: ContentData }) {
  return (
    <Link
      href={value.link}
      className={styles.wideCard}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className={styles.cardImageWrapper}>
        <img
          src={value.image}
          alt={value.title}
          className={styles.cardImage}
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
