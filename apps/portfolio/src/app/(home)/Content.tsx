import { ContentType } from '#/articles/types';
import { Card } from '#components/Card';
import { Section } from '#components/Section';
import { contentSection } from '#components/styles/Section.css';
import { Tag } from '#components/Tag';
import { IMAGES } from '#constants/images';

export const CONTENTS: ContentType[] = [
  {
    id: 1,
    title: '성능 분석에 관심을 갖게 된 계기',
    description: 'Progressive Enhancement 적용하기',
    image: IMAGES.PERFORMANCE,
    link: 'https://velog.io/@oilater/portfolio-performance',
    isInternal: false,
    tags: ['Lighthouse', 'Performance Tab', 'WebPageTest'],
  },
  {
    id: 2,
    title: '인터렉션 시스템 Rally',
    description: 'Interaction 시스템 구현하기',
    image: IMAGES.PORTFOLIO,
    link: '/contents/rally-portfolio',
    isInternal: true,
    tags: ['React', 'TypeScript', 'Emotion', 'GSAP'],
  },
  {
    id: 3,
    title: 'Unity로 개발한 FIVA 이야기',
    description: '구스랩스에서 개발한 FIVA를 소개합니다.',
    image: IMAGES.FIVA,
    link: '/contents/fiva',
    isInternal: true,
    tags: ['Unity', 'C#', 'Firebase'],
  },
  {
    id: 4,
    title: '[Recharts] 데이터 시각화하기',
    description: '공공 API 활용해 차트 만들어보기',
    image: IMAGES.MEDICAL_CHARTS,
    link: 'https://medical-chart.vercel.app/',
    isInternal: false,
    tags: ['React', 'Tanstack Query', 'Recharts', 'Emotion'],
  },
  {
    id: 5,
    title: '바닐라 JS로 상태관리 해보기',
    description:
      'Observer, State 패턴을 사용해 데이터가 변하면 관련된 UI를 업데이트 해보자',
    image: IMAGES.INTERACTIVE_GRAPH,
    link: 'https://velog.io/@oilater/interactive-graph',
    isInternal: false,
    tags: ['HTML5', 'CSS3', 'JavaScript'],
  },
  {
    id: 6,
    title: '내가 쓰려고 만든 "홈트친구"',
    description: 'SwiftUI로 만든 앱',
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
        <Card
          key={content.id}
          link={content.link}
          isInternal={content.isInternal}
        >
          <Card.Image image={content.image} />
          <Card.Content>
            <Card.Title>{content.title}</Card.Title>
            <Card.Description>{content.description}</Card.Description>
            <Card.Tags>
              {content.tags?.map((tag) => (
                <Tag key={tag} text={tag} />
              ))}
            </Card.Tags>
          </Card.Content>
        </Card>
      ))}
    </Section>
  );
}
