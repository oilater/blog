import Image from 'next/image';
import * as styles from '../thumbnail.css';

const TAG_STYLE: Record<string, { hue: number; glyph: string }> = {
  궁금증: { hue: 265, glyph: '?' },
  개발: { hue: 215, glyph: '</>' },
  CS: { hue: 160, glyph: '01' },
  끄적끄적: { hue: 35, glyph: '✎︎' },
  재즈: { hue: 330, glyph: '♪' },
  LeetCode: { hue: 20, glyph: '{ }' },
};

const DEFAULT_STYLE = { hue: 220, glyph: '#' };

export function PostThumbnail({ src, tag }: { src?: string; tag?: string }) {
  if (src) {
    return (
      <span className={styles.thumbnail}>
        <Image src={src} alt="" fill sizes="72px" className={styles.image} />
      </span>
    );
  }

  const { hue, glyph } = (tag && TAG_STYLE[tag]) || DEFAULT_STYLE;

  return (
    <span
      className={`${styles.thumbnail} ${styles.generated}`}
      style={{ '--thumb-hue': hue } as React.CSSProperties}
      aria-hidden="true"
    >
      <span className={styles.glyph}>{glyph}</span>
    </span>
  );
}
