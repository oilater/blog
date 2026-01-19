import Image from 'next/image';
import { getBlurDataURL } from '#libs/getBlurDataURL';
import * as styles from './styles/InfoCard.css';

type InfoCardProps = {
  title: string;
  description: string;
  image: string;
  isHighPriority?: boolean;
};

export async function InfoCard({ title, description, image, isHighPriority }: InfoCardProps) {
  const blurURL = await getBlurDataURL(image);
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <Image
          src={image}
          alt={title}
          className={styles.cardImage}
          placeholder="blur"
          blurDataURL={blurURL}
          priority={isHighPriority}
          loading="eager"
          fill
          sizes="(max-width: 768px) 100vw, 304px"
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </div>
  );
}
