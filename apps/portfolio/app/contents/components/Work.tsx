import * as styles from '../../styles/sections/Content.css';
import { ARTICLES } from '../data';
import { ContentSection } from './ContentSection';
import { WideCard } from './WideCard';

export function Work() {
  return (
    <ContentSection
      title="Article"
      description="최근 개발 경험을 공유해요."
      sectionClassName={styles.workSection}
    >
      {ARTICLES.map((work) => (
        <WideCard key={work.id} value={work} />
      ))}
    </ContentSection>
  );
}
