import { ContentType } from '#/articles/types';
import { Card } from '#components/Card';
import { Section } from '#components/Section';
import { contentSection } from '#components/styles/Section.css';
import { Tag } from '#components/Tag';
import { IMAGES } from '#constants/images';

export const CONTENTS: ContentType[] = [
  {
    id: 1,
    title: '성능에 관심을 갖게 된 계기',
    description: 'Progressive Enhancement 적용하기',
    image: IMAGES.PERFORMANCE,
    link: 'https://velog.io/@oilater/portfolio-performance',
    isInternal: false,
    tags: ['Lighthouse', 'Performance'],
  },
  {
    id: 2,
    title: '인터렉션 시스템 Rally',
    description: 'Interaction System 구현하기',
    image: IMAGES.PORTFOLIO,
    link: '/contents/rally-portfolio',
    isInternal: true,
    tags: ['React', 'TypeScript', 'GSAP'],
  },
  {
    id: 3,
    title: '메타버스 운동 앱 FIVA 이야기',
    description: '구스랩스에서 만든 FIVA를 소개합니다.',
    image: IMAGES.FIVA,
    link: '/contents/fiva',
    isInternal: true,
    tags: ['Unity', 'C#'],
  },
];

export function Content() {
  return (
    <Section title="Contents" description="새로운 것을 배우면 재밌는 서비스로 만들어봅니다." className={contentSection}>
      {CONTENTS.map((content) => (
        <Card key={content.id} link={content.link} isInternal={content.isInternal}>
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
