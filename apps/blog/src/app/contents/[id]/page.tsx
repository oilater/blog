import { FivaArticle } from '#/articles/FivaArticle';
import { ArticleType } from '#/articles/types';
import { createArticle } from '#components/Article';

const contents: Record<string, ArticleType> = {
  fiva: {
    title: 'Unity로 개발한 FIVA 이야기',
    date: '2025-07-05',
    imageUrl: '/images/fiva_thumbnail.avif',
    content: <FivaArticle />,
  },
};

export default async function Article({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = contents[id];

  if (!article) return null;

  return createArticle(article);
}
