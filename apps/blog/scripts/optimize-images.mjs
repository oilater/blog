import { createHash } from 'node:crypto';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_ROOT = path.resolve(__dirname, '..');
const SOURCE_ROOT = path.join(BLOG_ROOT, 'posts-source');
const OUTPUT_ROOT = path.join(BLOG_ROOT, 'public', 'posts');
const CACHE_DIR = path.join(BLOG_ROOT, 'node_modules', '.cache', 'image-pipeline');
const CACHE_PATH = path.join(CACHE_DIR, 'manifest.json');
const LEGACY_CACHE_PATH = path.join(BLOG_ROOT, '.image-cache.json');
const CACHE_VERSION = 2;
const MAX_WIDTH = 2400;
const BLUR_WIDTH = 20;
const BLUR_QUALITY = 20;
const SOURCE_EXTS = new Set(['.jpg', '.jpeg', '.png']);

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

async function walk(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }

  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (entry.isFile() && SOURCE_EXTS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

async function migrateLegacyCache() {
  try {
    await fs.access(LEGACY_CACHE_PATH);
  } catch {
    return;
  }
  try {
    await fs.access(CACHE_PATH);
    await fs.unlink(LEGACY_CACHE_PATH);
    return;
  } catch {}
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.rename(LEGACY_CACHE_PATH, CACHE_PATH);
}

async function loadCache() {
  await migrateLegacyCache();
  try {
    const raw = await fs.readFile(CACHE_PATH, 'utf8');
    const parsed = JSON.parse(raw);
    if (parsed.version !== CACHE_VERSION) return { version: CACHE_VERSION, entries: {} };
    return parsed;
  } catch {
    return { version: CACHE_VERSION, entries: {} };
  }
}

async function saveCache(cache) {
  await fs.mkdir(CACHE_DIR, { recursive: true });
  await fs.writeFile(CACHE_PATH, `${JSON.stringify(cache, null, 2)}\n`);
}

function hashBuffer(buffer) {
  return createHash('sha256').update(buffer).digest('hex');
}

async function fileExists(p) {
  try {
    await fs.access(p);
    return true;
  } catch {
    return false;
  }
}

function plannedOutputs(srcRel) {
  const noExt = srcRel.replace(/\.(jpe?g|png)$/i, '');
  return [
    { rel: `${noExt}.avif`, format: 'avif' },
    { rel: `${noExt}.webp`, format: 'webp' },
  ];
}

async function convert(srcAbs, outputs) {
  const base = sharp(srcAbs).rotate().resize({ width: MAX_WIDTH, withoutEnlargement: true });

  const results = await Promise.allSettled(
    outputs.map(async ({ rel, format }) => {
      const outAbs = path.join(OUTPUT_ROOT, rel);
      await fs.mkdir(path.dirname(outAbs), { recursive: true });
      const { data, info } = await base
        .clone()
        .toFormat(format)
        .toBuffer({ resolveWithObject: true });
      await fs.writeFile(outAbs, data);
      return { format, bytes: data.length, width: info.width, height: info.height };
    }),
  );

  const converted = outputs.map((o, i) => ({
    ...o,
    result: results[i],
  }));

  if (converted.some((c) => c.result.status === 'rejected')) {
    return { converted, meta: null };
  }

  const first = converted.find((c) => c.result.status === 'fulfilled')?.result.value;
  const blurBuffer = await base
    .clone()
    .resize(BLUR_WIDTH)
    .blur(1)
    .jpeg({ quality: BLUR_QUALITY })
    .toBuffer();
  const blurDataURL = `data:image/jpeg;base64,${blurBuffer.toString('base64')}`;

  const bytes = Object.fromEntries(
    converted
      .filter((c) => c.result.status === 'fulfilled')
      .map((c) => [c.format, c.result.value.bytes]),
  );

  return {
    converted,
    meta: { width: first?.width ?? 0, height: first?.height ?? 0, blurDataURL, bytes },
  };
}

async function main() {
  const sources = await walk(SOURCE_ROOT);
  const cache = await loadCache();
  const stats = { processed: 0, skipped: 0, failed: [], savedBytes: 0, sourceBytes: 0 };
  const seenSourceRels = new Set();

  for (const srcAbs of sources) {
    const srcRel = path.relative(SOURCE_ROOT, srcAbs);
    seenSourceRels.add(srcRel);

    const srcBuffer = await fs.readFile(srcAbs);
    const hash = hashBuffer(srcBuffer);
    const outputs = plannedOutputs(srcRel);
    const cached = cache.entries[srcRel];

    const allOutputsPresent = cached
      ? (await Promise.all(outputs.map((o) => fileExists(path.join(OUTPUT_ROOT, o.rel))))).every(Boolean)
      : false;

    if (cached?.hash === hash && allOutputsPresent) {
      stats.skipped++;
      continue;
    }

    try {
      const { converted, meta } = await convert(srcAbs, outputs);
      const failed = converted.filter((c) => c.result.status === 'rejected');
      if (failed.length > 0 || !meta) {
        for (const f of failed) {
          stats.failed.push(`${srcRel} (${f.format}): ${f.result.reason?.message ?? 'unknown'}`);
        }
        continue;
      }

      cache.entries[srcRel] = {
        hash,
        outputs: outputs.map((o) => o.rel),
        meta,
      };
      stats.processed++;
      stats.sourceBytes += srcBuffer.length;
      for (const c of converted) {
        if (c.result.status === 'fulfilled') stats.savedBytes += c.result.value.bytes;
      }
    } catch (err) {
      stats.failed.push(`${srcRel}: ${err.message}`);
    }
  }

  for (const rel of Object.keys(cache.entries)) {
    if (!seenSourceRels.has(rel)) delete cache.entries[rel];
  }

  await saveCache(cache);

  if (sources.length === 0) {
    console.log(`${DIM}[optimize-images] no source images in posts-source/${RESET}`);
    return;
  }

  const reduction =
    stats.sourceBytes > 0
      ? `${Math.round((1 - stats.savedBytes / (stats.sourceBytes * 2)) * 100)}% vs source`
      : 'n/a';

  const summary = `[optimize-images] processed ${stats.processed} × 2 formats, skipped ${stats.skipped}, failed ${stats.failed.length} (${reduction})`;
  console.log(stats.failed.length > 0 ? `${RED}${summary}${RESET}` : `${GREEN}${summary}${RESET}`);

  for (const line of stats.failed) {
    console.log(`${RED}  ✗ ${line}${RESET}`);
  }
}

main().catch((err) => {
  console.error(`${RED}[optimize-images] fatal:${RESET}`, err);
  process.exit(0);
});
