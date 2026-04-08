'use client';

import { useState, useEffect } from 'react';
import * as styles from './styles/RotateText.css';

const TEXTS = [
  '프론트엔드 개발자',
  'OPEN TO WORK',
  '일은 지금 전혀 안합니다',
  '키보드만 필요한 블로그',
  '마우스가 없어질 때까지',
  '글을 볼 땐 Cmd + / 를 눌러보세요',
];

const INTERVAL = 6000;

export function RotateText() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(function rotateTexts() {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % TEXTS.length);
        setVisible(true);
      }, 300);
    }, INTERVAL);

    return () => clearInterval(timer);
  }, []);

  return (
    <span className={`${styles.text} ${visible ? styles.visible : styles.hidden}`}>
      {TEXTS[index]}
    </span>
  );
}
