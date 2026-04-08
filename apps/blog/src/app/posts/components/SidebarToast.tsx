'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { parsePathSegments } from '#/lib/sidebar';
import * as styles from '../toast.css';

const DISMISSED_KEY = 'sidebar-toast-dismissed';

export function SidebarToast() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const isPostDetail = parsePathSegments(pathname).length >= 2;

  useEffect(function showToastOnPostOpen() {
    if (!isPostDetail) {
      return;
    }
    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed) {
      return;
    }

    setVisible(true);
    localStorage.setItem(DISMISSED_KEY, 'true');

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isPostDetail]);

  if (!visible) {
    return null;
  }

  return (
    <div className={styles.toast}>
      <span className={styles.message}>
        <strong>Cmd + /</strong> 를 눌러 사이드바를 숨기고 편하게 읽어보세요!
      </span>
    </div>
  );
}
