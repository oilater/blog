import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export async function getBlurDataURL(imagePath: string) {
  const absolutePath = path.join(process.cwd(), 'public', imagePath);
  const buffer = await fs.readFile(absolutePath);

  const blurBuffer = await sharp(buffer).resize(20).blur(1).toFormat('jpeg', { quality: 20 }).toBuffer();

  return `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;
}
