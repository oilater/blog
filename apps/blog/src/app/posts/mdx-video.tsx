import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MdxVideoProps extends ComponentPropsWithoutRef<'video'> {
  caption?: string;
  children?: ReactNode;
}

export function MdxVideo({ caption, children, className, ...props }: MdxVideoProps) {
  return (
    <figure className="markdown-video-figure">
      <video className={`markdown-video ${className || ''}`} controls playsInline {...props}>
        {children}
        <track kind="captions" />
      </video>
      {caption && <figcaption className="markdown-video-caption">{caption}</figcaption>}
    </figure>
  );
}
