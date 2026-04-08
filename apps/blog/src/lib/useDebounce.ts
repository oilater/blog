import { useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(() => {
    let timer: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
      if (timer) {
        clearTimeout(timer);
      } else {
        fnRef.current(...args);
      }

      timer = setTimeout(() => {
        fnRef.current(...args);
        timer = null;
      }, delay);
    };
  }, [delay]);
}
