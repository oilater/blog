'use client';

import { Button } from '@components/Button';
import { ArrowDownIcon } from '@icons/ArrowDown';
import Image from 'next/image';
import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect } from 'react';
import type { ArticleData } from '../../../contents/articles/types';
import * as styles from './Article.css';

type ArticleRootProps = {
  header: ReactNode;
  content: ReactNode;
};

type ArticleHeaderProps = {
  title: string;
  imageUrl: string;
  date: string;
};

function ArticleRoot({ header, content }: ArticleRootProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const ScrollProgressBar = lazy(
    () => import('../ScrollProgressBar/ScrollProgressBar'),
  );

  return (
    <>
      <Suspense fallback={null}>
        <ScrollProgressBar trigger=".article" />
      </Suspense>
      <article className={`${styles.articleRoot} article`}>
        {header}
        {content}
      </article>
    </>
  );
}

function ArticleHeader({
  title,
  date,
  imageUrl,
}: ArticleHeaderProps) {
  const onScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <div className={styles.articleHeader}>
      <div className={styles.articleHeaderTitleSection}>
        <div className={styles.articleHeaderTitle}>{title}</div>
        <time dateTime={date} className={styles.articleHeaderDate}>
          {date} ∙ 김성현
        </time>
      </div>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={`${title} 이미지`}
          className={styles.articleHeaderImage}
          fill
          sizes="100vw"
          loading="lazy"
        />
        <div className={styles.imageGradient} />
      </div>
      <Button
        className={styles.scrollDownButton}
        onClick={onScrollDown}
      >
        <ArrowDownIcon />
      </Button>
    </div>
  );
}

function ArticleContent({ children }: { children: ReactNode }) {
  return <div className={styles.articleContent}>{children}</div>;
}

export const Article = {
  Root: ArticleRoot,
  Header: ArticleHeader,
  Content: ArticleContent,
};

export function createArticle(article: ArticleData) {
  if (!article) return null;

  return (
    <Article.Root
      header={
        <Article.Header
          title={article.title}
          date={article.date}
          imageUrl={article.imageUrl}
        />
      }
      content={<Article.Content>{article.content}</Article.Content>}
    />
  );
}
