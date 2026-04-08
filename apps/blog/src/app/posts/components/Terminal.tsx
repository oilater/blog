'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import * as styles from '../terminal.css';

interface PostEntry {
  title: string;
  slug: string;
}

interface TerminalProps {
  tags: string[];
  posts: PostEntry[];
  currentTag?: string;
}

interface HistoryEntry {
  command: string;
  output: string;
}

const CLEAR_HINT_THRESHOLD = 5;

const HELP_TEXT = [
  'cd <tag>   — 태그로 이동',
  'cd <제목>  — 포스트로 이동 (부분 검색 가능)',
  'cd ..      — 전체 포스트로 이동',
  'ls         — 목록 보기',
  'clear      — 터미널 초기화',
].join('\n');

export function Terminal({ tags, posts, currentTag }: TerminalProps) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const cwd = currentTag ? `~/posts/${currentTag}` : '~/posts';

  const execute = useCallback(
    (raw: string) => {
      const trimmed = raw.trim();
      if (!trimmed) return;

      const [cmd, ...args] = trimmed.split(/\s+/);
      const arg = args.join(' ');

      if (cmd === 'clear') {
        setHistory([]);
        setInput('');
        return;
      }

      let output = '';

      switch (cmd) {
        case 'cd': {
          if (!arg || arg === '..' || arg === '~' || arg === '/') {
            router.push('/');
          } else {
            const tagMatch = tags.find((t) => t.toLowerCase() === arg.toLowerCase());
            if (tagMatch) {
              router.push(`/posts/${tagMatch}`);
            } else {
              const postMatch = posts.find((p) => p.title.toLowerCase().includes(arg.toLowerCase()));
              if (postMatch) {
                router.push(`/posts/${postMatch.slug}`);
              } else {
                output = `cd: not found: ${arg}`;
              }
            }
          }
          break;
        }
        case 'ls': {
          if (currentTag) {
            output = posts.length ? posts.map((p) => p.title).join('\n') : '(empty)';
          } else {
            output = tags.join('  ');
          }
          break;
        }
        case 'help': {
          output = HELP_TEXT;
          break;
        }
        default: {
          output = `command not found: ${cmd}. type 'help' to see available commands.`;
        }
      }

      setHistory((prev) => {
        const next = [...prev, { command: `${cwd} $ ${trimmed}`, output }];
        if (next.length === CLEAR_HINT_THRESHOLD) {
          next.push({ command: '', output: '💡 clear 한번 하셔야 할듯,,' });
        }
        return next;
      });
      setInput('');
    },
    [tags, posts, currentTag, cwd, router],
  );

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      execute(input);
    }
  };

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus()}>
      {history.map((entry, i) => (
        <div key={i}>
          {entry.command && (
            <div className={styles.line}>
              <span className={styles.prompt}>{entry.command}</span>
            </div>
          )}
          {entry.output && <pre className={styles.output}>{entry.output}</pre>}
        </div>
      ))}
      <div className={styles.line}>
        <span className={styles.prompt}>{cwd} $&nbsp;</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
