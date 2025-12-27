import Image from 'next/image';
import * as styles from './InfoCard.css';

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
  isHighPriority?: boolean;
};

export function InfoCard({
  title,
  description,
  image,
  onClick,
  isHighPriority,
}: InfoCardProps) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.cardImageWrapper}>
        <Image
          src={image}
          alt={title}
          className={styles.cardImage}
          fetchPriority={isHighPriority ? 'high' : 'auto'}
          fill
          sizes="(max-width: 768px) 100vw, 304px"
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </button>
  );
}
