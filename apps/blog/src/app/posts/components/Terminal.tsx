'use client';

import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { autocomplete, executeCommand, parseCommand } from '#/lib/terminal';
import * as styles from '../terminal.css';

interface Props {
  tags: string[];
  posts: { title: string; slug: string }[];
}

export function Terminal({ tags, posts }: Props) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<{ command: string; output: string }[]>([]);
  const [cwd, setCwd] = useState('~/posts');

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const execute = (raw: string) => {
    const parsed = parseCommand(raw);
    if (!parsed) return;

    const result = executeCommand(parsed, cwd, tags, posts);

    if (result.clear) {
      setHistory([]);
      setInput('');
      return;
    }

    if (result.navigate) router.push(result.navigate);
    if (result.cwd) setCwd(result.cwd);
    setHistory((prev) => [...prev, { command: `${cwd} $ ${raw.trim()}`, output: result.output }]);
    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === 'Tab') {
      e.preventDefault();
      const result = autocomplete(input, tags, posts);
      if (result) setInput(result);
    } else if (e.key === 'Enter') {
      execute(input);
    }
  };

  return (
    <div ref={terminalRef} className={styles.terminal} onClick={() => inputRef.current?.focus()}>
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
