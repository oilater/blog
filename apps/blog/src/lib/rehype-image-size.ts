import fs from 'node:fs/promises';
import path from 'node:path';
import type { Element, Root } from 'hast';
import sizeOf from 'image-size';
import { visit } from 'unist-util-visit';
import { getBlurDataURL } from './getBlurDataURL';

type ManifestMeta = {
  width: number;
  height: number;
  blurDataURL: string;
};

type ManifestEntry = {
  hash: string;
  outputs: string[];
  meta?: ManifestMeta;
};

type Manifest = {
  version: number;
  entries: Record<string, ManifestEntry>;
};

const MANIFEST_PATH = path.join(
  process.cwd(),
  'node_modules',
  '.cache',
  'image-pipeline',
  'manifest.json',
);
const LEGACY_MANIFEST_PATH = path.join(process.cwd(), '.image-cache.json');
const POSTS_URL_PREFIX = '/posts/';

let manifestIndexPromise: Promise<Map<string, ManifestMeta>> | null = null;

async function readManifest(p: string): Promise<Manifest | null> {
  try {
    const raw = await fs.readFile(p, 'utf8');
    return JSON.parse(raw) as Manifest;
  } catch {
    return null;
  }
}

async function loadManifestIndex(): Promise<Map<string, ManifestMeta>> {
  const index = new Map<string, ManifestMeta>();
  const parsed =
    (await readManifest(MANIFEST_PATH)) ?? (await readManifest(LEGACY_MANIFEST_PATH));
  if (!parsed || parsed.version !== 2) return index;
  for (const entry of Object.values(parsed.entries)) {
    if (!entry.meta) continue;
    for (const outputRel of entry.outputs) {
      index.set(outputRel, entry.meta);
    }
  }
  return index;
}

function getManifestIndex(): Promise<Map<string, ManifestMeta>> {
  if (!manifestIndexPromise) manifestIndexPromise = loadManifestIndex();
  return manifestIndexPromise;
}

function manifestKeyFromSrc(src: string): string | null {
  if (!src.startsWith(POSTS_URL_PREFIX)) return null;
  return src.slice(POSTS_URL_PREFIX.length);
}

async function resolveViaFs(src: string): Promise<ManifestMeta | null> {
  const imagePath = path.join(process.cwd(), 'public', src);
  try {
    const buffer = await fs.readFile(imagePath);
    const dimensions = sizeOf(buffer);
    if (!dimensions.width || !dimensions.height) return null;
    return {
      width: dimensions.width,
      height: dimensions.height,
      blurDataURL: await getBlurDataURL(src),
    };
  } catch {
    return null;
  }
}

export const rehypeImageSize = () => async (tree: Root) => {
  const imageNodes: { node: Element; src: string }[] = [];

  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'img') return;
    const src = node.properties?.src;
    if (typeof src === 'string') {
      imageNodes.push({ node, src });
    }
  });

  const manifestIndex = await getManifestIndex();

  await Promise.all(
    imageNodes.map(async ({ node, src }) => {
      const key = manifestKeyFromSrc(src);
      const meta = (key ? manifestIndex.get(key) : null) ?? (await resolveViaFs(src));
      if (!meta) return;
      node.properties = {
        ...node.properties,
        width: meta.width,
        height: meta.height,
        blurDataURL: meta.blurDataURL,
      };
    }),
  );
};
