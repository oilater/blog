import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { getBlurDataURL } from '#/lib/getBlurDataURL';
import * as styles from './styles/Card.css';

type CardProps = {
  link: string;
  isInternal: boolean;
  children: ReactNode;
};

type CardImageProps = {
  image: string;
};

type CardTitleProps = {
  children: ReactNode;
};

type CardDescriptionProps = {
  children: ReactNode;
};

type CardTagsProps = {
  children: ReactNode;
};

export function Card({ link, isInternal, children }: CardProps) {
  return (
    <Link href={link} className={styles.card} target={isInternal ? undefined : '_blank'}>
      {children}
    </Link>
  );
}

async function CardImage({ image }: CardImageProps) {
  const blurURL = await getBlurDataURL(image);

  return (
    <div className={styles.cardImageWrapper}>
      <Image
        src={image}
        alt="content"
        placeholder="blur"
        blurDataURL={blurURL}
        className={styles.cardImage}
        fill
        sizes="(max-width: 768px) 100vw, 305px"
        loading="lazy"
        fetchPriority="low"
      />
    </div>
  );
}

function CardContent({ children }: { children: ReactNode }) {
  return <div className={styles.cardContent}>{children}</div>;
}

function CardTitle({ children }: CardTitleProps) {
  return <p className={styles.cardTitle}>{children}</p>;
}

function CardDescription({ children }: CardDescriptionProps) {
  return <p className={styles.cardDescription}>{children}</p>;
}

function CardTags({ children }: CardTagsProps) {
  return <div className={styles.cardTags}>{children}</div>;
}

Card.Image = CardImage;
Card.Content = CardContent;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Tags = CardTags;
