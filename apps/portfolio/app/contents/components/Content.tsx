import * as styles from '../../styles/sections/Content.css';
import { CONTENTS } from '../data';
import { ContentCard } from './ContentCard';
import { ContentSection } from './ContentSection';

export function Content() {
  return (
    <ContentSection
      title="Contents"
      description="새로운 것을 배우면 재밌는 서비스로 만들어봅니다."
      sectionClassName={styles.contentSection}
    >
      {CONTENTS.map((content) => (
        <ContentCard key={content.id} content={content} />
      ))}
    </ContentSection>
  );
}
