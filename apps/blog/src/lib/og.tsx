import fs from 'node:fs/promises';
import path from 'node:path';
import { ImageResponse } from 'next/og';
import { BlogConfig } from '#/constants/config';

export const OG_SIZE = { width: 1200, height: 630 };

// 빌드 시점에만 읽는다. 한글 글리프가 필요해서 Pretendard를 직접 넣는다 (OFL, assets/fonts/OFL.txt).
let fontPromise: Promise<Buffer> | null = null;
function loadFont() {
  fontPromise ??= fs.readFile(path.join(process.cwd(), 'assets/fonts/Pretendard-Bold.woff'));
  return fontPromise;
}

interface OgImageOptions {
  title: string;
  eyebrow?: string;
  footer?: string;
}

export async function renderOgImage({ title, eyebrow, footer }: OgImageOptions) {
  const titleSize = title.length > 40 ? 56 : title.length > 24 ? 64 : 76;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 80px',
        backgroundColor: '#0b0d12',
        backgroundImage: 'radial-gradient(circle at 100% 0%, rgba(129, 140, 248, 0.28), transparent 55%)',
        color: '#f9fafb',
        fontFamily: 'Pretendard',
      }}
    >
      <div style={{ display: 'flex', fontSize: 30, color: '#818cf8' }}>{eyebrow ?? ''}</div>
      <div
        style={{
          display: 'flex',
          fontSize: titleSize,
          lineHeight: 1.25,
          letterSpacing: '-0.02em',
          wordBreak: 'keep-all',
        }}
      >
        {title}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 26, color: '#9ca3af' }}>
        <span>{BlogConfig.title}</span>
        <span>{footer ?? new URL(BlogConfig.url).host}</span>
      </div>
    </div>,
    {
      ...OG_SIZE,
      fonts: [{ name: 'Pretendard', data: await loadFont(), weight: 700, style: 'normal' }],
    },
  );
}
