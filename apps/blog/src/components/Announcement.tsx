'use client';

import Image from 'next/image';
import { useState } from 'react';
import * as styles from './styles/Announcement.css';

// 내용을 바꿔서 다시 띄우고 싶으면 키를 바꾸면 된다.
const STORAGE_KEY = 'announcement:jubjub-english';

// 이미 닫은 사람에게 카드가 잠깐 보였다 사라지지 않도록 그리기 전에 숨긴다.
const HIDE_SCRIPT = `try{if(localStorage.getItem('${STORAGE_KEY}'))document.documentElement.dataset.hideAnnouncement=''}catch(e){}`;

export function Announcement() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {}
    setDismissed(true);
  };

  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: HIDE_SCRIPT }} />
      <aside className={styles.card} aria-label="새 소식">
        <a href="https://english.oilater.com" target="_blank" rel="noopener" className={styles.link}>
          {/* 이미 320px WebP(2KB)로 줄여둔 파일이라 최적화를 건너뛴다. */}
          <Image
            src="/images/jubjub-english.webp"
            alt=""
            width={160}
            height={84}
            className={styles.thumbnail}
            unoptimized
          />
          <span className={styles.body}>
            <span className={styles.title}>🎉 줍줍영어가 출시됐어요</span>
            <span className={styles.description}>출근길에 영어 공부하고 싶은 분들은 놀러오세요!</span>
            <span className={styles.cta}>구경하러 가기 →</span>
          </span>
        </a>
        <button type="button" className={styles.close} onClick={dismiss} aria-label="소식 닫기">
          ✕
        </button>
      </aside>
    </>
  );
}
