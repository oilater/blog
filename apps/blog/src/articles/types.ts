import type { ReactNode } from 'react';

export type ArticleType = {
  title: string;
  date: string;
  imageUrl: string;
  content: ReactNode;
};
