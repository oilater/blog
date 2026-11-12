'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Moon from '#icons/Moon';
import Sun from '#icons/Sun';
import { themeButton } from '#/app/layout.css';

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [isMount, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onChangeTheme = () => {
    const currentTheme = theme || THEME.LIGHT;
    setTheme(currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

  if (!isMount) {
    return (
      <button type="button" aria-label="Fallback UI" className={themeButton}>
        <div style={{ width: 20, height: 20 }} />
      </button>
    );
  }

  return <button type="button" onClick={onChangeTheme} className={themeButton}>{theme === THEME.LIGHT ? <Moon /> : <Sun />}</button>;
}
