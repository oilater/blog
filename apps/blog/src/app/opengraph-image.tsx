import { BlogConfig } from '#/constants/config';
import { OG_SIZE, renderOgImage } from '#/lib/og';

export const size = OG_SIZE;
export const contentType = 'image/png';
export const alt = BlogConfig.description;

export default function Image() {
  return renderOgImage({ title: BlogConfig.description, eyebrow: BlogConfig.author.bio });
}
