'use client';

import Moon from '@icons/Moon';
import Sun from '@icons/Sun';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onChangeTheme = () => {
    const currentTheme = theme || THEME.LIGHT;
    setTheme(currentTheme === THEME.LIGHT ? THEME.DARK : THEME.LIGHT);
  };

  if (!mounted) {
    return (
      <button>
        <Moon />
      </button>
    );
  }

  return (
    <button onClick={onChangeTheme}>
      {theme === THEME.LIGHT ? <Moon /> : <Sun />}
    </button>
  );
}
