import { useCallback, useSyncExternalStore } from 'react';

export function useSessionStorage<T>(key: string, initialValue: T) {
  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      const handler = (e: StorageEvent) => {
        if (e.key === key) onStoreChange();
      };
      window.addEventListener('storage', handler);
      return () => window.removeEventListener('storage', handler);
    },
    [key],
  );

  const getSnapshot = useCallback(() => {
    const stored = sessionStorage.getItem(key);
    if (stored === null) return initialValue;
    try {
      return JSON.parse(stored) as T;
    } catch {
      return initialValue;
    }
  }, [key, initialValue]);

  const getServerSnapshot = useCallback(() => initialValue, [initialValue]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const set = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      const current = getSnapshot();
      const resolved = newValue instanceof Function ? newValue(current) : newValue;
      sessionStorage.setItem(key, JSON.stringify(resolved));
      // 같은 탭 내에서는 storage 이벤트가 안 발생하므로 강제 리렌더
      window.dispatchEvent(new StorageEvent('storage', { key }));
    },
    [key, getSnapshot],
  );

  return [value, set] as const;
}
