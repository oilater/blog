'use client';

import type { ImageProps } from 'next/image';
import Image from 'next/image';
import { useState } from 'react';

export function MdxImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!props.src) return null;

  const isPriority = typeof props.alt === 'string' && props.alt.includes('[lcp]');
  const alt = typeof props.alt === 'string' ? props.alt.replace('[lcp]', '').trim() : '';

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
        width={props.width || 750}
        height={props.height || 562}
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
