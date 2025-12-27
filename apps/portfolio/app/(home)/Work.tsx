import { Section } from '@components/Section';
import { WideCard } from '@components/WideCard';
import { ContentData } from '../contents/articles/types';
import { workSection } from '../shared/components/Section/Section.css';

export const article: ContentData = {
  title: '커스텀 Velog를 만들어보자 📝',
  subTitle: '최근 포스트',
  description: '포트폴리오에 Velog를 띄워보았어요',
  image: '/images/velog.avif',
  link: 'https://velog.io/@oilater/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4%EC%97%90-Velog-%EA%B8%80%EC%9D%84-%EB%9D%84%EC%9B%8C%EB%B3%B4%EC%9E%90',
  isInternal: false,
};

export function Work() {
  return (
    <Section
      title="Article"
      description="최근 개발 경험을 공유해요."
      className={workSection}
    >
      <WideCard key={article.title} value={article} />
    </Section>
  );
}
