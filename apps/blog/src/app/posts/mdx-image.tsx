'use client';

import type { ImageProps } from 'next/image';
import { useState } from 'react';

function parseAlt(alt: string) {
  const isLCP = alt.includes('[lcp]');
  const altText = alt.replace('[lcp]', '').trim();

  return { isLCP, alt: altText };
}

function deriveAvifSrc(src: string): string | null {
  return src.endsWith('.webp') ? src.replace(/\.webp$/, '.avif') : null;
}

export function MdxImage(props: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  if (!props.src || typeof props.src !== 'string') return null;

  const { isLCP, alt } = parseAlt(props.alt);
  const width = Number(props.width) || 750;
  const height = Number(props.height) || 562;
  const avifSrc = deriveAvifSrc(props.src);
  const blurDataURL = typeof props.blurDataURL === 'string' ? props.blurDataURL : undefined;

  return (
    <span
      className="markdown-img-wrapper"
      style={{
        aspectRatio: `${width} / ${height}`,
        ...(blurDataURL ? { backgroundImage: `url(${blurDataURL})`, backgroundSize: 'cover' } : {}),
      }}
    >
      <picture>
        {avifSrc && <source type="image/avif" srcSet={avifSrc} />}
        <source type="image/webp" srcSet={props.src} />
        <img
          className={`markdown-img ${isLCP ? 'lcp' : ''} ${loaded ? 'loaded' : ''}`}
          src={props.src}
          alt={alt}
          width={width}
          height={height}
          style={{ width: '100%', height: 'auto' }}
          loading={isLCP ? 'eager' : 'lazy'}
          fetchPriority={isLCP ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setLoaded(true)}
        />
      </picture>
    </span>
  );
}
