'use client';

import type { ReactNode } from 'react';
import { lazy, Suspense, useEffect } from 'react';
import { Button } from '../../shared/components/Button';
import { ArrowDownIcon } from '../../shared/icons/ArrowDown';
import * as styles from '../../styles/components/Article.css';
import type { ArticleData } from '../types';

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
    () => import('../../shared/components/ScrollProgressBar'),
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
        <img
          src={imageUrl}
          alt={`${title} 이미지`}
          className={styles.articleHeaderImage}
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

const Article = {
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
