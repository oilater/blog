'use client';

import { useState } from 'react';
import * as styles from './Collapsible.css';

export function Collapsible({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.toggle}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? '접기' : '자세히 보기'}
        <svg
          aria-hidden="true"
          className={open ? styles.chevronOpen : styles.chevron}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      <div className={open ? styles.contentOpen : styles.content}>
        <div className={styles.contentInner}>{children}</div>
      </div>
    </div>
  );
}
