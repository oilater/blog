import { throttle } from 'es-toolkit';
import { useMemo, useRef } from 'react';

export function useDebounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  return useMemo(
    () =>
      throttle(
        (...args: Parameters<T>) => {
          fnRef.current(...args);
        },
        delay,
        { edges: ['leading', 'trailing'] },
      ),
    [delay],
  );
}
