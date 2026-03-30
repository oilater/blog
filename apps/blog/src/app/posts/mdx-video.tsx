import type { ComponentPropsWithoutRef, ReactNode } from 'react';

interface MdxVideoProps extends ComponentPropsWithoutRef<'video'> {
  caption?: string;
  children?: ReactNode;
}

export function MdxVideo({
  caption,
  width,
  height,
  children,
  className,
  ...props
}: MdxVideoProps) {
  const aspectRatio =
    width && height ? `${width} / ${height}` : '16 / 9';

  return (
    <figure style={{ margin: 0 }}>
      <div
        style={{
          width: '100%',
          aspectRatio,
          position: 'relative',
        }}
      >
        <video
          className={className}
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
          {...props}
        >
          {children}
          <track kind="captions" />
        </video>
      </div>

      {caption && (
        <figcaption
          style={{
            marginTop: 8,
            fontSize: 14,
            color: '#666',
            lineHeight: 1.4,
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}