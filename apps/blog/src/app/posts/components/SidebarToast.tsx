'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { parsePathSegments } from '#/lib/sidebar';
import * as styles from '../toast.css';

const SIDEBAR_DISMISSED_KEY = 'sidebar-toast-dismissed';

type ToastType = 'sidebar' | 'guide' | null;

export function SidebarToast() {
  const [toast, setToast] = useState<ToastType>(null);
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(function handleToast() {
    const prevSegments = parsePathSegments(prevPathRef.current);
    const wasHome = prevSegments.length === 0;
    const segments = parsePathSegments(pathname);
    const isPostDetail = segments.length >= 2;
    prevPathRef.current = pathname;

    if (toast !== null) {
      return;
    }

    if (isPostDetail && wasHome) {
      setToast('guide');
      timerRef.current = setTimeout(() => setToast(null), 4000);
      return;
    }

    if (isPostDetail) {
      const dismissed = localStorage.getItem(SIDEBAR_DISMISSED_KEY);
      if (!dismissed) {
        setToast('sidebar');
        localStorage.setItem(SIDEBAR_DISMISSED_KEY, 'true');
        timerRef.current = setTimeout(() => setToast(null), 3000);
      }
    }
  }, [pathname]);

  useEffect(function cleanup() {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  if (!toast) {
    return null;
  }

  if (toast === 'guide') {
    return (
      <div className={styles.toast}>
        <span className={styles.message}>
          다시 가이드를 보려면 터미널에 <strong>guide</strong>를 입력하거나 헤더의 <strong>Home</strong>을 클릭하세요
        </span>
      </div>
    );
  }

  return (
    <div className={styles.toast}>
      <span className={styles.message}>
        <strong>Cmd + /</strong> 를 눌러 사이드바를 숨기고 편하게 보세요! (Windows: <strong>Ctrl + /</strong>)
      </span>
    </div>
  );
}
