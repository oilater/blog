'use client';

import { use } from 'react';
import { createArticle } from '#components/Article';
import { IMAGES } from '#constants/images';
import { FivaArticle } from '../articles/FivaArticle';
import { PortfolioArticle } from '../articles/PortfolioArticle';
import { ArticleData } from '../articles/types';

const contents: Record<string, ArticleData> = {
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

export default function Article({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const article = contents[id];
  if (!article) return null;

  return createArticle(article);
}
