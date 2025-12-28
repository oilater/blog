import { ContentCard } from '#components/ContentCard';
import { Section } from '#components/Section';
import { contentSection } from '../../components/styles/Section.css';
import { IMAGES } from '../../constants/images';
import { ContentData } from '../contents/articles/types';

export const CONTENTS: ContentData[] = [
  {
    title: '포트폴리오 성능 분석',
    description: 'LCP와 성능 탭 점수 개선해보기',
    image: IMAGES.PERFORMANCE,
    link: 'https://velog.io/@oilater/portfolio-performance',
    isInternal: false,
    tags: ['Lighthouse', 'Performance Tab', 'WebPageTest'],
  },
  {
    title: '인터렉션 시스템 Rally 만들기',
    description:
      '토스의 Rally 구조를 참고해 Interaction System 구현하기',
    image: IMAGES.PORTFOLIO,
    link: '/contents/rally-portfolio',
    isInternal: true,
    tags: ['React', 'TypeScript', 'Emotion', 'GSAP'],
  },
  {
    title: 'Unity로 개발한 FIVA 이야기',
    description: '구스랩스에서 8개월 간 개발한 FIVA를 소개합니다.',
    image: IMAGES.FIVA,
    link: '/contents/fiva',
    isInternal: true,
    tags: ['Unity', 'C#', 'Firebase'],
  },
  {
    title: '[Recharts] 데이터 시각화하기',
    description: '공공 API 활용해 차트 만들어보기',
    image: IMAGES.MEDICAL_CHARTS,
    link: 'https://medical-chart.vercel.app/',
    isInternal: false,
    tags: ['React', 'Tanstack Query', 'Recharts', 'Emotion'],
  },
  {
    title: '바닐라 JS로 상태관리 해보기',
    description:
      'Observer, State 패턴을 사용해 데이터가 변하면 관련된 UI를 업데이트 해보자',
    image: IMAGES.INTERACTIVE_GRAPH,
    link: 'https://velog.io/@oilater/interactive-graph',
    isInternal: false,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    title: '[홈트친구] 운동 앱을 만들어보자',
    description:
      'SwiftUI 배워서 앱 기획, 디자인, 개발 및 배포, 홍보까지 해보기',
    image: IMAGES.HOMET_FRIEND,
    link: 'https://github.com/oilater/HomeTraining-Friend',
    isInternal: false,
    tags: ['SwiftUI', 'SwiftData'],
  },
];

export function Content() {
  return (
    <Section
      title="Contents"
      description="새로운 것을 배우면 재밌는 서비스로 만들어봅니다."
      className={contentSection}
    >
      {CONTENTS.map((content) => (
        <ContentCard key={content.title} content={content} />
      ))}
    </Section>
  );
}
