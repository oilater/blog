import { FivaArticle } from '#/articles/FivaArticle';
import { PortfolioArticle } from '#/articles/PortfolioArticle';
import { ArticleType } from '#/articles/types';
import { createArticle } from '#components/Article';
import { IMAGES } from '#constants/images';

const contents: Record<string, ArticleType> = {
  'rally-portfolio': {
    title: '인터렉션 시스템 Rally 만들기',
    date: '2025-06-30',
    imageUrl: IMAGES.PORTFOLIO_DETAIL,
    content: <PortfolioArticle />,
  },
  fiva: {
    title: 'Unity로 개발한 FIVA 이야기',
    date: '2025-07-05',
    imageUrl: IMAGES.FIVA,
    content: <FivaArticle />,
  },
};

export default async function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = contents[id];

  if (!article) return null;

  return createArticle(article);
}
