import * as styles from '../../styles/components/InfoCard.css';

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
        <img
          src={image}
          alt={title}
          className={styles.cardImage}
          fetchPriority={isHighPriority ? 'high' : 'auto'}
        />
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardTitle}>{title}</p>
        <p className={styles.cardDescription}>{description}</p>
      </div>
    </button>
  );
}
