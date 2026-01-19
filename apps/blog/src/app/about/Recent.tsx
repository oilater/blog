import { ContentType } from '#/articles/types';
import { Section } from '#components/Section';
import { workSection } from '#components/styles/Section.css';
import { WideCard } from '#components/WideCard';

export const article: ContentType = {
  id: 1,
  title: 'Feed LCP 2초 땡기기 📉',
  description: '블로그 성능 개선기',
  image: '/images/velog.avif',
  link: 'https://velog.io/@oilater/%EB%B8%94%EB%A1%9C%EA%B7%B8-Feed-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0%ED%95%98%EA%B8%B0-2-LCP-60-%EB%82%AE%EC%B6%94%EA%B8%B0',
  isInternal: false,
};

export function Recent() {
  return (
    <Section title="Recent" description="최근 개발 경험을 공유해요." className={workSection}>
      <WideCard key={article.title} value={article} />
    </Section>
  );
}
