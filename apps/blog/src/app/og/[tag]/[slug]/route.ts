import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { formatDate } from '#/lib/date';
import { findLcpImageSrc } from '#/lib/lcp-image';
import { OG_SIZE, renderOgImage } from '#/lib/og';
import { getAllPosts, getPost } from '#/lib/posts';

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts()
    .filter((post) => post.tag)
    .map((post) => {
      const [tag, slug] = post.slug.split('/');
      return { tag, slug };
    });
}

/** 대표 이미지(poster → [lcp])를 공유 미리보기 규격의 JPEG로 바꾼다. WebP/AVIF는 일부 메신저에서 안 보인다. */
async function renderCoverImage(src: string) {
  if (!src.startsWith('/')) return null;

  try {
    const file = await fs.readFile(path.join(process.cwd(), 'public', decodeURI(src)));
    const jpeg = await sharp(file)
      .resize(OG_SIZE.width, OG_SIZE.height, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();

    return new Response(new Uint8Array(jpeg), { headers: { 'Content-Type': 'image/jpeg' } });
  } catch {
    return null;
  }
}

export async function GET(_request: Request, { params }: { params: Promise<{ tag: string; slug: string }> }) {
  const { tag, slug } = await params;
  const post = getPost(tag, slug);

  const coverSrc = post ? post.data.poster || findLcpImageSrc(post.content) : null;
  const cover = coverSrc ? await renderCoverImage(coverSrc) : null;
  if (cover) return cover;

  return renderOgImage({
    title: post?.data.title || decodeURIComponent(slug),
    eyebrow: `#${decodeURIComponent(tag)}`,
    footer: post?.data.date ? formatDate(post.data.date) : undefined,
  });
}
