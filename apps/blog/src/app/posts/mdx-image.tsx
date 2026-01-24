'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

function parseAlt(alt: unknown) {
  if (typeof alt !== 'string') return { isPriority: false, alt: '' };
  const isPriority = alt.includes('[lcp]');
  return { isPriority, alt: alt.replace('[lcp]', '').trim() };
}

export function MdxImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!props.src) return null;

  const { isPriority, alt } = parseAlt(props.alt);
  const width = Number(props.width) || 750;
  const height = Number(props.height) || 562;

  return (
    <span
      className="markdown-img-wrapper"
      style={{
        aspectRatio: `${width} / ${height}`,
        ...(props.blurDataURL ? { backgroundImage: `url(${props.blurDataURL})`, backgroundSize: 'cover' } : {}),
      }}
    >
      <Image
        className={`markdown-img ${isPriority ? 'lcp' : ''} ${loaded ? 'loaded' : ''}`}
        src={props.src}
        alt={alt}
        width={width}
        height={height}
        quality={75}
        style={{ width: '100%', height: 'auto' }}
        sizes="(max-width: 790px) calc(100vw - 40px), 750px"
        priority={isPriority}
        fetchPriority={isPriority ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
