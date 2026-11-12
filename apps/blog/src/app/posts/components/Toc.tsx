'use client';

import { useEffect, useRef, useState } from 'react';
import * as styles from '../toc.css';

interface Heading {
  id: string;
  text: string;
  level: number;
}

const ACTIVE_OFFSET = 120;

export function Toc({ enabled }: { enabled: boolean }) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const detailsRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLHeadingElement>('.markdown-body :is(h1, h2, h3, h4)[id]'),
    );
    setHeadings(
      elements.map((el) => ({
        id: el.id,
        text: el.textContent?.trim() ?? '',
        level: Number(el.tagName[1]),
      })),
    );

    let frame = 0;
    const updateActive = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        let current = '';
        for (const el of elements) {
          if (el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = el.id;
          else break;
        }
        setActiveId(current);
      });
    };

    updateActive();
    window.addEventListener('scroll', updateActive, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActive);
    };
  }, []);

  if (!enabled) return null;

  const minLevel = headings.length ? Math.min(...headings.map((h) => h.level)) : 1;

  const list = (onNavigate?: () => void) => (
    <ul className={styles.tocList}>
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            onClick={onNavigate}
            style={{ paddingLeft: (h.level - minLevel) * 12 }}
            className={`${styles.tocLink} ${h.level > minLevel ? styles.tocLinkSub : ''} ${
              activeId === h.id ? styles.tocLinkActive : ''
            }`}
          >
            {h.text}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      <details ref={detailsRef} className={styles.tocMobile}>
        <summary className={styles.tocSummary}>목차</summary>
        <nav className={styles.tocMobileNav} aria-label="목차">
          {list(() => detailsRef.current?.removeAttribute('open'))}
        </nav>
      </details>
      {headings.length > 0 && (
        <aside className={styles.tocWrapper} aria-label="목차">
          <nav className={styles.toc}>{list()}</nav>
        </aside>
      )}
    </>
  );
}
