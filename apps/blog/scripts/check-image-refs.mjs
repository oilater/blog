import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_ROOT = path.resolve(__dirname, '..');
const HTML_ROOT = path.join(BLOG_ROOT, '.next', 'server', 'app');
const PUBLIC_ROOT = path.join(BLOG_ROOT, 'public');

const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const DIM = '\x1b[2m';
const RESET = '\x1b[0m';

const REFERENCE_PATTERN =
  /<(?:img|source)\b[^>]*?\b(?:src|srcSet|srcset)\s*=\s*"([^"]+)"/gi;

async function findHtmlFiles(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, { recursive: true, withFileTypes: true });
  } catch (err) {
    if (err.code === 'ENOENT') return [];
    throw err;
  }
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.html'))
    .map((entry) => path.join(entry.parentPath, entry.name));
}

function normalize(rawUrl) {
  let url = rawUrl.replace(/&amp;/g, '&');
  if (url.startsWith('/_next/image')) {
    const match = url.match(/[?&]url=([^&]+)/);
    if (!match) return null;
    url = decodeURIComponent(match[1]);
  }
  url = url.split('#')[0].split('?')[0];
  if (!url) return null;
  if (url.startsWith('data:') || /^https?:\/\//i.test(url)) return null;
  if (!url.startsWith('/')) return null;
  return url;
}

function extractReferences(html) {
  const refs = new Set();
  for (const match of html.matchAll(REFERENCE_PATTERN)) {
    const value = match[1];
    for (const candidate of value.split(/\s*,\s*/)) {
      const raw = candidate.trim().split(/\s+/)[0];
      if (!raw) continue;
      const url = normalize(raw);
      if (url) refs.add(url);
    }
  }
  return refs;
}

async function exists(absPath) {
  try {
    await fs.access(absPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const htmlFiles = await findHtmlFiles(HTML_ROOT);
  if (htmlFiles.length === 0) {
    console.error(`${RED}[check-image-refs] no HTML found under ${HTML_ROOT}. Run "next build" first.${RESET}`);
    process.exit(2);
  }

  const cache = new Map();
  const missing = [];
  let totalRefs = 0;

  for (const file of htmlFiles) {
    const html = await fs.readFile(file, 'utf8');
    const refs = extractReferences(html);
    const pageRel = path.relative(HTML_ROOT, file);
    for (const url of refs) {
      totalRefs += 1;
      let ok = cache.get(url);
      if (ok === undefined) {
        ok = await exists(path.join(PUBLIC_ROOT, url));
        cache.set(url, ok);
      }
      if (!ok) missing.push({ page: pageRel, url });
    }
  }

  if (missing.length === 0) {
    console.log(
      `${GREEN}[check-image-refs] OK${RESET} ${DIM}— ${totalRefs} references across ${htmlFiles.length} pages${RESET}`,
    );
    return;
  }

  console.error(`${RED}[check-image-refs] ${missing.length} broken reference(s):${RESET}`);
  const grouped = new Map();
  for (const m of missing) {
    if (!grouped.has(m.page)) grouped.set(m.page, []);
    grouped.get(m.page).push(m.url);
  }
  for (const [page, urls] of grouped) {
    console.error(`  ${page}`);
    for (const url of urls) console.error(`    ${RED}✗${RESET} ${url}`);
  }
  process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(2);
});
