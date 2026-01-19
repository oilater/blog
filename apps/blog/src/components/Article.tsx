import Image from 'next/image';
import type { ReactNode } from 'react';
import type { ArticleType } from '#/articles/types';
import * as styles from './styles/Article.css';

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
  return (
    <article className={`${styles.articleRoot} article`}>
      {header}
      {content}
    </article>
  );
}

function ArticleHeader({ title, date, imageUrl }: ArticleHeaderProps) {
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
          priority
        />
        <div className={styles.imageGradient} />
      </div>
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

export function createArticle(article: ArticleType) {
  if (!article) return null;

  return (
    <Article.Root
      header={<Article.Header title={article.title} date={article.date} imageUrl={article.imageUrl} />}
      content={<Article.Content>{article.content}</Article.Content>}
    />
  );
}
