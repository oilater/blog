import type { ReactNode } from 'react';

export type ContentType = {
  id: number;
  subTitle?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isInternal: boolean;
  tags?: string[];
};

export type ArticleType = {
  title: string;
  date: string;
  imageUrl: string;
  content: ReactNode;
};
