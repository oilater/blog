import Image from 'next/image';
import { getBlurDataURL } from '#libs/getBlurDataUrl';
import * as styles from './styles/InfoCard.css';

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  onClick?: () => void;
  isHighPriority?: boolean;
};

export async function InfoCard({
  title,
  description,
  image,
  onClick,
  isHighPriority,
}: InfoCardProps) {
  const blurURL = await getBlurDataURL(image);
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.cardImageWrapper}>
        <Image
          src={image}
          alt={title}
          className={styles.cardImage}
          placeholder="blur"
          blurDataURL={blurURL}
          fetchPriority={isHighPriority ? 'high' : 'auto'}
          loading="eager"
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
