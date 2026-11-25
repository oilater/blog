'use client';

import { type ComponentProps, useEffect, useRef, useState } from 'react';

type CopyState = 'idle' | 'copied' | 'failed';

const LABEL: Record<CopyState, string> = {
  idle: '복사',
  copied: '복사됨',
  failed: '실패',
};

export function CodeBlock({ className, ...props }: ComponentProps<'pre'>) {
  const preRef = useRef<HTMLPreElement>(null);
  const [state, setState] = useState<CopyState>('idle');

  useEffect(() => {
    if (state === 'idle') return;
    const timer = setTimeout(() => setState('idle'), 2000);
    return () => clearTimeout(timer);
  }, [state]);

  const copy = async () => {
    // 줄 번호는 CSS ::before로 그려지므로 textContent에 포함되지 않는다.
    const text = preRef.current?.querySelector('code')?.textContent ?? preRef.current?.textContent ?? '';
    try {
      await navigator.clipboard.writeText(text.replace(/\n$/, ''));
      setState('copied');
    } catch {
      setState('failed');
    }
  };

  return (
    <div className="markdown-code-block">
      <pre ref={preRef} className={`markdown-pre ${className ?? ''}`} {...props} />
      <button type="button" className="markdown-copy-button" data-state={state} onClick={copy} aria-label="코드 복사">
        {LABEL[state]}
      </button>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? '코드를 복사했어요' : ''}
      </span>
    </div>
  );
}
