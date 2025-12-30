import type { ReactNode } from 'react';

export type ContentData = {
  id: number;
  subTitle?: string;
  title: string;
  description: string;
  image: string;
  link: string;
  isInternal: boolean;
  tags?: string[];
};

export type ArticleData = {
  title: string;
  date: string;
  imageUrl: string;
  content: ReactNode;
};
