interface PostEntry {
  title: string;
  slug: string;
}

export interface ParsedCommand {
  cmd: string;
  arg: string;
}

export interface CommandResult {
  output: string;
  navigate?: string;
  cwd?: string;
  clear?: boolean;
}

const COMMANDS = ['cd', 'ls', 'pwd', 'clear', 'help'] as const;

const HELP_TEXT = [
  'cd <tag>   — 태그로 이동',
  'cd <제목>  — 포스트로 이동 (부분 검색 가능)',
  'cd ..      — 전체 포스트로 이동',
  'ls         — 목록 보기',
  'pwd        — 현재 위치 보기',
  'clear      — 터미널 초기화',
].join('\n');

export function parseCommand(raw: string): ParsedCommand | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0] ?? '';
  const arg = parts.slice(1).join(' ');
  return { cmd, arg };
}

export function autocomplete(input: string, tags: string[], posts: PostEntry[]): string | null {
  const parsed = parseCommand(input);
  if (!parsed) return null;

  const { cmd, arg } = parsed;

  if (cmd === 'cd' && arg) {
    const lower = arg.toLowerCase();
    const tagMatch = tags.find((t) => t.toLowerCase().startsWith(lower));
    if (tagMatch) return `cd ${tagMatch}`;
    const postMatch = posts.find((p) => p.title.toLowerCase().startsWith(lower));
    if (postMatch) return `cd ${postMatch.title}`;
    return null;
  }

  if (!arg) {
    const match = COMMANDS.find((c) => c.startsWith(parsed.cmd.toLowerCase()));
    return match ?? null;
  }

  return null;
}

function executeCd(arg: string, cwd: string, tags: string[], posts: PostEntry[]): CommandResult {
  if (arg === '~' || arg === '/') {
    return { output: '', navigate: '/posts', cwd: '~/posts' };
  }

  if (!arg || arg === '..') {
    const parts = cwd.replace('~/posts', '').split('/').filter(Boolean);
    parts.pop();
    const newCwd = parts.length > 0 ? `~/posts/${parts.join('/')}` : '~/posts';
    const navigate = parts.length > 0 ? `/posts/${parts.join('/')}` : '/posts';
    return { output: '', navigate, cwd: newCwd };
  }

  const tagMatch = tags.find((t) => t.toLowerCase() === arg.toLowerCase());
  if (tagMatch) {
    return { output: '', navigate: `/posts/${tagMatch}`, cwd: `~/posts/${tagMatch}` };
  }

  const postMatch = posts.find((p) => p.title.toLowerCase().includes(arg.toLowerCase()));
  if (postMatch) {
    return { output: '', navigate: `/posts/${postMatch.slug}`, cwd: `~/posts/${postMatch.slug}` };
  }

  return { output: `cd: not found: ${arg}` };
}

function executeLs(cwd: string, tags: string[], posts: PostEntry[]): CommandResult {
  const parts = cwd.replace('~/posts', '').split('/').filter(Boolean);

  if (parts.length === 0) {
    return { output: tags.join('  ') };
  }
  if (parts.length === 1) {
    const tagPosts = posts.filter((p) => p.slug.startsWith(`${parts[0]}/`));
    return { output: tagPosts.length ? tagPosts.map((p) => p.title).join('\n') : '(empty)' };
  }
  return { output: '' };
}

export function executeCommand(
  parsed: ParsedCommand,
  cwd: string,
  tags: string[],
  posts: PostEntry[],
): CommandResult {
  switch (parsed.cmd) {
    case 'clear':
      return { output: '', clear: true };
    case 'cd':
      return executeCd(parsed.arg, cwd, tags, posts);
    case 'ls':
      return executeLs(cwd, tags, posts);
    case 'pwd':
      return { output: `현재 위치는 Seonghyeon's blog ✨ 입니다.\n${cwd}` };
    case 'help':
      return { output: HELP_TEXT };
    default:
      return { output: `command not found: ${parsed.cmd}. type 'help' to see available commands.` };
  }
}
