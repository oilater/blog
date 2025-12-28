import type { ContentData } from '../app/contents/articles/types';
import { Card } from './Card';
import { Tag } from './Tag';

type ContentCardProps = {
  content: ContentData;
};

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Card link={content.link} isInternal={content.isInternal}>
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
  );
}
