import fs from 'node:fs/promises';
import path from 'node:path';
import type { Element, Root } from 'hast';
import sizeOf from 'image-size';
import { visit } from 'unist-util-visit';
import { getBlurDataURL } from './getBlurDataURL';

export const rehypeImageSize = () => async (tree: Root) => {
  const imageNodes: { node: Element; src: string }[] = [];

  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'img') return;
    const src = node.properties?.src;
    if (typeof src === 'string') {
      imageNodes.push({ node, src });
    }
  });

  await Promise.all(
    imageNodes.map(async ({ node, src }) => {
      const imagePath = path.join(process.cwd(), 'public', src);

      try {
        const buffer = await fs.readFile(imagePath);
        const dimensions = sizeOf(buffer);

        if (dimensions.width && dimensions.height) {
          node.properties = {
            ...node.properties,
            width: dimensions.width,
            height: dimensions.height,
            blurDataURL: await getBlurDataURL(src),
          };
        }
      } catch {}
    }),
  );
};
