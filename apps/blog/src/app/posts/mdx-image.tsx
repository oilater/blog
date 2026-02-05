'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

function parseAlt(alt: string) {
  const isLCP = alt.includes('[lcp]');
  const altText = alt.replace('[lcp]', '').trim();

  return { isLCP, alt: altText };
}

export function MdxImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!props.src) return null;

  const { isLCP, alt } = parseAlt(props.alt);
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
        className={`markdown-img ${isLCP ? 'lcp' : ''} ${loaded ? 'loaded' : ''}`}
        src={props.src}
        alt={alt}
        width={width}
        height={height}
        quality={75}
        style={{ width: '100%', height: 'auto' }}
        sizes="(max-width: 790px) calc(100vw - 40px), 750px"
        priority={isLCP}
        fetchPriority={isLCP ? 'high' : 'auto'}
        onLoad={() => setLoaded(true)}
      />
    </span>
  );
}
