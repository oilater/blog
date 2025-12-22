import { IMAGES } from '../../constants/images';
import { FivaArticle } from '../articles/FivaArticle';
import { PortfolioArticle } from '../articles/PortfolioArticle';
import { ArticleData, ContentData } from '../types';

const GITHUB = 'https://github.com/oilater';
const VELOG = 'https://velog.io/@oilater';
const LINK = {
  GRAPH: `${VELOG}/interactive-graph`,
  PERFORMANCE: `${VELOG}/portfolio-performance`,
  CHARTS: 'https://medical-chart.vercel.app/',
  CREWING: `${VELOG}/series/WorkoutTogether-%EA%B0%9C%EB%B0%9C-%EA%B3%BC%EC%A0%95`,
  HOMET_FRIEND: `${GITHUB}/HomeTraining-Friend`,
  REACT_TRIP: `${GITHUB}/React-trip-project`,
};

export const ARTICLES: ContentData[] = [
  {
    id: 'velog-article',
    subTitle: '최근 포스트',
    title: '커스텀 Velog를 만들어보자 📝',
    description: '포트폴리오에 Velog를 띄워보았어요',
    image: IMAGES.VELOG,
    link: 'https://velog.io/@oilater/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EC%97%90-Velog-%EA%B8%80%EC%9D%84-%EB%9D%84%EC%9B%8C%EB%B3%B4%EC%9E%90',
    isInternal: false,
  },
];

export const CONTENTS: ContentData[] = [
  {
    id: 'portfolio-performance',
    title: '포트폴리오 성능 분석',
    description: 'LCP와 성능 탭 점수 개선해보기',
    image: IMAGES.PERFORMANCE,
    link: LINK.PERFORMANCE,
    isInternal: false,
    tags: ['Lighthouse', 'Performance Tab', 'WebPageTest'],
  },
  {
    id: 'rally-portfolio',
    title: '인터렉션 시스템 Rally 만들기',
    description:
      '토스의 Rally 구조를 참고해 Interaction System 구현하기',
    image: IMAGES.PORTFOLIO,
    link: '/contents/rally-portfolio',
    isInternal: true,
    tags: ['React', 'TypeScript', 'Emotion', 'GSAP', 'Jotai'],
  },
  {
    id: 'fiva',
    title: 'Unity로 개발한 FIVA 이야기',
    description: '구스랩스에서 8개월 간 개발한 FIVA를 소개합니다.',
    image: IMAGES.FIVA,
    link: '/contents/fiva',
    isInternal: true,
    tags: ['Unity', 'C#', 'Firebase'],
  },
  {
    id: 'medical-charts',
    title: '[Recharts] 데이터 시각화하기',
    description: '공공 API 활용해 차트 만들어보기',
    image: IMAGES.MEDICAL_CHARTS,
    link: LINK.CHARTS,
    isInternal: false,
    tags: ['React', 'Tanstack Query', 'Recharts', 'Emotion'],
  },
  {
    id: 'interactive-graph',
    title: '바닐라 JS로 상태관리 해보기',
    description:
      'Observer, State 패턴을 사용해 데이터가 변하면 관련된 UI를 업데이트 해보자',
    image: IMAGES.INTERACTIVE_GRAPH,
    link: LINK.GRAPH,
    isInternal: false,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 'homet-friend',
    title: '[홈트친구] 운동 앱을 만들어보자',
    description:
      'SwiftUI 배워서 앱 기획, 디자인, 개발 및 배포, 홍보까지 해보기',
    image: IMAGES.HOMET_FRIEND,
    link: LINK.HOMET_FRIEND,
    isInternal: false,
    tags: ['SwiftUI', 'SwiftData'],
  },
];

const ARTICLE_KEYS = {
  FIVA: 'fiva',
  PORTFOLIO: 'rally-portfolio',
  RALLY_REFACTORING: 'rally-refactoring',
} as const;

export const articleMap: Record<string, ArticleData> = {
  [ARTICLE_KEYS.PORTFOLIO]: {
    title: '인터렉션 시스템 Rally 만들기',
    date: '2025-06-30',
    imageUrl: IMAGES.PORTFOLIO_DETAIL,
    content: <PortfolioArticle />,
  },
  [ARTICLE_KEYS.FIVA]: {
    title: 'Unity로 개발한 FIVA 이야기',
    date: '2025-07-05',
    imageUrl: IMAGES.FIVA,
    content: <FivaArticle />,
  },
};
